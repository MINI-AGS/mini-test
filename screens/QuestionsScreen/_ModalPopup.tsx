import React from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './styles';

interface ModalPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  showLoadingIndicator?: boolean;
  showCloseButton?: boolean;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  visible,
  onClose,
  title,
  message,
  showLoadingIndicator = false,
  showCloseButton = true,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          
          {showLoadingIndicator && (
            <ActivityIndicator 
              size="large" 
              color="#0000ff" 
              style={styles.loadingIndicator}
            />
          )}
          
          {showCloseButton && (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;
