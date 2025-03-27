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
  id: number;
  text: string;
  options: string[];
}

const QuestionsScreen = ({ navigation }: { navigation: any }) => {
const questions: Question[] = [
    {
      id: 1,
      text: "Cual es la capital de Espana?",
      options: ["Madrid", "Barcelona", "Valencia", "Sevilla"]
    },
    {
      id: 2,
      text: "Cuantos continentes hay en el mundo?",
      options: ["5", "6", "7", "8"]
    },
    {
      id: 3,
      text: "Cual es el rio mas largo del mundo?",
      options: ["Amazonas", "Nilo", "Misisipi", "Yangtse"]
    },
    {
      id: 4,
      text: "Cual es el planeta mas grande del sistema solar?",
      options: ["Tierra", "Marte", "Jupiter", "Saturno"]
    },
    {
      id: 5,
      text: "En que ano comenzo la Segunda Guerra Mundial?",
      options: ["1935", "1939", "1941", "1945"]
    },
    {
      id: 6,
      text: "Cual es el metal mas abundante en la corteza terrestre?",
      options: ["Oro", "Plata", "Hierro", "Aluminio"]
    },
    {
      id: 7,
      text: "Cual es el pais mas poblado del mundo?",
      options: ["India", "Estados Unidos", "Indonesia", "China"]
    },
    {
      id: 8,
      text: "Cual es el idioma mas hablado en el mundo?",
      options: ["Ingles", "Espanol", "Mandarin", "Hindi"]
    },
    {
      id: 9,
      text: "Cual es el oceano mas grande?",
      options: ["Atlantico", "Indico", "Artico", "Pacifico"]
    },
    {
      id: 10,
      text: "Cual es el elemento quimico mas abundante en el universo?",
      options: ["Oxigeno", "Carbono", "Helio", "Hidrogeno"]
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const isAllQuestionsAnswered = () => {
    return Object.keys(selectedAnswers).length === questions.length;
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Cuestionario de Conocimientos</Text>
      
      {questions.map((question) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
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
