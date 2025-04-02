import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  moduleHeader: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  moduleTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  moduleContent: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: "#6200ea",
  },
  optionText: {
    fontSize: 14,
    color: "black",
  },
  selectedOptionText: {
    color: "white",
  },
});

export default styles;
