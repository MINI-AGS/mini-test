import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home Page</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Start" 
            onPress={() => navigation.navigate('Questions')} 
            color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Anade un fondo suave
  },
  content: {
    width: width * 0.85, // Ocupa el 85% del ancho de la pantalla
    maxWidth: 400, // Maximo ancho para pantallas grandes
    padding: width * 0.05, // Padding proporcional
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Sombra para efecto de profundidad
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  title: {
    fontSize: width * 0.06, // Tamano de fuente responsivo
    marginBottom: height * 0.03, // Margen proporcional
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '80%', // Ancho del boton
    borderRadius: 10, // Bordes redondeados
  }
});

export default HomeScreen;
