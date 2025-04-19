import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#BCE9FF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
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
    fontSize: Platform.select({ web: 32, default: 24 }),
    fontWeight: "bold",
    color: "#3F88C5",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Platform.select({ web: 20, default: 16 }),
    color: "#2c3e50",
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  summaryBox: {
    backgroundColor: "#EDF9FF",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  summaryText: {
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  diagnosisSection: {
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: Platform.select({ web: 22, default: 18 }),
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#3F3F3F",
  },
  diagnosisItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  diagnosisName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
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
    backgroundColor: "#3F88C5",
    padding: Platform.select({ web: 20, default: 15 }),
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.select({ web: 20, default: 16 }),
  },
});

export default styles;
