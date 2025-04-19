import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 8,
  },
  required: {
    color: "red",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  moduleGroup: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  moduleGroupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  moduleGroupTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  moduleGroupContent: {
    paddingLeft: 8,
  },
  question: {
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  options: {
    marginLeft: 8,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  optionLabel: {
    marginLeft: 8,
    fontSize: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 8,
    fontSize: 15,
    backgroundColor: "white",
  },
  diagnosis: {
    backgroundColor: "#E0F7FA",
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  diagnosisTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#00796B",
  },
  debug: {
    marginTop: 24,
    backgroundColor: "#F0F4C3",
    padding: 16,
    borderRadius: 8,
  },
  debugTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  debugText: {
    fontFamily: "monospace",
    fontSize: 13,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
modalMessage: {
  fontSize: 16,
  marginVertical: 10,
  textAlign: 'center',
},
modalButton: {
  marginTop: 15,
  padding: 10,
  backgroundColor: '#2196F3',
  borderRadius: 5,
  minWidth: 100,
  alignItems: 'center',
},
modalButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
cancelButton: {
  marginTop: 15,
  padding: 10,
},
cancelButtonText: {
  color: '#f44336',
  fontWeight: 'bold',
},
});

export default styles;

export const getModuleGroupStyle = (groupId: string) => {
  const groupColors: Record<string, string> = {
    moduloData: "#E3F2FD",
    moduloA: "#E8F5E9",
    moduloB: "#FFF3E0",
    moduloC: "#F3E5F5",
    ungrouped: "#ECEFF1",
  };

  return {
    ...styles.moduleGroup,
    backgroundColor: groupColors[groupId] || groupColors["ungrouped"],
  };
};
