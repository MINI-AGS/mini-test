import React from "react";
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "../QuestionsScreen/styles";

interface LoadingModalProps {
  visible: boolean;
  onCancel: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, onCancel }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.modalTitle}>Guardando datos...</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default LoadingModal;
