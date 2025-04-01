import { Diagnosis } from "./types";
const myDiagnoses: Diagnosis[] = [
  {
    id: "major_depressive_episode",
    name: "Episodio Depresivo Mayor",
    criteria: (answers) => {
      // Lista de preguntas específicas en A1 a A3
      const relevantQuestions = [
        "A1",
        "A2",
        "A3a",
        "A3b",
        "A3c",
        "A3d",
        "A3e",
        "A3f",
        "A3g",
      ];

      // Cuenta cuántas respuestas son "si"
      const totalYesAnswers = relevantQuestions.filter(
        (q) => answers[q] === "si",
      ).length;

      return totalYesAnswers >= 5 ? "sí" : "no";
    },
  },
  {
    id: "recurrent_major_depressive_episode",
    name: "Episodio Depresivo Mayor Recidivante",
    criteria: (answers) => {
      return answers["question1"] === "si" ? "sí" : "no"; // Ejemplo
    },
  },
  {
    id: "prueba con esta puedo comparar dos preguntas y ver si darle el diagnostico",
    name: "Episodio Depresivo Mayor Recidivante prueba",
    criteria: (answers) => {
      return answers["question2"] === "si" && answers["question3"] === "si"
        ? "sí"
        : "no";
    },
  },
  {
    id: "bipolar_disorder",
    name: "Trastorno Bipolar",
    criteria: (answers) => {
      // Ejemplo: Diagnóstico basado en múltiples respuestas afirmativas
      const positiveAnswers = ["question4", "question5", "question6"].filter(
        (q) => answers[q] === "si",
      ).length;
      return positiveAnswers >= 2 ? "sí" : "no";
    },
  },
];
