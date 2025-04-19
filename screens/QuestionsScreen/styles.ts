import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#BCE9FF",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  moduleGroup: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "black",
    elevation: 4,

    width: Platform.select({
      web: "90%",
      default: "100%",
    }),
    maxWidth: Platform.OS === "web" ? 1000 : "100%",
    alignSelf: Platform.select({
      web: "center",
      default: "stretch",
    }),
  },
  moduleGroupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // clave para alinear verticalmente
    height: Platform.select({
      web: 60,
      default: 56,
    }),
    paddingHorizontal: Platform.select({
      web: 24,
      default: 16,
    }),
    backgroundColor: "transparent", // o mantenlo como esté
  },

  moduleGroupTitle: {
    color: "white",
    fontSize: Platform.select({
      web: 22,
      default: 16,
    }),
    fontWeight: "bold",
    flex: 1, // <- Esto es clave
    includeFontPadding: false,
    lineHeight: Platform.select({
      web: 24,
      default: 22,
    }),
  },

  moduleGroupContent: {
    padding: Platform.select({
      web: 30,
      default: 12,
    }),
    backgroundColor: "#EDF9FF", // Fondo celeste claro uniforme
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Platform.select({
      web: 30,
      default: 16,
    }),
    alignItems: "center", // esto alinea verticalmente en web
  },

  question: {
    marginBottom: Platform.select({
      web: 20,
      default: 16,
    }),
  },

  questionText: {
    fontSize: Platform.select({
      web: 24,
      default: 14,
    }),
    color: "#333",
    flex: 1,
    paddingRight: Platform.select({
      web: 16,
      default: 12,
    }),
    fontWeight: "bold", // Cambiado de "500" a "bold"
    lineHeight: Platform.select({
      web: 32,
      default: 20,
    }),
  },

  answerContainer: {
    width: Platform.select({
      web: "25%",
      default: "35%",
    }),
    justifyContent: "center",
    alignItems: "flex-end", // Alinea a la derecha
  },

  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  required: {
    color: "red",
    fontWeight: "bold",
    fontSize: Platform.select({
      web: 20,
      default: undefined,
    }),
  },

  options: {
    flexDirection: "column",
    gap: Platform.select({
      web: 16,
      default: 8,
    }),
    marginTop: Platform.select({
      web: 22,
      default: 18,
    }),
  },

  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Platform.select({
      web: 12,
      default: 4,
    }),
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Platform.select({
      web: 12,
      default: 4,
    }),
  },

  radioLabel: {
    fontSize: Platform.select({
      web: 20,
      default: 14,
    }),
    color: "#333",
    fontWeight: "bold", // Añadir esta línea
  },

  arrowIcon: {
    color: "white",
    fontSize: Platform.select({
      web: 28,
      default: 18,
    }),
    marginLeft: 10,
    includeFontPadding: false,
  },
  optionLabel: {
    fontSize: Platform.select({
      web: 20,
      default: 14,
    }),
    color: "#333",
  },

  input: {
    backgroundColor: "white",
    padding: Platform.select({
      web: 16,
      default: 10,
    }),
    borderRadius: 10,
    fontSize: Platform.select({
      web: 20,
      default: 14,
    }),
    elevation: 2,
    minHeight: Platform.select({
      web: 50,
      default: undefined,
    }),
  },

  submitButton: {
    marginTop: Platform.select({
      web: 40,
      default: 24,
    }),
    backgroundColor: "#3F88C5",
    padding: Platform.select({
      web: 20,
      default: 14,
    }),
    borderRadius: 12,
    alignItems: "center",
    width: Platform.select({
      web: "50%",
      default: "100%",
    }),
    alignSelf: "center",
  },

  submitButtonText: {
    color: "white",
    fontSize: Platform.select({
      web: 24,
      default: 16,
    }),
    fontWeight: "bold",
  },

  diagnosis: {
    backgroundColor: "#fff",
    padding: Platform.select({
      web: 30,
      default: 16,
    }),
    borderRadius: 12,
    elevation: 3,
    marginBottom: Platform.select({
      web: 30,
      default: 16,
    }),
    width: Platform.select({
      web: "90%",
      default: "100%",
    }),
    alignSelf: "center",
  },

  diagnosisTitle: {
    fontSize: Platform.select({
      web: 28,
      default: 16,
    }),
    fontWeight: "bold",
    color: "#3F3F3F",
  },

  debug: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  debugTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  debugText: {
    fontSize: 12,
    color: "#333",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 22,
    backgroundColor: "#BCC6E2", // Botón completamente blanco
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    elevation: 2, // Opcional: da una sombra sutil
  },
  radioChecked: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3F88C5",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
  },
  cancelButtonText: {
    color: "#f44336",
    fontWeight: "bold",
  },
  questionImage: {
    width: "100%",
    aspectRatio: 1322 / 342, // maintain image aspect ratio
    borderRadius: 5,
    resizeMode: "cover",
  },
});

export default styles;
