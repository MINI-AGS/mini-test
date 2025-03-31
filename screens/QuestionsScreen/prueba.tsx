import React, { useState, useEffect } from "react";
import { Section, Question } from "./types";
import { sections } from "./module";
import { questions } from "./questions";

interface AnswerState {
  [questionId: string]: string;
}

const QuestionDisplay: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [visibleSections, setVisibleSections] = useState<string[]>([
    "sectionA",
  ]);

  // Función para manejar las respuestas
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    const newVisibleSections: string[] = ["sectionA"]; // El section A siempre es visible

    // Verificar si se debe mostrar el section A3 basándose en las respuestas de sectionA
    const relatedQuestionsA = questions.filter((q) => q.section === "sectionA");
    const anyYesA = relatedQuestionsA.some((q) => answers[q.id] === "si");

    // Filtrar las preguntas del section A3 (las preguntas adicionales)
    const relatedQuestionsA3 = questions.filter(
      (q) => q.section === "sectionA3",
    );

    // Si alguna respuesta de sectionA es "sí", mostramos las preguntas de sectionA3
    if (anyYesA) {
      relatedQuestionsA3.forEach((q) => {
        if (!newVisibleSections.includes(q.section)) {
          newVisibleSections.push(q.section); // Agregar el section A3 si alguna pregunta de sectionA es "sí"
        }
      });
    } else {
      // Si no hay respuesta "sí" en sectionA, mostramos sectionB
      const relatedQuestionsB = questions.filter(
        (q) => q.section === "sectionB1",
      );
      relatedQuestionsB.forEach((q) => {
        if (!newVisibleSections.includes(q.section)) {
          newVisibleSections.push(q.section); // Agregar sectionB
        }
      });
    }

    // Contar cuántas respuestas "si" hay en las preguntas de section A y section A3
    const countYesAnswers = [
      ...relatedQuestionsA,
      ...relatedQuestionsA3,
    ].filter((q) => answers[q.id] === "si").length;

    // Si hay 5 o más respuestas "sí", mostrar sectionA4a, de lo contrario sectionB
    if (countYesAnswers >= 5) {
      newVisibleSections.push("sectionA4a"); // Mostrar sectionA4a si cumple con la condición
    } else {
      newVisibleSections.push("sectionB1"); // Mostrar sectionB si no cumple la condición
    }

    // Actualizar los sections visibles
    setVisibleSections(newVisibleSections);

    // Limpiar respuestas de sections que no son visibles
    const newAnswers = { ...answers };
    sections.forEach((section) => {
      if (!newVisibleSections.includes(section.id)) {
        section.questions.forEach((question) => {
          delete newAnswers[question.id];
        });
      }
    });

    setAnswers(newAnswers);
  }, [answers]); // Este efecto se ejecuta cada vez que cambian las respuestas

  return (
    <div className="question-system">
      {sections.map((section) => {
        // Verificar si el section debe mostrarse
        if (!visibleSections.includes(section.id)) {
          return null; // No renderizamos el section si no está en los sections visibles
        }

        return (
          <div key={section.id} className="section">
            <h2>{section.title}</h2>

            {section.questions.map((question) => (
              <div key={question.id} className="question">
                <p>{question.text}</p>

                {question.options ? (
                  <div className="options">
                    {question.options.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleAnswer(question.id, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder="Escribe tu respuesta"
                  />
                )}
              </div>
            ))}
          </div>
        );
      })}

      <div className="debug">
        <h3>Estado de respuestas:</h3>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
        <h3>Secciones visibles:</h3>
        <pre>{JSON.stringify(visibleSections, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QuestionDisplay;
