// types.18:19:36
// // types.ts
export interface AnswerState {
  [key: string]: string | string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  successMessage: string | null;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  section: string;
  questionType?: "radio" | "checkbox" | "text" | "int" | "date"; // Tipo de pregunta (radio por defecto)
  placeholder?: string; // Placeholder para preguntas de texto
  required?: boolean; // Indica si la pregunta es obligatoria
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
  moduleGroup?: string; // Nueva propiedad para agrupación
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
export interface ModuleGroup {
  id: string;
  title: string;
  sectionIds: string[]; // IDs de secciones que pertenecen a este módulo
  defaultExpanded?: boolean;
}
