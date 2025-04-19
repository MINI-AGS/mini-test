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
import { RadioButton, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

// Types
import { Section, Question, AnswerState, Diagnosis } from "./types";

// Data
import { sections } from "./module";
import { myDiagnoses } from "./diagnosis";

// Utils
import { getQuestionsWithDynamicText } from "./questionRender";
import { validAnswers } from "tests/data/answerState";
import { construirRecord } from "./utils";
import { validateAnswers } from "./validationutils";

// Services
import db from "../../firebaseConfig";
import RecordFirestoreService from "backend/RecordFirestoreService";

// Importaciones CORRECTAS basadas en tu estructura de archivos:
import LoadingModal from "../modals/LoadingModal";
import ErrorModal from "../modals/ErrorModal";
const { height } = Dimensions.get("window");

const QuestionPage: React.FC<{ navigation: any; route: any }> = ({
  route,
  navigation,
}) => {
  // States
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Modal states
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Effects
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

  // Handlers
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
    setLoadingModalVisible(true);

    const { isValid, errors } = validateAnswers(answers);

    if (!isValid) {
      setLoadingModalVisible(false);
      setModalTitle("Errores de validación");
      setModalMessage(errors.join("\n"));
      setErrorModalVisible(true);
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

      setLoadingModalVisible(false);
      // Navegar a EndScreen con las respuestas
      navigation.navigate("EndScreen", { answers });
    } catch (error) {
      setLoadingModalVisible(false);
      setModalTitle("Error");
      setModalMessage(
        error instanceof Error ? error.message : "Error al guardar los datos",
      );
      setErrorModalVisible(true);
    }
  };

  // Group questions logic
  const groupQuestionsByModule = (questions: Question[]) => {
    const groups: Record<string, { title: string; questions: Question[] }> = {};

    questions.forEach((question) => {
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

  const dynamicQuestions = getQuestionsWithDynamicText(answers).filter(
    (question) => {
      const section = sections.find((s) =>
        s.questions?.some((q) => q.id === question.id),
      );
      return section && visibleSections.includes(section.id);
    },
  );

  const groupedQuestions = groupQuestionsByModule(dynamicQuestions);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.container, { height }]}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(groupedQuestions).map(
          ([groupId, { title, questions }]) => (
            <View key={groupId} style={styles.moduleGroup}>
              <TouchableOpacity
                onPress={() => toggleGroup(groupId)}
                style={styles.moduleGroupHeader}
              >
                <Text style={styles.moduleGroupTitle}>{title}</Text>
                <Text>{expandedGroups[groupId] ? "▼" : "►"}</Text>
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
                            Pregunta obligatoria
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
                                <View key={option} style={styles.radioOption}>
                                  <RadioButton
                                    value={option}
                                    status={
                                      answers[question.id] === option
                                        ? "checked"
                                        : "unchecked"
                                    }
                                    onPress={() =>
                                      handleAnswer(question.id, option)
                                    }
                                  />
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
          ),
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleUpload}>
          <Text style={styles.submitButtonText}>Finalizar y subir datos</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <LoadingModal
        visible={loadingModalVisible}
        onCancel={() => setLoadingModalVisible(false)}
      />

      <ErrorModal
        visible={errorModalVisible}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </>
  );
};

export default QuestionPage;
