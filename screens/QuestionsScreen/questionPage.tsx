import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";
import styles, { getModuleGroupStyle } from "./styles";

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
import SuccessModal from "../modals/SuccessModal";
const { height } = Dimensions.get("window");

// Define interface for checkbox props
interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
}

// Custom checkbox styles
const checkboxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 6,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#6200ee",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 10,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  checked: {
    backgroundColor: "#6200ee",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 15,
    flex: 1,
  },
});

// Custom Checkbox component that works better cross-platform
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onPress, label }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={checkboxStyles.container}
      activeOpacity={0.7}
    >
      <View style={[
        checkboxStyles.box,
        checked && checkboxStyles.checked
      ]}>
        {checked && <Text style={checkboxStyles.checkmark}>✓</Text>}
      </View>
      <Text style={checkboxStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const QuestionPage: React.FC<{ navigation: any; route: any }> = ({ route }) => {
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
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
      setModalMessage("¡Los datos se guardaron correctamente!");
      setSuccessModalVisible(true);
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

  // Render checkbox option with proper typing
  const renderCheckboxOption = (question: Question, option: string) => {
    const isChecked = isOptionChecked(question.id, option);
    const handlePress = () => 
      handleCheckboxAnswer(question.id, option, !isChecked);
    
    return (
      <CustomCheckbox
        key={option}
        checked={isChecked}
        onPress={handlePress}
        label={option}
      />
    );
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.container, { height }]}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(groupedQuestions).map(
          ([groupId, { title, questions }]) => (
            <View key={groupId} style={getModuleGroupStyle(groupId)}>
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
                            ? question.options.map((option) => 
                                renderCheckboxOption(question, option)
                              )
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

        {myDiagnoses.map((diagnosis) =>
          visibleSections.includes(diagnosis.id) ? (
            <View key={diagnosis.id} style={styles.diagnosis}>
              <Text style={styles.diagnosisTitle}>
                {diagnosis.name}{" "}
                {diagnosis.result && (
                  <>{(diagnosis.result as (answers: any) => string)(answers)}</>
                )}
              </Text>
            </View>
          ) : null,
        )}

        <View style={styles.debug}>
          <Text style={styles.debugTitle}>Estado de respuestas:</Text>
          <Text style={styles.debugText}>
            {JSON.stringify(answers, null, 2)}
          </Text>
        </View>

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

      <SuccessModal
        visible={successModalVisible}
        message={modalMessage}
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
  );
};

export default QuestionPage;