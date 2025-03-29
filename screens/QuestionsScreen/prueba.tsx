import React, { useState, useEffect } from 'react';
import { Module, Question } from './types';
import { modules } from './module';
import { questions } from './questions';

interface AnswerState {
  [questionId: string]: string;
}

//ZONA PIBBLE================================================
const QuestionDisplay: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [visibleModules, setVisibleModules] = useState<string[]>(["moduloA"]);

  // Funcion para manejar las respuestas
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Efecto para actualizar modulos visibles cuando cambian las respuestas
  useEffect(() => {
    const newVisibleModules: string[] = ["moduloA"]; // El modulo A siempre es visible

    // Verificar cada modulo con dependencias
    modules.forEach(module => {
      if (module.id === "moduloA") return; // Saltamos el modulo A que ya esta incluido

      // Verificar si el modulo debe ser visible utilizando la funcion dependsOn
      if (module.dependsOn(answers)) {
        newVisibleModules.push(module.id);
      }
    }); 

     // Eliminar respuestas de los modulos que no son visibles
    const newAnswers = { ...answers };
    modules.forEach(module => {
      if (!newVisibleModules.includes(module.id)) {
        module.questions.forEach(question => {
          delete newAnswers[question.id]; // Eliminar las respuestas de las preguntas del modulo no visible
        });
      }
    });

    setVisibleModules(newVisibleModules);
    setAnswers(newAnswers)
  }, [answers]); // Este efecto se ejecuta cada vez que cambian las respuestas
  //ZONA PIBBLE =============================================
  return (
    <div className="question-system">
      {modules.map(module => {
        // Verificar si el modulo debe mostrarse
        if (!visibleModules.includes(module.id)) {
          return null;
        }
        
        return (
          <div key={module.id} className="module">
            <h2>{module.title}</h2>
            
            {module.questions.map(question => (
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
