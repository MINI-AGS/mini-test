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
import { Section, Question, AnswerState, Diagnosis } from "./types";
import { sections } from "./module";
import { myDiagnoses } from "./diagnosis";
import { getQuestionsWithDynamicText } from "./questionRender";
import { validAnswers } from "tests/data/answerState";

const { height } = Dimensions.get("window");

const QuestionDisplay: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const isTest: boolean = route.params?.test ?? false;
  const [answers, setAnswers] = useState<AnswerState>(
    isTest ? validAnswers : {},
  );
  const [visibleModules, setVisibleModules] = useState<string[]>(["sectionA"]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev: AnswerState) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleCheckboxAnswer = (
    questionId: string,
    option: string,
    isChecked: boolean,
  ) => {
    setAnswers((prev: AnswerState) => {
      const currentAnswers = Array.isArray(prev[questionId])
        ? (prev[questionId] as string[])
        : [];

      if (isChecked) {
        if (!currentAnswers.includes(option)) {
          return {
            ...prev,
            [questionId]: [...currentAnswers, option],
          };
        }
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((item) => item !== option),
        };
      }

      return prev;
    });
  };

  const isOptionChecked = (questionId: string, option: string): boolean => {
    if (!answers[questionId]) return false;
    return (
      Array.isArray(answers[questionId]) &&
      (answers[questionId] as string[]).includes(option)
    );
  };

  useEffect(() => {
    const newVisibleModules: string[] = ["sectionA"];

    sections.forEach((section: Section) => {
      if (section.id === "sectionA") return;

      if (section.dependsOn(answers)) {
        newVisibleModules.push(section.id);
      }
    });

    myDiagnoses.forEach((diagnosis: Diagnosis) => {
      if (diagnosis.dependsOn(answers)) {
        newVisibleModules.push(diagnosis.id);
      }
    });

    const newAnswers = { ...answers };
    let hasChanges = false;

    sections.forEach((section: Section) => {
      if (!newVisibleModules.includes(section.id)) {
        // Eliminar respuestas de preguntas est√°ticas
        section.questions?.forEach((question: Question) => {
          if (question.id in newAnswers) {
            delete newAnswers[question.id];
            hasChanges = true;
          }
        });

        // Eliminar respuestas de preguntas din√°micas relacionadas
        Object.keys(newAnswers).forEach((key) => {
          if (key.startsWith(`questionK2_`) && section.id === "sectionK2") {
            delete newAnswers[key];
            hasChanges = true;
          }
        });
      }
    });

    if (JSON.stringify(visibleModules) !== JSON.stringify(newVisibleModules)) {
      setVisibleModules(newVisibleModules);
    }

    if (hasChanges) {
      setAnswers(newAnswers);
    }
  }, [answers, visibleModules]);

  const dynamicQuestions = getQuestionsWithDynamicText(answers);

  const getSectionQuestions = (sectionId: string) => {
    if (sectionId === "sectionK2") {
      // Para la secci√≥n K2, usamos todas las preguntas din√°micas que pertenecen a ella
      return dynamicQuestions.filter(
        (q: Question) => q.section === "sectionK2",
      );
    }
    // Para otras secciones, filtramos usando las preguntas definidas en el m√≥dulo
    return dynamicQuestions.filter((q: Question) =>
      sections
        .find((s: Section) => s.id === sectionId)
        ?.questions?.some((sq: any) => sq.id === q.id),
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.container, { height }]}
      contentContainerStyle={styles.scrollContent}
    >
      {sections.map((section: Section) => {
        if (!visibleModules.includes(section.id)) return null;
        const sectionQuestions = getSectionQuestions(section.id);

        return (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionQuestions.map((question: Question) => (
              <View key={question.id} style={styles.question}>
                <Text>{question.text}</Text>
                {question.options ? (
                  <View style={styles.options}>
                    {question.questionType === "checkbox"
                      ? question.options.map((option: string) => (
                          <View key={option} style={styles.checkboxOption}>
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
                            <Text style={styles.optionLabel}>{option}</Text>
                          </View>
                        ))
                      : question.options.map((option: string) => (
                          <View key={option} style={styles.radioOption}>
                            <RadioButton
                              value={option}
                              status={
                                answers[question.id] === option
                                  ? "checked"
                                  : "unchecked"
                              }
                              onPress={() => handleAnswer(question.id, option)}
                            />
                            <Text style={styles.radioLabel}>{option}</Text>
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
                    onChangeText={(text) => handleAnswer(question.id, text)}
                    placeholder="Escribe tu respuesta"
                  />
                )}
              </View>
            ))}
          </View>
        );
      })}

      {myDiagnoses.map((diagnosis: Diagnosis) =>
        visibleModules.includes(diagnosis.id) ? (
          <View key={diagnosis.id} style={styles.diagnosis}>
            <Text style={styles.diagnosisTitle}>
              {diagnosis.name}{" "}
              {diagnosis.result && (
                <>
                  {(diagnosis.result as (answers: AnswerState) => string)(
                    answers,
                  )}
                </>
              )}
            </Text>
            <Text>Diagnostico visible</Text>
          </View>
        ) : null,
      )}

      <View style={styles.debug}>
        <Text style={styles.debugTitle}>Estado de respuestas:</Text>
        <Text style={styles.debugText}>{JSON.stringify(answers, null, 2)}</Text>
        <Text style={styles.debugTitle}>Modulos visibles:</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(visibleModules, null, 2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          navigation.navigate("Results", { answers });
        }}
      >
        <Text style={styles.submitButtonText}>Finalizar y ver resultados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 20 }, // Espacio adicional al final
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  question: { marginBottom: 15 },
  options: { marginTop: 8 },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: { marginLeft: 8 },
  optionLabel: { marginLeft: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  diagnosis: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  diagnosisTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  debug: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  debugTitle: { fontWeight: "bold", marginBottom: 5 },
  debugText: { fontFamily: "monospace", marginBottom: 10 },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuestionDisplay;
