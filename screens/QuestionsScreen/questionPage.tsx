import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { RadioButton, Checkbox } from "react-native-paper";
import { Section, Question, AnswerState, Diagnosis } from "./types";
import { sections } from "./module";
import { myDiagnoses } from "./diagnosis";
import { getQuestionsWithDynamicText } from "./questionRender";
import { validAnswers } from "tests/data/answerState";
import db from "../../firebaseConfig";
import RecordFirestoreService from "backend/RecordFirestoreService";
import { construirRecord } from "./utils";
import { validateAnswers } from "./validationutils";
import ModalPopup from "./_ModalPopup";

const moduleColors = [
  "#0C318F", // Azul oscuro
  "#123B9A",
  "#1A45A5",
  "#2250B0",
  "#2A5AB9",
  "#3265C2",
  "#3A70CB",
  "#4280D4",
  "#4A8BD8",
  "#5296DB",
  "#5A9FE0",
  "#62A8E3",
  "#6AAEE6",
  "#72B7E9",
  "#82C1F2", // Azul más claro
  "#92C8F5", // Azul aún más claro
  "#A2D1F8", // Azul pastel suave
];

const { height } = Dimensions.get("window");

const QuestionPage: React.FC<{ navigation: any; route: any }> = ({ route }) => {
  // Estados combinados
  const isTest: boolean = route.params?.test ?? false;
  const [answers, setAnswers] = useState<AnswerState>(
    isTest ? validAnswers : {},
  );
  const [visibleSections, setVisibleSections] = useState<string[]>([
    "sectionData",
    "sectionA",
  ]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      moduloData: true,
      moduloA: true,
    },
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Efectos combinados
  useEffect(() => {
    const newVisibleSections: string[] = ["sectionData", "sectionA"];

    sections.forEach((section) => {
      if (section.id === "sectionData" || section.id === "sectionA") return;

      if (section.dependsOn(answers)) {
        newVisibleSections.push(section.id);
      }
    });

    myDiagnoses.forEach((diagnosis) => {
      if (diagnosis.dependsOn(answers)) {
        newVisibleSections.push(diagnosis.id);
      }
    });

    setVisibleSections(newVisibleSections);
  }, [answers]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Funciones de manejo combinadas
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckboxAnswer = (
    questionId: string,
    option: string,
    isChecked: boolean,
  ) => {
    setAnswers((prev) => {
      const currentAnswers = Array.isArray(prev[questionId])
        ? (prev[questionId] as string[])
        : [];
      return {
        ...prev,
        [questionId]: isChecked
          ? [...currentAnswers, option]
          : currentAnswers.filter((item) => item !== option),
      };
    });
  };

  const isOptionChecked = (questionId: string, option: string): boolean => {
    return Array.isArray(answers[questionId])
      ? (answers[questionId] as string[]).includes(option)
      : false;
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleUpload = async () => {
    setLoading(true);

    const { isValid, errors } = validateAnswers(answers);

    if (!isValid) {
      setError(errors.join("\n"));
      setModalTitle("Errores de validación");
      setModalMessage(errors.join("\n"));
      setModalVisible(true);
      setLoading(false);
      return;
    }

    try {
      const service = new RecordFirestoreService(db);
      const record = construirRecord(
        answers,
        myDiagnoses,
        startTime || new Date(),
      );
      const result = await service.createRecordWithValidation(
        record.id,
        record,
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      setModalTitle("Éxito");
      setModalMessage("Datos guardados correctamente");
      setModalVisible(true);
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
      setModalTitle("Error");
      setModalMessage(
        error instanceof Error ? error.message : "Error al guardar los datos",
      );
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de agrupación de preguntas con soporte para sectionK2
  const groupQuestionsByModule = (questions: Question[]) => {
    const groups: Record<string, { title: string; questions: Question[] }> = {};

    questions.forEach((question) => {
      // Special handling for sectionK2
      if (question.section === "sectionK2") {
        const k2Section = sections.find((s) => s.id === "sectionK2");
        if (k2Section) {
          const groupKey = k2Section.moduleGroup || "moduloK2";
          if (!groups[groupKey]) {
            groups[groupKey] = {
              title: k2Section.title || "Sección K2",
              questions: [],
            };
          }
          groups[groupKey].questions.push(question);
        }
        return;
      }

      // Normal handling for other sections
      const section = sections.find((s) =>
        s.questions?.some((q) => q.id === question.id),
      );

      if (section) {
        const groupKey = section.moduleGroup || "ungrouped";
        if (!groups[groupKey]) {
          groups[groupKey] = {
            title: section.title || groupKey,
            questions: [],
          };
        }
        groups[groupKey].questions.push(question);
      }
    });

    return groups;
  };

  // Get all questions with dynamic text
  const allDynamicQuestions = getQuestionsWithDynamicText(answers);

  // Filter questions based on section visibility
  const visibleQuestions = allDynamicQuestions.filter((question) => {
    // Special handling for K2 section
    if (question.section === "sectionK2") {
      return visibleSections.includes("sectionK2");
    }

    // Normal section handling
    const section = sections.find((s) =>
      s.questions?.some((q) => q.id === question.id),
    );
    return section && visibleSections.includes(section.id);
  });

  const groupedQuestions = groupQuestionsByModule(visibleQuestions);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.container, { height }]}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(groupedQuestions).map(
          ([groupId, { title, questions }], index) => {
            const backgroundColor = moduleColors[index % moduleColors.length]; // Colores rotativos

            return (
              <View
                key={groupId}
                style={[styles.moduleGroup, { backgroundColor }]}
              >
                <TouchableOpacity
                  onPress={() => toggleGroup(groupId)}
                  style={styles.moduleGroupHeader}
                >
                  <Text
                    style={styles.moduleGroupTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {title}
                  </Text>
                  <Text style={styles.arrowIcon}>
                    {expandedGroups[groupId] ? "▼" : "►"}
                  </Text>
                </TouchableOpacity>

                {expandedGroups[groupId] && (
                  <View style={styles.moduleGroupContent}>
                    {questions.map((question) => (
                      <View key={question.id} style={styles.question}>
                        <Text style={styles.questionText}>
                          {question.text}
                          {question.required && (
                            <Text style={styles.required}>
                              {" "}
                              Pregunta Obligatoria
                            </Text>
                          )}
                        </Text>
                        {question.options ? (
                          <View style={styles.options}>
                            {question.questionType === "checkbox"
                              ? question.options.map((option) => (
                                  <View
                                    key={option}
                                    style={styles.checkboxOption}
                                  >
                                    <Checkbox
                                      status={
                                        isOptionChecked(question.id, option)
                                          ? "checked"
                                          : "unchecked"
                                      }
                                      onPress={() =>
                                        handleCheckboxAnswer(
                                          question.id,
                                          option,
                                          !isOptionChecked(question.id, option),
                                        )
                                      }
                                    />
                                    <Text style={styles.optionLabel}>
                                      {option}
                                    </Text>
                                  </View>
                                ))
                              : question.options.map((option) => (
                                  <View
                                    key={`${question.id}-${option}`}
                                    style={styles.radioOption}
                                  >
                                    <TouchableOpacity
                                      style={styles.radioCircle}
                                      onPress={() =>
                                        handleAnswer(question.id, option)
                                      }
                                    >
                                      {answers[question.id] === option && (
                                        <View style={styles.radioChecked} />
                                      )}
                                    </TouchableOpacity>
                                    <Text style={styles.radioLabel}>
                                      {option}
                                    </Text>
                                  </View>
                                ))}
                          </View>
                        ) : (
                          <TextInput
                            style={styles.input}
                            value={
                              typeof answers[question.id] === "string"
                                ? (answers[question.id] as string)
                                : ""
                            }
                            onChangeText={(text) => {
                              if (question.questionType === "int") {
                                const numericText = text.replace(/[^0-9]/g, "");
                                handleAnswer(question.id, numericText);
                              } else if (question.questionType === "text") {
                                const textOnly = text.replace(/[0-9]/g, "");
                                handleAnswer(question.id, textOnly);
                              } else if (question.questionType === "date") {
                                const filteredText = text.replace(
                                  /[^0-9:/]/g,
                                  "",
                                );
                                handleAnswer(question.id, filteredText);
                              } else {
                                handleAnswer(question.id, text);
                              }
                            }}
                            placeholder={
                              question.placeholder ?? "Escribe aquí..."
                            }
                            keyboardType={
                              question.questionType === "int"
                                ? "numeric"
                                : "default"
                            }
                            maxLength={
                              question.questionType === "int" ||
                              question.questionType === "date"
                                ? 10
                                : 100
                            }
                          />
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          },
        )}

        {/* Diagnósticos */}
        {myDiagnoses.map((diagnosis) =>
          visibleSections.includes(diagnosis.id) ? (
            <View key={diagnosis.id} style={styles.diagnosis}>
              <Text style={styles.diagnosisTitle}>
                {diagnosis.name}{" "}
                {diagnosis.result && (
                  <>
                    {" "}
                    {(diagnosis.result as (answers: any) => string)(answers)}
                  </>
                )}
              </Text>
            </View>
          ) : null,
        )}

        {/* Debug */}
        <View style={styles.debug}>
          <Text style={styles.debugTitle}>Estado de respuestas:</Text>
          <Text style={styles.debugText}>
            {JSON.stringify(answers, null, 2)}
          </Text>
        </View>

        {/* Botón */}
        {loading && <Text style={{ marginBottom: 16 }}>Guardando...</Text>}
        {success && (
          <Text style={{ color: "green", marginBottom: 16 }}>
            Datos guardados con éxito.
          </Text>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleUpload}>
          <Text style={styles.submitButtonText}>Finalizar y subir datos</Text>
        </TouchableOpacity>
      </ScrollView>

      <ModalPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default QuestionPage;
