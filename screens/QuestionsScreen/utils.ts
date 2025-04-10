import { AnswerState } from "./types";

/**
 * Convierte de forma segura un valor que puede ser string o array de strings a minúsculas
 * @param value - El valor a convertir (string, string[] o undefined)
 * @returns La versión en minúsculas del valor
 */
export function safeToLowerCase(value: string | string[] | undefined): string {
  if (!value) return ""; // Manejar valores undefined

  if (Array.isArray(value)) {
    // Si es un array, consideramos el primer valor o devolvemos vacío
    return value.length > 0 ? value[0].toLowerCase() : "";
  }

  // Si es un string, lo devolvemos en minúsculas
  return value.toLowerCase();
}

/**
 * Verifica si una respuesta contiene un valor específico
 * @param answer - La respuesta a verificar (string o string[])
 * @param value - El valor a buscar
 * @returns true si la respuesta contiene el valor (insensible a mayúsculas/minúsculas)
 */
export function answerContains(
  answer: string | string[] | undefined,
  value: string,
): boolean {
  if (!answer) return false;

  // Convertir el valor buscado a minúsculas para comparación insensible a mayúsculas
  const lowerValue = value.toLowerCase();

  if (Array.isArray(answer)) {
    // Para arrays, verificamos si algún elemento coincide
    return answer.some((item) => item.toLowerCase() === lowerValue);
  }

  // Para strings, comparamos directamente
  return answer.toLowerCase() === lowerValue;
}

/**
 * Verifica si una respuesta en el objeto de respuestas es igual a un valor específico
 * @param answers - Objeto de respuestas
 * @param questionId - ID de la pregunta
 * @param value - Valor a comparar
 * @returns true si la respuesta coincide con el valor
 */
export function isAnswerEqual(
  answers: AnswerState,
  questionId: string,
  value: string,
): boolean {
  return answerContains(answers[questionId], value);
}

export function calculateSuicideRiskScore(answers: any): number {
  const riskQuestions = [
    { id: "questionC1", points: 1 },
    { id: "questionC2", points: 2 },
    { id: "questionC3", points: 6 },
    { id: "questionC4", points: 10 },
    { id: "questionC5", points: 10 },
    { id: "questionC6", points: 4 },
  ];

  return riskQuestions.reduce(
    (sum, q) => sum + (answers[q.id] === "si" ? q.points : 0),
    0,
  );
}

export function RiskLevelC1(answers: any): string {
  if (answers["questionB4"] !== "si") return "No diagnosis";

  // Calcula el puntaje total
  const score = calculateSuicideRiskScore(answers);
  // Determina el nivel de riesgo basado en el puntaje
  let nivel = "";
  if (score >= 10) nivel = "alto";
  else if (score >= 6) nivel = "moderado";
  else if (score >= 1) nivel = "leve";

  return nivel; // Devuelve false si el puntaje es 0
}
