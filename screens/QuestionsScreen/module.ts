import { Section } from "./types";
import { questions } from "./questions";

export const sections: Section[] = [
  {
    id: "sectionA",
    title: "Sección A - Preguntas Iniciales",
    questions: questions.filter((q) => q.section === "sectionA"),
    dependsOn: { sectionId: "sectionA", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionA3", // Agregar sectionA3
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionA3"),
    dependsOn: { sectionId: "sectionA3", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionA4a", // Agregar sectionA4a
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionA4a"),
    dependsOn: { sectionId: "sectionA4a", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionA4b", // Agregar sectionA4b
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionA4b"),
    dependsOn: { sectionId: "sectionA4b", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionA5b", // Agregar sectionA4b
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionA5b"),
    dependsOn: { sectionId: "sectionA5b", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionA6", // Agregar sectionA4b
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionA6"),
    dependsOn: { sectionId: "sectionA6", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  //COMIENZA LA SECCION B
  {
    id: "sectionB1", // Agregar sectionA4b
    title: "Sección B: Trastorno distímico", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionB1"),
    dependsOn: { sectionId: "sectionB1", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionB2", // Agregar sectionA4b
    title: "", // No queremos título adicional, ya que es una continuación de sectionA
    questions: questions.filter((q) => q.section === "sectionB2"),
    dependsOn: { sectionId: "sectionB2", requireAllYes: false }, // Depende de sectionA y solo necesita que al menos una respuesta sea "sí"
  },
  {
    id: "sectionB3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionB3"),
    dependsOn: { sectionId: "sectionB3", requireAllYes: false }, // Ajustado a un objeto
  },
  {
    id: "sectionB4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionB4"),
    dependsOn: { sectionId: "sectionB4", requireAllYes: false }, // Ajustado a un objeto
  },
  //modulo c
  {
    id: "sectionC",
    title: "Sección C - Riesgo de suicidio",
    questions: questions.filter((q) => q.section === "sectionC"),
    dependsOn: { sectionId: "sectionC", requireAllYes: true }, // Ajustado a un objeto
  },
  //modulo d
  {
    id: "sectionD12",
    title: "Sección D - Episodio (hipo)maníaco",
    questions: questions.filter((q) => q.section === "sectionD12"),
    dependsOn: { sectionId: "sectionD12", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionD3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionD3"),
    dependsOn: { sectionId: "sectionD3", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionD4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionD4"),
    dependsOn: { sectionId: "sectionD4", requireAllYes: true }, // Ajustado a un objeto
  },
  //modulo E
  {
    id: "sectionE1a",
    title: "Sección E - Trastorno de angustia",
    questions: questions.filter((q) => q.section === "sectionE1a"),
    dependsOn: { sectionId: "sectionE1a", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionE1b",
    title: "",
    questions: questions.filter((q) => q.section === "sectionE1b"),
    dependsOn: { sectionId: "sectionE1b", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionE23",
    title: "",
    questions: questions.filter((q) => q.section === "sectionE23"),
    dependsOn: { sectionId: "sectionE23", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionE4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionE4"),
    dependsOn: { sectionId: "sectionE4", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionE7",
    title: "",
    questions: questions.filter((q) => q.section === "sectionE7"),
    dependsOn: { sectionId: "sectionE7", requireAllYes: true }, // Ajustado a un objeto
  },
  //seccion from
  {
    id: "sectionF1",
    title: "Sección F - Agorafobia",
    questions: questions.filter((q) => q.section === "sectionF1"),
    dependsOn: { sectionId: "sectionF1", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionF2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionF2"),
    dependsOn: { sectionId: "sectionF2", requireAllYes: true }, // Ajustado a un objeto
  },
  //section G
  {
    id: "sectionG1",
    title: "Sección G - Fobia social (trastorno de ansiedad social)",
    questions: questions.filter((q) => q.section === "sectionG1"),
    dependsOn: { sectionId: "sectionG1", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionG2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionG2"),
    dependsOn: { sectionId: "sectionG2", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionG3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionG3"),
    dependsOn: { sectionId: "sectionG3", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionG4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionG4"),
    dependsOn: { sectionId: "sectionG4", requireAllYes: true }, // Ajustado a un objeto
  },
  //Section h
  {
    id: "sectionH1",
    title: "Sección H - Fobia social (trastorno de ansiedad social)",
    questions: questions.filter((q) => q.section === "sectionH1"),
    dependsOn: { sectionId: "sectionH1", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionH2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionH2"),
    dependsOn: { sectionId: "sectionH2", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionH34",
    title: "",
    questions: questions.filter((q) => q.section === "sectionH34"),
    dependsOn: { sectionId: "sectionH34", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionH5",
    title: "",
    questions: questions.filter((q) => q.section === "sectionH5"),
    dependsOn: { sectionId: "sectionH5", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionH6",
    title: "",
    questions: questions.filter((q) => q.section === "sectionH6"),
    dependsOn: { sectionId: "sectionH6", requireAllYes: true }, // Ajustado a un objeto
  },
  //section I1
  {
    id: "sectionI1",
    title: "",
    questions: questions.filter((q) => q.section === "sectionI1"),
    dependsOn: { sectionId: "sectionI1", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionI2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionI2"),
    dependsOn: { sectionId: "sectionI2", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionI3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionI3"),
    dependsOn: { sectionId: "sectionI3", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionI4",
    title: "",
    questions: questions.filter((q) => q.section === "sectionI4"),
    dependsOn: { sectionId: "sectionI4", requireAllYes: true }, // Ajustado a un objeto
  },
  {
    id: "sectionI5",
    title: "",
    questions: questions.filter((q) => q.section === "sectionI5"),
    dependsOn: { sectionId: "sectionI5", requireAllYes: true }, // Ajustado a un objeto
  },
  //modulo j
  {
    id: "sectionJ1",
    title: "",
    questions: questions.filter((q) => q.section === "sectionJ1"),
    dependsOn: { sectionId: "sectionJ1", requireAllYes: true },
  },
  {
    id: "sectionJ2",
    title: "",
    questions: questions.filter((q) => q.section === "sectionJ2"),
    dependsOn: { sectionId: "sectionJ2", requireAllYes: true },
  },
  {
    id: "sectionJ3",
    title: "",
    questions: questions.filter((q) => q.section === "sectionJ3"),
    dependsOn: { sectionId: "sectionJ3", requireAllYes: true },
  },
  //section K ME FALTA
  //SECTION
];
