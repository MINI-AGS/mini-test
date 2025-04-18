import { AnswerState, ValidationResult } from "./types";
import { questions } from "./questions"; // Importa las preguntas para verificar el campo `required`

export const validateAnswers = (answers: AnswerState): ValidationResult => {
  let isValid = true;
  let errors: string[] = [];

  // Validar preguntas requeridas
  questions.forEach(question => {
    if (question.required) {
      const answer = answers[question.id];
      if (!answer || (typeof answer === "string" && answer.trim() === "")) {
        isValid = false;
        errors.push(`La pregunta "${question.text}" es requerida`);
      }
    }
  });

  // Validación de género
  const gender = answers["gender"] as string;
  if (!gender) {
    isValid = false;
  } else if (!["Hombre", "Mujer", "Otro"].includes(gender)) {
    isValid = false;
    errors.push("Género no válido");
  }

  // Validación de fecha de nacimiento
  const birthdate = answers["birhdate"] as string;
  console.log("birthdate", birthdate);
  if (!birthdate) {
    isValid = false;
  } else {
    const birthdateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthdateRegex.test(birthdate)) {
      isValid = false;
      errors.push("Formato de fecha inválido (DD/MM/AAAA)");
    } else {
      const [day, month, year] = birthdate.split("/").map(Number);
      const birthDateObj = new Date(year, month - 1, day);
      const currentDate = new Date();
      if (birthDateObj > currentDate) {
        isValid = false;
        errors.push("La fecha de nacimiento no puede ser futura");
      }
    }
  }

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

  return { isValid, errors };
};