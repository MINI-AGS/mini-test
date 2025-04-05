import { Question, Flags } from "./types";

export const flags: Flags[] = [
  {
    id: "PastAnswers",
    dependsOn: (answers) => {
      return answers["questionA2"] === "si";
    },
  },
  //Ir poniendo las demas banderas si es requerido
];
//============ En teoria no se deveia de mover
export const FlagFunctions = {
  isFlagActive: (flagId: string, answers: Record<string, string>): boolean => {
    const flag = flags.find((f) => f.id === flagId);
    return flag ? flag.dependsOn(answers) : false;
  },
};
//================================================
