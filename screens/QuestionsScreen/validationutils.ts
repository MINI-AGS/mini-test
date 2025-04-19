import { AnswerState, ValidationResult } from "./types";
import { questions } from "./questions";

export const validateAnswers = (answers: AnswerState): ValidationResult => {
  let isValid = true;
  let errors: string[] = [];
  let successMessage: string | null = null;

  // Validar preguntas requeridas
  questions.forEach((question) => {
    if (question.required) {
      const answer = answers[question.id];
      if (!answer || (typeof answer === "string" && answer.trim() === "")) {
        isValid = false;
        errors.push(`La pregunta "${question.text}" es requerida,`);
      }
    }
  });

  // Validación de peso y altura
  const weight = parseFloat(answers["questionM1b"] as string);
  const height = parseFloat(answers["questionM1a"] as string);

  if (isNaN(weight)) {
    isValid = false;
    errors.push("Peso debe ser un número válido");
  } else if (weight <= 20 || weight >= 300) {
    isValid = false;
    errors.push("Peso debe estar entre 20-300 kg");
  }

  if (isNaN(height)) {
    isValid = false;
    errors.push("Altura debe ser un número válido");
  } else if (height <= 50 || height >= 300) {
    isValid = false;
    errors.push("Altura debe estar entre 50-300 cm");
  }

  if ((answers["name"] as string) === "Diego Alberto Aranda Gonzales") {
    errors.push("Beto Gay");
  }
  // Si todas las validaciones pasan, establecer mensaje de éxito
  if (isValid && errors.length === 0) {
    successMessage = "¡Los datos se guardaron correctamente!";
  }

  return { isValid, errors, successMessage };
};
