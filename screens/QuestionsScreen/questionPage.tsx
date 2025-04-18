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
import { Section, Question, AnswerState } from "./types";
import { sections } from "./module";
import { myDiagnoses } from "./diagnosis";
import { getQuestionsWithDynamicText } from "./questionRender";

const { height } = Dimensions.get("window");

const QuestionPage: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});
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
  const scrollViewRef = useRef<ScrollView>(null);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  useEffect(() => {
    const newVisibleSections: string[] = ["sectionData", "sectionA"];

    sections.forEach((section) => {
      if (section.id === "sectionData" || section.id === "sectionA") return;

      if (section.dependsOn(answers)) {
        newVisibleSections.push(section.id);
      }
    });

    setVisibleSections(newVisibleSections);
  }, [answers]);

  const dynamicQuestions = getQuestionsWithDynamicText(answers).filter(
    (question) => {
      const section = sections.find((s) =>
        s.questions?.some((q) => q.id === question.id),
      );
      return section && visibleSections.includes(section.id);
    },
  );

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

  const groupedQuestions = groupQuestionsByModule(dynamicQuestions);

  return (
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
                    <Text style={styles.questionText}>{question.text}</Text>
                    {question.options ? (
                      <View style={styles.options}>
                        {question.questionType === "checkbox"
                          ? question.options.map((option) => (
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
                <> {(diagnosis.result as (answers: any) => string)(answers)}</>
              )}
            </Text>
          </View>
        ) : null,
      )}

      <View style={styles.debug}>
        <Text style={styles.debugTitle}>Estado de respuestas:</Text>
        <Text style={styles.debugText}>{JSON.stringify(answers, null, 2)}</Text>
        <Text style={styles.debugTitle}>Secciones visibles:</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(visibleSections, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default QuestionPage;
