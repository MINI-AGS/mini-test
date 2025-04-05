import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    marginBottom: 15,
  },
  options: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  diagnosis: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  diagnosisTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  debug: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  debugTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  debugText: {
    fontFamily: "monospace",
    marginBottom: 10,
  },
});
export default styles;
