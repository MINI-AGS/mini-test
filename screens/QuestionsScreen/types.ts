// types.18:19:36
// // types.ts
export interface AnswerState {
  [questionId: string]: string;
}

export interface Question {
  id: string;
  text: string;
  options?: string[]; // Opciones para preguntas tipo seleccin
  section: string; // Referencia al mdulo al que pertenece
}

export interface Section {
  id: string;
  title: string;
  questions: Question[]; // Se asignarán preguntas dinámicamente
  defaultAnswer?: string;
  dependsOn: (answers: any) => boolean | string; // Permitir tanto booleano como string
}
export interface Diagnosis {
  id: string;
  name: string;
  criteria: (answers: Record<string, string>) => "sí" | "no"; // Mantiene el criterio de evaluación
  dependsOn: (answers: any) => boolean | string; // Permitir tanto booleano como string
}
