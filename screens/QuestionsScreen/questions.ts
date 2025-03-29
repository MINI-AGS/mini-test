//questions.ts
import { Question } from "./types";

export const questions: Question[] = [
  // Módulo A
  {
    id: "a1",
    text: "¿Quieres continuar al siguiente módulo?",
    options: ["si", "no"],
    module: "moduloA",
  },
  {
    id: "a2",
    text: "¿Estás seguro de querer continuar?",
    options: ["si", "no"],
    module: "moduloA",
  },
  
  // Módulo B
  {
    id: "b1",
    text: "Pregunta 1 del módulo B",
    options: ["si", "opción 2", "opción 3"],
    module: "moduloB",
  },
  {
    id: "b2",
    text: "Pregunta 2 del módulo B",
    options: ["si", "no", "tal vez"],
    module: "moduloB",
  },
  {
    id: "b3",
    text: "¿Algún comentario adicional?",
    module: "moduloB",
  }
];
