import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Section, Question, AnswerState } from "./types";
import { sections } from "./module";
import { myDiagnoses } from "./diagnosis";
import { getQuestionsWithDynamicText } from "./questionRender"; // 👈 Nombre corregido

const { height } = Dimensions.get("window");

const QuestionDisplay: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [visibleModules, setVisibleModules] = useState<string[]>(["sectionA"]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    const newVisibleModules: string[] = ["sectionA"];

    sections.forEach((section) => {
      if (section.id === "sectionA") return;

      if (section.dependsOn(answers)) {
        newVisibleModules.push(section.id);
      }
    });

    myDiagnoses.forEach((diagnosis) => {
      if (diagnosis.dependsOn(answers)) {
        newVisibleModules.push(diagnosis.id);
      }
    });

    const newAnswers = { ...answers };
    let hasChanges = false;

    sections.forEach((section) => {
      if (!newVisibleModules.includes(section.id)) {
        section.questions.forEach((question) => {
          if (question.id in newAnswers) {
            delete newAnswers[question.id];
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

  const dynamicQuestions = getQuestionsWithDynamicText(answers); // 👈 Aquí se obtienen preguntas con texto dinámico

  return (
    <ScrollView style={[styles.container, { height }]}>
      {sections.map((section) => {
        if (!visibleModules.includes(section.id)) return null;

        const sectionQuestions = dynamicQuestions.filter((q) =>
          section.questions.some((sq) => sq.id === q.id),
        );

        return (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionQuestions.map((question) => (
              <View key={question.id} style={styles.question}>
                <Text>{question.text}</Text>
                {question.options ? (
                  <View style={styles.options}>
                    {question.options.map((option) => (
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
                    value={answers[question.id] || ""}
                    onChangeText={(text) => handleAnswer(question.id, text)}
                    placeholder="Escribe tu respuesta"
                  />
                )}
              </View>
            ))}
          </View>
        );
      })}

      {myDiagnoses.map((diagnosis) =>
        visibleModules.includes(diagnosis.id) ? (
          <View key={diagnosis.id} style={styles.diagnosis}>
            <Text style={styles.diagnosisTitle}>{diagnosis.name}</Text>
            <Text>Diagnóstico visible</Text>
          </View>
        ) : null,
      )}

      <View style={styles.debug}>
        <Text style={styles.debugTitle}>Estado de respuestas:</Text>
        <Text style={styles.debugText}>{JSON.stringify(answers, null, 2)}</Text>
        <Text style={styles.debugTitle}>Módulos visibles:</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(visibleModules, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  question: { marginBottom: 15 },
  options: { marginTop: 8 },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: { marginLeft: 8 },
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
});

export default QuestionDisplay;
