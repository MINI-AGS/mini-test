import React, { useState, useEffect } from "react";
import { Section, Question } from "./types";
import { sections } from "./module";
import { questions } from "./questions";
import { diagnosis } from "./diagnosis";

interface AnswerState {
  [questionId: string]: string;
}

//ZONA PIBBLE================================================
const QuestionDisplay: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [visibleModules, setVisibleModules] = useState<string[]>(["sectionA"]);

  // Funcion para manejar las respuestas
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Efecto para actualizar modulos visibles cuando cambian las respuestas
  //
  useEffect(() => {
  const newVisibleModules: string[] = ["sectionA"]; // El modulo A siempre es visible

  sections.forEach(section => {
    if (section.id === "sectionA") return;
    if (section.dependsOn(answers)) {
      newVisibleModules.push(section.id);
    }
    /*
    if(diagnosis.criteria(answers)){
      newVisibleModules.push(diagnosis.id)
    }
    */
  });

  // Eliminar respuestas de los módulos que no son visibles
  const newAnswers = { ...answers };
  let hasChanges = false; // Variable para rastrear si hay cambios en respuestas

  sections.forEach(section => {
    if (!newVisibleModules.includes(section.id)) {
      section.questions.forEach(question => {
        if (question.id in newAnswers) {
          delete newAnswers[question.id];
          hasChanges = true; // Detectamos un cambio
        }
      });
    }
  });

  // Solo actualizar el estado si realmente hay cambios
  if (JSON.stringify(visibleModules) !== JSON.stringify(newVisibleModules)) {
    setVisibleModules(newVisibleModules);
  }

  if (hasChanges) {
    setAnswers(newAnswers);
  }
}, [answers]);

  //ZONA PIBBLE =============================================
  return (
    <div className="question-system">
      {sections.map(section => {
        // Verificar si el modulo debe mostrarse
        if (!visibleModules.includes(section.id)) {
          return null;
        }
        
        return (
          <div key={section.id} className="section">
            <h2>{section.title}</h2>
            
            {section.questions.map(question => (
              <div key={question.id} className="question">
                <p>{question.text}</p>
                
                {question.options ? (
                  <div className="options">
                    {question.options.map(option => (
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
                    value={answers[question.id] || ''}
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
        <h3>Modulos visibles:</h3>
        <pre>{JSON.stringify(visibleModules, null, 2)}</pre>
      </div>
    </div>
  );
};

export default QuestionDisplay;
