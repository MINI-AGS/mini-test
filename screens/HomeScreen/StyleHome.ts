import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#BCE9FF",
    maxWidth: width,
    maxHeight: height,
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#BCE9FF",
    height: "100%",
    ...Platform.select({
      web: {
        maxWidth: width,
        maxHeight: height,
      },
      default: {
        paddingTop: 30, // Espacio superior para bajar todo el contenido
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
      },
    }),
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  vertical: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red", // Cambiado a rojo para destacar
    ...Platform.select({
      web: {
        width: "100%",
        height: "100%",
        maxWidth: 600,
        maxHeight: 600,
        marginTop: width < 1000 ? 300 : 0,
      },
      default: {
        width: "100%",
        height: "45%",
      },
    }),
  },
  circle: {
    width: 220,
    borderRadius: 110,
    backgroundColor: "#22B5FF", // Fondo azul mantenido
    ...Platform.select({
      // AJUSTAR CÍRCULO EN WEB
      web: {
        width: width < 1000 ? width * 0.8 : 500,
        height: width < 1000 ? width * 0.8 : 500,
        maxWidth: width < 100 ? 400 : 500,
        maxHeight: width < 100 ? 400 : 500,
        borderRadius: 275,
        // Efecto de contorno blanco:
        boxShadow: `
          0 0 10px #FFFFFF,
          0 0 20px #FFFFFF,
          0 0 30px rgba(255, 255, 255, 0.5)
        `,
        border: "3px solid rgba(255, 255, 255, 0.9)",
        filter: "blur(0.3px)",
      },
      default: {
        height: 220,
        alignSelf: "center",
      },
    }),
    position: "absolute",
    zIndex: 1,
    borderWidth: Platform.select({ web: 2, default: 1 }),
    borderColor: "rgba(255, 255, 255, 0.7)",
    // Efectos para móvil (se mantienen igual)
    ...Platform.select({
      ios: {
        shadowColor: "#FFFFFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 15,
      },
      android: {
        elevation: 15,
        borderColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: 2,
      },
    }),
  },
  homeImage: {
    zIndex: 3,
    position: "absolute",
    ...Platform.select({
      // AJUSTAR ESTA IMAGEN EN WEB
      web: {
        top: width < 1000 ? 50 : -100,
        width: width < 1000 ? 600 : 1000,
        height: width < 1000 ? 600 : 1000,
      },
      default: {
        top: -50,
        width: 450,
        height: 450,
      },
    }),
  },
  rightContainer: {
    maxWidth: 400,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#BCE9FF",
    zIndex: 2, // Asegura que esté sobre el círculo
    ...Platform.select({
      web: {
        width: "100%",
        height: "100%",
        maxWidth: 600,
        maxHeight: 600,
      },
      ios: {
        shadowColor: "#BCE9FF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontWeight: "800", // más negrita para que resalte
    color: "#000", // más negro como en la imagen
    textAlign: "center",
    marginBottom: 16,
    ...Platform.select({
      web: {
        fontSize: width < 1000 ? 40 : 60,
        marginBottom: 60, // Más espacio en web
      },
      default: {
        fontSize: width < 400 ? 28 : 32, // AUMENTADO
      },
    }),
  },
  description: {
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 30,
    ...Platform.select({
      web: {
        fontSize: width < 1000 ? 24 : 30,
        marginBottom: 20,
        textAlign: "justify", // ★ Texto justificado
        textAlignLast: "center", // ★ Última línea centrada
        hyphens: "auto", // ★ División silábica automática
        wordWrap: "break-word", // ★ Ajuste de palabras
        paddingHorizontal: 20, // ★ Margen lateral para mejor lectura
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    ...Platform.select({
      web: {
        width: "auto",
        paddingVertical: 20,
        paddingHorizontal: 32,
        marginTop: 20, // ★ Nuevo: Empuja el botón hacia abajo
        marginBottom: 24, // Mantén este valor para espacio inferior
      },
      default: {
        width: width * 0.8,
        marginBottom: 12,
      },
    }),
  },
  primaryButton: {
    backgroundColor: "#38B6FF",
    ...Platform.select({
      web: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, // Sombra más pronunciada en web
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      default: {
        elevation: 3, // Android
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  secondaryButton: {
    backgroundColor: "transparent",
    ...Platform.select({
      web: {
        width: "auto", // Mantener ancho automático o cambiar a:
        paddingVertical: 30, // ↑ Aumentado de 10 a 20 (100% más grande)
        paddingHorizontal: 42, // ↑ Aumentado de 24 a 32
        marginBottom: 62, // ↑ Aumentado de 26 a 32
      },
      default: {
        borderWidth: 1, // Default para móvil
        borderColor: "#BCE9FF", // Color original en móvil
      },
    }),
    borderRadius: 8, // Valor compartido
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontWeight: "700",
    letterSpacing: 1,
    ...Platform.select({
      web: {
        fontSize: 18,
        color: "white",
      },
      default: {
        fontSize: 16,
        color: "white",
      },
    }),
  },
  primaryButtonText: {
    color: "white",
  },
  secondaryButtonText: {
    ...Platform.select({
      web: {
        fontSize: 20,
        color: "#007AFF", // como el "Leer aviso de privacidad"
      },
      default: {
        fontSize: 12,
        color: "#007AFF",
      },
    }),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 600,
    maxHeight: "80%",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      },
      default: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#38B6FF",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
