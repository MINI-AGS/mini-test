import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  SafeAreaView,
  Image 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const EndScreen = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Optional image/icon */}
        <Image
          source={require('../assets/icon.png')} // Update with your actual image path
          style={styles.image}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>ÁProceso Completado!</Text>
        
        <Text style={styles.subtitle}>
          Gracias por completar el cuestionario.
        </Text>
        
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Tus respuestas han sido registradas correctamente.
          </Text>
          <Text style={styles.summaryText}>
            Un profesional revisar‡ tu caso pronto.
          </Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#4CAF50', // Optional color for the image
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 25,
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  summaryText: {
