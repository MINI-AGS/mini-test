import { AnswerState, ValidationResult, Question } from "./types";
import { questions } from "./questions";

export const validateAnswers = (answers: AnswerState): ValidationResult => {
  let isValid = true;
  let errors: string[] = [];
  let successMessage: string | null = null;

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

  // Validación de peso y altura
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

  // Si todas las validaciones pasan, establecer mensaje de éxito
  if (isValid && errors.length === 0) {
    successMessage = "¡Los datos se guardaron correctamente!";
  }

  return { isValid, errors, successMessage };
};
