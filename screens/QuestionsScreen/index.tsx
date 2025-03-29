import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { modules, showModuleB } from "./questionsLogic";

const QuestionsScreen = () => {
  const [expandedModules, setExpandedModules] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  return (
    <ScrollView style={styles.container}>
      {modules(selectedAnswers).map(
        (module) =>
          (showModuleB(selectedAnswers)
            ? module.id === "moduloB"
            : module.id !== "moduloB") && (
            <View key={module.id}>
              <TouchableOpacity
                style={styles.moduleHeader}
                onPress={() => toggleModule(module.id)}
              >
                <Text style={styles.moduleTitle}>{module.title}</Text>
              </TouchableOpacity>
              {expandedModules[module.id] && (
                <View style={styles.moduleContent}>
                  {module.questions.map((q) => (
                    <View key={q.id} style={styles.questionContainer}>
                      <Text style={styles.questionText}>{q.text}</Text>
                      {q.options && (
                        <View style={styles.optionsContainer}>
                          {q.options.map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.optionButton,
                                selectedAnswers[q.id] === option &&
                                  styles.selectedOption,
                              ]}
                              onPress={() => handleAnswerSelect(q.id, option)}
                            >
                              <Text
                                style={[
                                  styles.optionText,
                                  selectedAnswers[q.id] === option &&
                                    styles.selectedOptionText,
                                ]}
                              >
                                {option}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ),
      )}
    </ScrollView>
  );
};

export default QuestionsScreen;
