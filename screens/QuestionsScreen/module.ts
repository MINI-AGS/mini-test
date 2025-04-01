
import { questions } from "./questions";
import { Section } from "./types"; // Asegúrate de importar Section si no lo tienes

export const sections: Section[] = [
  {
    id: "sectionA",
    title: "Modulo A - Preguntas Iniciales",
    questions: questions.filter(q => q.section === "sectionA"),
    dependsOn: (answers) => true, // Siempre visible
  },
  {
    id: "sectionA3",
    title: "Modulo A3 - Preguntas Avanzadas",
    questions: questions.filter(q => q.section === "sectionA3"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(q => q.section === "sectionA");
      return relatedQuestions.some(q => answers[q.id] === "si"); // Verifica si alguna respuesta es "si"
    },
  },
  {
    id: "sectionA4a",
    title: "Modulo A4a - Preguntas Especiales",
    questions: questions.filter(q => q.section === "sectionA4a"),
    dependsOn: (answers) => {
      const relatedQuestionsA3 = questions.filter(q => q.section === "sectionA3");
      const relatedQuestionsA = questions.filter(q => q.section === "sectionA");

      const totalYesAnswers = [...relatedQuestionsA3, ...relatedQuestionsA]
        .filter(q => answers[q.id] === "si").length;

      return totalYesAnswers >= 5; // Muestra si hay al menos 5 respuestas "si"
    },
  },
]; // <- Esto cierra correctamente el array
