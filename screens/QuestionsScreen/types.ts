// types.18:19:36
// // types.ts
export interface AnswerState {
  [key: string]: string | string[];
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  section: string;
  questionType?: "radio" | "checkbox" | "text"; // Tipo de pregunta (radio por defecto)
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
  defaultAnswer?: string;
  dependsOn: (answers: any) => boolean | string;
  beforeShow?: (answers: Record<string, any>) => void;
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
  result?: (answers: any) => string;
  criteria?: (answers: Record<string, string>) => "sí" | "no";
  dependsOn: (answers: any) => boolean | string;
}

export interface Flags {
  id: string;
  dependsOn: (answers: Record<string, string>) => boolean;
}
