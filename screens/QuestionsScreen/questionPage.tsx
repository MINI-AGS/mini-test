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
import db from "../../firebaseConfig";
import RecordFirestoreService from "backend/RecordFirestoreService";
import { construirRecord } from "./utils";
import { validateAnswers } from "./validationutils";
import ModalPopup from "./_ModalPopup";

const { height } = Dimensions.get("window");

const QuestionDisplay: React.FC<{ navigation: any; route: any }> = ({
  route,
}) => {
  // Estados del componente
  const isTest: boolean = route.params?.test ?? false;
  const [answers, setAnswers] = useState<AnswerState>(isTest ? validAnswers : {});
  const [visibleModules, setVisibleModules] = useState<string[]>(["sectionA"]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  // Funciones de manejo de respuestas
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckboxAnswer = (
    questionId: string,
    option: string,
    isChecked: boolean,
  ) => {
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[questionId]) 
        ? (prev[questionId] as string[])
        : [];
      return {
        ...prev,
        [questionId]: isChecked
          ? [...currentAnswers, option]
          : currentAnswers.filter(item => item !== option)
      };
    });
  };

  const isOptionChecked = (questionId: string, option: string): boolean => {
    return Array.isArray(answers[questionId]) 
      ? (answers[questionId] as string[]).includes(option)
      : false;
  };

  // Efectos
  useEffect(() => {
    const newVisibleModules: string[] = ["sectionA"];
    
    sections.forEach(section => {
      if (section.id !== "sectionA" && section.dependsOn(answers)) {
        newVisibleModules.push(section.id);
      }
    });

    myDiagnoses.forEach(diagnosis => {
      if (diagnosis.dependsOn(answers)) {
        newVisibleModules.push(diagnosis.id);
      }
    });

    setVisibleModules(newVisibleModules);
  }, [answers]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Función para subir datos
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
      const record = construirRecord(answers, myDiagnoses);
      const result = await service.createRecordWithValidation(record.id, record);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      setModalTitle("Éxito");
      setModalMessage("Datos guardados correctamente");
      setModalVisible(true);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred");
      setModalTitle("Error");
      setModalMessage(
        error instanceof Error ? error.message : "Error al guardar los datos"
      );
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Renderizado
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.container, { height }]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Renderizado de preguntas */}
        {sections.map(section => (
          visibleModules.includes(section.id) && (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {getQuestionsWithDynamicText(answers)
                .filter(q => 
                  section.id === "sectionK2" 
                    ? q.section === "sectionK2"
                    : sections.find(s => s.id === section.id)?.questions?.some(sq => sq.id === q.id)
                )
                .map(question => (
                  <View key={question.id} style={styles.question}>
                    <Text>
                      {question.text}
                      {question.required && <Text style={styles.required}> Pregunta Obligatoria</Text>}
                    </Text>
                    {question.options ? (
                      <View style={styles.options}>
                        {question.questionType === "checkbox"
                          ? question.options.map(option => (
                              <View key={option} style={styles.checkboxOption}>
                                <Checkbox
                                  status={isOptionChecked(question.id, option) ? "checked" : "unchecked"}
                                  onPress={() => handleCheckboxAnswer(
                                    question.id,
                                    option,
                                    !isOptionChecked(question.id, option)
                                  )}
                                />
                                <Text style={styles.optionLabel}>{option}</Text>
                              </View>
                            ))
                          : question.options.map(option => (
                              <View key={option} style={styles.radioOption}>
                                <RadioButton
                                  value={option}
                                  status={answers[question.id] === option ? "checked" : "unchecked"}
                                  onPress={() => handleAnswer(question.id, option)}
                                />
                                <Text style={styles.radioLabel}>{option}</Text>
                              </View>
                            ))}
                      </View>
                    ) : (
                      <TextInput
                          style={styles.input}
                          value={typeof answers[question.id] === "string" ? answers[question.id] as string : ""}
                          onChangeText={text => {
                            if (question.questionType === "int") {
                              const numericText = text.replace(/[^0-9]/g, ""); // Filtra solo números
                              handleAnswer(question.id, numericText);
                            } else if (question.questionType === "text") {
                              const textOnly = text.replace(/[0-9]/g, ""); // Elimina números
                              handleAnswer(question.id, textOnly);
                            } else if (question.questionType === "date") {
                              // Permitir solo números, ":" y "/"
                              const filteredText = text.replace(/[^0-9:/]/g, ""); // Filtra caracteres no permitidos
                              handleAnswer(question.id, filteredText);
                            } else {
                              handleAnswer(question.id, text); // Permite cualquier texto para otros tipos
                            }
                          }}
                          placeholder={question.placeholder ?? "Escribe aquí..."}
                          keyboardType={question.questionType === "int" ? "numeric" : "default"}
                          maxLength={question.questionType === "int" || question.questionType === "date" ? 10 : 100}                        />
                    )}
                  </View>
                ))}
            </View>
          )
        ))}

        {/* Renderizado de diagnósticos */}
        {myDiagnoses.map(diagnosis => (
          visibleModules.includes(diagnosis.id) && (
            <View key={diagnosis.id} style={styles.diagnosis}>
              <Text style={styles.diagnosisTitle}>
                {diagnosis.name} {diagnosis.result && diagnosis.result(answers)}
              </Text>
            </View>
          )
        ))}

        {/* Debug y botón de envío */}
        <View style={styles.debug}>
          <Text style={styles.debugTitle}>Estado de respuestas:</Text>
          <Text style={styles.debugText}>{JSON.stringify(answers, null, 2)}</Text>
        </View>

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

      {/* Modal */}
      <ModalPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 20 },
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
  required: {
    color: "red",
    fontWeight: "bold",
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