// types.ts
export interface Question {
  id: string;
  text: string;
  options?: string[]; // Opciones para preguntas tipo selecci—n
  module: string; // Referencia al m—dulo al que pertenece
}

export interface Module {
  id: string;
  title: string;
  questions: Question[]; // Se asignar‡n preguntas din‡micamente
  defaultAnswer?: string;
  dependsOn?: {
    moduleId: string; // ID del m—dulo del que depende
    requireAllYes: boolean;
  };
}
