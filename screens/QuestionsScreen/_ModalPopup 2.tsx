import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

const ModalPopup: React.FC<Props> = ({ visible, onClose, title, message }) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.messageContainer}>
            {message.split("\n").map((line, index) => (
              <Text key={index} style={styles.modalText}>
                {line}
              </Text>
            ))}
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    elevation: 5,
    maxWidth: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  messageContainer: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 4,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "stretch",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ModalPopup;
