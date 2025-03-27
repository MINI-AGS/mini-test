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
  options: string[];
}

const QuestionsScreen = ({ navigation }: { navigation: any }) => {
  const questions: Question[] = [
    { id: '1', text: "Madrid es la capital de Espana?", options: ["si", "no"] },
    { id: '2', text: "Hay 7 continentes en el mundo?", options: ["si", "no"] },
    { id: '3', text: "El rio Amazonas es el mas largo del mundo?", options: ["si", "no"] },
    { id: '4', text: "Jupiter es el planeta mas grande del sistema solar?", options: ["si", "no"] },
    { id: '5', text: "La Segunda Guerra Mundial comenzo en 1939?", options: ["si", "no"] },
    { id: '6', text: "El aluminio es el metal mas abundante en la corteza terrestre?", options: ["si", "no"] },
    { id: '7', text: "China es el pais mas poblado del mundo?", options: ["si", "no"] },
    { id: '8', text: "El Mandarin es el idioma mas hablado en el mundo?", options: ["si", "no"] },
    { id: '9', text: "El oceano Pacifico es el mas grande?", options: ["si", "no"] },
    { id: '10', text: "El hidrogeno es el elemento quimico mas abundante en el universo?", options: ["si", "no"] }
  ];


  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});

  const handleAnswerSelect = (questionId: string, answer: string) => {
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
