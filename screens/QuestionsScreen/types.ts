// types.18:19:36
// // types.ts
export interface Question {
  id: string;
  text: string;
  options?: string[]; // Opciones para preguntas tipo seleccin
  section: string; // Referencia al mdulo al que pertenece
}

export interface Section {
  id: string;
  title: string;
  questions: Question[]; // Se asignarn preguntas dinmicamente
  defaultAnswer?: string;
  dependsOn?: {
    sectionId: string; // ID del mdulo del que depende
    requireAllYes: boolean;
  };
}
