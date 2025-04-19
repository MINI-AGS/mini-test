import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../QuestionsScreen/styles";

interface SuccessModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  message,
  onClose,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={[styles.modalTitle, { color: "#4CAF50" }]}>¡Éxito!</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SuccessModal;
