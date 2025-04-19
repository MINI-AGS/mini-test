import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: width * 0.9,
    maxWidth: 400,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 25,
    textAlign: "center",
  },
  summaryBox: {
    backgroundColor: "#e8f5e9",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  summaryText: {
    marginBottom: 10,
    textAlign: "center",
  },
  diagnosisSection: {
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  diagnosisItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  diagnosisName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  diagnosisResult: {
    fontSize: 14,
    color: "#555",
  },
  noDiagnosisText: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    marginTop: 10,
  },
  homeButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
