// types.18:19:36
// // types.ts
export interface AnswerState {
  [key: string]: string;
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
  questions: Question[];
  defaultAnswer?: string;
  dependsOn: (answers: any) => boolean | string;
  isDisabled?: (answers: any) => boolean | string;
  // Nueva propiedad para evaluar condiciones como E5
  evaluateConditions?: (answers: any) => Record<
    string,
    {
      isMet: boolean;
      result?: string;
    }
  >;
}
export interface Diagnosis {
  id: string;
  name: string;
  result?: string; // Hacer que result sea opcional
  criteria?: (answers: Record<string, string>) => "sí" | "no";
  dependsOn: (answers: any) => boolean | string;
}

export interface Flags {
  id: string;
  dependsOn: (answers: Record<string, string>) => boolean;
}
