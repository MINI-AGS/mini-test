import { AnswerState, ValidationResult, Question } from "./types";
import { questions } from "./questions";

export const validateAnswers = (answers: AnswerState): ValidationResult => {
  let isValid = true;
  let errors: string[] = [];
  let successMessage: string | null = null;

  // validate gender
  const gender: string = answers["gender"] as string;
  if (gender !== "Hombre" && gender !== "Mujer" && gender !== "Otro") {
    isValid = false;
    errors.push("Género no válido");
  }

  // validate birthdate, should be in format DD/MM/YYYY
  const birthdate: string = answers["birthdate"] as string;
  if (birthdate) {
    const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthdateRegex.test(birthdate)) {
      isValid = false;
      errors.push("Fecha de nacimiento no válida");
    } else {
      const [day, month, year] = birthdate.split("/").map(Number);
      if (day < 1 || day > 31 || month < 1 || month > 12) {
        isValid = false;
        errors.push("Fecha de nacimiento no válida");
      }
      const birthDateObj = new Date(year, month - 1, day);
      const currentDate = new Date();
      if (birthDateObj > currentDate) {
        isValid = false;
        errors.push("Fecha de nacimiento no puede ser futura");
      }
    }
  }

  // Validación de peso y altura
  const weight: string = answers["questionM1b"] as string;

  const height: string = answers["questionM1a"] as string;

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

  // Validar preguntas requeridas
  questions.forEach((question: Question) => {
    if (question.required) {
      const answer = answers[question.id];
      if (!answer || (typeof answer === "string" && answer.trim() === "")) {
        isValid = false;
        errors.push(`La pregunta "${question.text}" es requerida,`);
      }
    }
  });

  // Si todas las validaciones pasan, establecer mensaje de éxito
  if (isValid && errors.length === 0) {
    successMessage = "¡Los datos se guardaron correctamente!";
  }

  return { isValid, errors, successMessage };
};
