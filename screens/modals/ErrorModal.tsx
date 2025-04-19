import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../QuestionsScreen/styles";
import { ErrorModalProps } from "../navigation";

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  title,
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
        <Text style={[styles.modalTitle, { color: "#f44336" }]}>{title}</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Entendido</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ErrorModal;
