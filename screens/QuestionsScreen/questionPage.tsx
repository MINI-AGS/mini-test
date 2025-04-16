import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
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

const { height } = Dimensions.get("window");

const QuestionDisplay: React.FC<{ navigation: any; route: any }> = ({
  route,
}) => {
  const isTest: boolean = route.params?.test ?? false;
  const [answers, setAnswers] = useState<AnswerState>(
    isTest ? validAnswers : {},
  );
  const [visibleModules, setVisibleModules] = useState<string[]>(["sectionA"]);
  const scrollViewRef = useRef<ScrollView>(null);

  // State control
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [startTime, setStartTime] = useState<Date | null>(null);

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

  // get the start of the dynamic questions, and save it in a variable
  useEffect(() => {
    const startTime = new Date();
    setStartTime(startTime);
  }, []);

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

  interface validateAnswersReturn {
    isValid: boolean;
    errors: string[];
  }

  const validateAnswers = (answers: AnswerState): validateAnswersReturn => {
    let isValid = true;
    let errors: string[] = [];

    // validate gender
    const gender: string = answers["gender"] as string;
    if (gender !== "Hombre" && gender !== "Mujer" && gender !== "Otro") {
      console.log("Género no válido");
      isValid = false;
      errors.push("Género no válido");
    }

    // validate birthdate, should be in format DD/MM/YYYY
    const birthdate: string = answers["birthdate"] as string;
    if (birthdate) {
      console.log("Validando fecha de nacimiento:", birthdate);
      const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!birthdateRegex.test(birthdate)) {
        isValid = false;
        errors.push("Fecha de nacimiento no válida");
      } else {
        const [day, month, year] = birthdate.split("/").map(Number);
        const birthDateObj = new Date(year, month - 1, day);
        const currentDate = new Date();
        if (birthDateObj > currentDate) {
          isValid = false;
          errors.push("Fecha de nacimiento no puede ser futura");
        }
      }
    } else {
      console.log("Fecha de nacimiento no proporcionada");
    }

    console.log(answers);

    // validate weight and height
    // questionM1a: "170",
    // questionM1b: "55",

    const weight: string = answers["questionM1b"] as string;
    console.log("Validando peso:", weight);

    const height: string = answers["questionM1a"] as string;
    console.log("Validando altura:", height);

    if (!weight || !height) {
      isValid = false;
      errors.push("Peso y altura son obligatorios");
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || weightNum <= 20 || weightNum >= 300) {
      isValid = false;
      errors.push("Peso no válido");
    }

    if (isNaN(heightNum) || heightNum <= 50 || heightNum >= 300) {
      isValid = false;
      errors.push("Altura no válida");
    }

    return { isValid, errors };
  };

  const handleUpload = async () => {
    setLoading(true);

    const { isValid, errors } = validateAnswers(answers);
    console.log("Validando respuestas:", isValid, errors);

    if (!isValid) {
      setError("Errores de validación: " + errors.join(", "));
      Alert.alert("Errores de validación", errors.join(", "));
      setSuccess(false);
      setLoading(false);
      return;
    }

    const service = new RecordFirestoreService(db);
    const record = construirRecord(
      answers,
      myDiagnoses,
      startTime || new Date(),
    );
    try {
      const result = await service.createRecordWithValidation(
        record.id,
        record,
      );
      if (!result.success) {
        // Manejar el error
        Alert.alert("Error", "No se pudieron guardar los datos.");
        console.error("Error al guardar:", result.message);
        setError(result.message);
        setLoading(false);
        setSuccess(false);
        return;
      }
      // Manejar el éxito
      Alert.alert("Éxito", "Datos guardados en Firebase.");
      console.log("Datos guardados en Firebase:", record);
      setSuccess(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      // Manejar el error
      console.error("Error al guardar:", error);
      Alert.alert("Error", "No se pudieron guardar los datos.");
      setError("No se pudieron guardar los datos.");
      setLoading(false);
      setSuccess(false);
      return;
    }
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
      {/** Hacer algo con esto!!! */}
      {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}
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
