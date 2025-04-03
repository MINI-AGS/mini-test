import { questions } from "./questions";
import { Section } from "./types"; // Asegúrate de importar Section si no lo tienes
import { myDiagnoses } from "./diagnosis"; // Asegúrate de importar los diagnósticos

export const sections: Section[] = [
  {
    id: "sectionA",
    title: "Modulo A - Preguntas Iniciales",
    questions: questions.filter((q) => q.section === "sectionA"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionA3",
    title: "Modulo A3 - Preguntas Avanzadas",
    questions: questions.filter((q) => q.section === "sectionA3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionA",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionA4a",
    title: "Modulo A4a - Preguntas Especiales",
    questions: questions.filter((q) => q.section === "sectionA4a"),
    dependsOn: (answers) => {
      const relatedQuestionsA3 = questions.filter(
        (q) => q.section === "sectionA3",
      );
      const relatedQuestionsA = questions.filter(
        (q) => q.section === "sectionA",
      );

      const totalYesAnswers = [
        ...relatedQuestionsA3,
        ...relatedQuestionsA,
      ].filter((q) => answers[q.id] === "si").length;

      return totalYesAnswers >= 5; // Retorna true o false
    },
  },
  {
    id: "sectionA4b",
    title: "Modulo A4b ",
    questions: questions.filter((q) => q.section === "sectionA4b"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(
        (q) => q.section === "sectionA4a",
      );
      return relatedQuestions.some((q) => answers[q.id] === "si"); // Retorna true o false
    },
  },
  {
    id: "sectionA5b",
    title: "Modulo A5b",
    questions: questions.filter((q) => q.section === "sectionA5b"),
    dependsOn: (answers) => {
      // Buscar el diagnóstico "Episodio Depresivo Mayor Actual"
      const majorDepressiveEpisode = myDiagnoses.find(
        (diagnosis) => diagnosis.id === "major_depressive_episode",
      );

      // Verificar si se cumple la condición de A5a (es decir, A2 = "sí")
      const a5aCondition = answers["QuestionA2"]?.toLowerCase() === "si";

      // Verificar si se cumple la condición de A4b (es decir, A4b = "sí")
      const a4bCondition = answers["QuestionA4b"]?.toLowerCase() === "si";

      // A5b se muestra si todas las condiciones son verdaderas
      return (
        (majorDepressiveEpisode?.dependsOn(answers) ?? false) &&
        a5aCondition &&
        a4bCondition
      );
    },
  },
  /* {
    id: "sectionA6",
    title:
      "Modulo A6 - Durante las últimas 2 semanas, cuando se sintió deprimido o sin interés en la mayoría de las cosas:",
    questions: questions.filter((q) => q.section === "sectionA6"),
    dependsOn: (answers) => {
      // Se muestra solo si A5b fue respondida con "sí"
      const a5bCondition = answers["QuestionA5b"]?.toLowerCase() === "si";
      return a5bCondition;
    },
  },*/
  {
    id: "sectionA6",
    title:
      "Modulo A6 - Durante las últimas 2 semanas, cuando se sintió deprimido o sin interés en la mayoría de las cosas: ",
    questions: questions.filter((q) => q.section === "sectionA6"),
    dependsOn: (answers) => {
      // Se muestra si A5a (¿CODIFICÓ SÍ EN A2?) o A5b fueron respondidas con "sí"
      const a5aCondition = answers["QuestionA2"]?.toLowerCase() === "si"; // Esto es la condición interna de A5a
      const a5bCondition = answers["QuestionA5b"]?.toLowerCase() === "si"; // Esto es la respuesta a A5b

      // A6 se muestra si alguna de las condiciones (A5a o A5b) es "sí"
      return a5aCondition || a5bCondition;
    },
  },
  {
    id: "sectionB",
    title: "Modulo B - Preguntas Iniciales",
    questions: questions.filter((q) => q.section === "sectionB1"),
    dependsOn: (answers) => true, // Siempre visible
  },
]; // <- Esto cierra correctamente el array
