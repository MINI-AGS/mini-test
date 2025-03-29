import { Module } from "./types";
import { questions } from "./questions";

//@dependsOn es la logica

export const modules: Module[] = [
  {
    id: "moduloA",
    title: "Modulo A - Preguntas Iniciales",
    //SE DEJA IGUAL LO QUE CAMBIA ES EL NOMBRE DEL MODULO
    questions: questions.filter(q => q.module === "moduloA"),
    dependsOn: (answers) => true,  // Siempre visible
  },
  {
    id: "moduloB",
    title: "Modulo B - Preguntas Avanzadas",
    questions: questions.filter(q => q.module === "moduloB"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(q => q.module === "moduloA");
      // Se muestra si al menos una respuesta de "moduloA" es "si"
      return relatedQuestions.some(q => answers[q.id] === "si");
    },
  },
  {
    id: "moduloC",
    title: "Modulo C - Preguntas Especiales",
    questions: questions.filter(q => q.module === "moduloC"),
    dependsOn: (answers) => {
      const relatedQuestions = questions.filter(q => q.module === "moduloB");
      // Solo se muestra si todas las respuestas de "moduloB" son "si"
      return relatedQuestions.every(q => answers[q.id] === "si");
    },
  },
];

