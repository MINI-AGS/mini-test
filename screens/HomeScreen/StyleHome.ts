import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#BCE9FF",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Cambiado a "flex-start" para alinear arriba
    alignItems: "center",
    paddingTop: 30, // Espacio superior para bajar todo el contenido
    backgroundColor: "#BCE9FF",
    position: "relative", // Necesario para el círculo absoluto
  },
  unifiedContent: {
    width: width * 0.85,
    maxWidth: 400,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#BCE9FF",
    borderRadius: 12,
    position: "relative",
    zIndex: 2, // Asegura que esté sobre el círculo
    ...Platform.select({
      web: {
        marginTop: 120,
        marginLeft: 850, // Ajusta este valor para moverlo a la derecha en web
        alignSelf: "flex-start", // Lo sacamos del centrado automático
        maxWidth: 700, // Solo afecta en web
      },
      default: {
        top: 275, // Nueva propiedad añadida (igual que tu círculo)
        marginTop: 0, // Cambiado de 320 a 0 porque ahora usamos top        alignSelf: "center", // Centrado en móvil
        alignSelf: "center",
      },
    }),
    ...Platform.select({
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
    maxWidth: 800, // ← Añadido aquí específicamente para el title
    ...Platform.select({
      web: {
        fontSize: 80, // AUMENTADO
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
    maxWidth: 480, // ← Añadido aquí específicamente para el title

    ...Platform.select({
      web: {
        fontSize: 30,
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
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        width: "auto",
        paddingVertical: 20,
        paddingHorizontal: 32,
        marginTop: 20, // ★ Nuevo: Empuja el botón hacia abajo
        marginBottom: 24, // Mantén este valor para espacio inferior
      },
      default: {
        marginBottom: 12, // Espacio normal en móvil
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
  circle: {
    position: "absolute",
    width: 220,
    borderRadius: 110,
    backgroundColor: "#22B5FF", // Fondo azul mantenido
    ...Platform.select({
      web: {
        width: 550,
        height: 550,
        borderRadius: 275,
        left: 100,
        top: "20%",
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
        top: 60,
        alignSelf: "center",
      },
    }),
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
  homeImage: {
    position: "absolute",
    resizeMode: "contain",
    zIndex: 3,
    ...Platform.select({
      web: {
        width: 1120,
        height: 1120,
        top: 20, // Puedes ajustar este valor para colocarlo más arriba/abajo
        left: -170, // Ajusta en base a la posición del círculo en web
      },
      default: {
        width: 450,
        height: 450,
        top: -30,
        alignSelf: "center",
      },
    }),
  },
});
