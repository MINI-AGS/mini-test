import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import styles from "./StyleHome";
const HomePagePhoto = require("../../screens/HomeScreen/HomePagePhoto1.png");

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const { width } = Dimensions.get("window");
  const isSmallScreen = width < 1200;

  const privacyText = `
    AVISO DE PRIVACIDAD\n\n
    En cumplimiento con la Ley Federal de Protección de Datos Personales, te informamos que:\n\n
    1. Tus datos personales serán protegidos y tratados de manera confidencial.\n
    2. La información recabada será utilizada exclusivamente para fines estadísticos y de mejora en nuestros servicios.\n
    3. Puedes ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación u Oposición) enviando un correo a privacidad@encuestasana.com.\n
    4. No compartiremos tu información con terceros sin tu consentimiento expreso.\n\n
    Última actualización: ${new Date().getFullYear()}
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container,
          isSmallScreen ? styles.vertical : styles.horizontal,
        ]}
      >
        {/* Imagen en ambas plataformas */}
        <View style={styles.leftContainer}>
          <Image
            source={HomePagePhoto} // Usa la referencia importada
            style={styles.homeImage}
            resizeMode="contain"
          />
          {/* Círculo decorativo */}
          <View style={styles.circle} />
        </View>

        {/* Contenedor unificado */}
        <View style={styles.rightContainer}>
          <Text style={styles.title}>Bienvenido a tu{"\n"}encuesta sana</Text>

          <Text style={styles.description}>
            Responde esta breve encuesta para evaluar tu estado de ánimo y
            bienestar. Es confidencial y te ayudará a dar el siguiente paso
            hacia una mejor salud mental.
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate("Questions")}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              COMENZAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setPrivacyModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Leer aviso de privacidad
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Aviso de Privacidad */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={privacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPrivacyModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Aviso de Privacidad</Text>
                <Text style={styles.modalText}>{privacyText}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setPrivacyModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Entendido</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
