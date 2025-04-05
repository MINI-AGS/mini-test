
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Question {
  id: string;
  text: string;
}

class QuestionWithOption implements Question {
  id: string;
  text: string;
  requiredOption: string;

  constructor(id: string, text: string, requiredOption: string) {
    this.id = id;
    this.text = text;
    this.requiredOption = requiredOption;
  }
}

class QuestionWithText implements Question {
  id: string;
  text: string;
  additionalText: string;

  constructor(id: string, text: string, additionalText: string) {
    this.id = id;
    this.text = text;
    this.additionalText = additionalText;
  }
}

const QuestionsScreen = ({ navigation }: { navigation: any }) => {
  const exampleQuestionsWithText: QuestionWithText[] = [
    new QuestionWithText('1', 'Cual es la capital de Espana?', 'Es una pregunta geografica sobre el pais de Espana'),
    new QuestionWithText('2', 'Cuantos continentes hay en el mundo?', 'Esta es una pregunta general sobre geografia mundial'),
    new QuestionWithText('3', 'Cual es el rio mas largo del mundo?', 'Pregunta sobre el curso de agua mas largo'),
    new QuestionWithText('4', 'Cual es el planeta mas grande del sistema solar?', 'Se refiere a la dimension del planeta mas grande del sistema solar'),
    new QuestionWithText('5', 'En que ano comenzo la Segunda Guerra Mundial?', 'Pregunta sobre la historia del conflicto global de la Segunda Guerra Mundial'),
  ];

  const exampleQuestionsWithOption: QuestionWithOption[] = [
    new QuestionWithOption('1', "Es el sol una estrella?", "si"),
    new QuestionWithOption('2', "El agua es un compuesto qmico?", "si"),
    new QuestionWithOption('3', "La luna es un salite natural de la Tierra?", "si"),
    new QuestionWithOption('4', "El Everest es la monta ms alta del mundo?", "si"),
    new QuestionWithOption('5', "El l vive en la selva?", "no")
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const isAllQuestionsAnswered = () => {
    return Object.keys(selectedAnswers).length === exampleQuestionsWithOption.length;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Cuestionario de Conocimientos</Text>

      {exampleQuestionsWithOption.map((question) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {['si', 'no'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswers[question.id] === option && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(question.id, option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswers[question.id] === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.finishButton,
          !isAllQuestionsAnswered() && styles.disabledButton
        ]}
        onPress={() => navigation.navigate('End')}
        disabled={!isAllQuestionsAnswered()}
      >
        <Text style={styles.finishButtonText}>
          Finalizar Cuestionario
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  contentContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.1,
    paddingTop: height * 0.03
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#333'
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  questionText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: height * 0.01,
    color: '#333'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#e9e9e9',
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: height * 0.01,
    alignItems: 'center'
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: width * 0.04,
    color: '#333'
  },
  selectedOptionText: {
    color: 'white'
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02
  },
  disabledButton: {
    backgroundColor: '#a0a0a0'
  },
  finishButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold'
  }
});

export default QuestionsScreen;
