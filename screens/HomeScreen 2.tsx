import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Home Page</Text>

          <TouchableOpacity
            style={[
              styles.button,
              Platform.OS === "ios" ? styles.iosButton : styles.androidButton,
            ]}
            onPress={() => navigation.navigate("Questions", { test: false })}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20 }}>
            (Test data is available for testing purposes) Delete the button on
            final version
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              Platform.OS === "ios" ? styles.iosButton : styles.androidButton,
            ]}
            onPress={() => navigation.navigate("Questions", { test: true })}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start (test data)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    width: width * 0.85,
    maxWidth: 400,
    padding: 24,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    fontSize: width < 400 ? 22 : 24,
    marginBottom: 24,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  iosButton: {
    backgroundColor: "#007AFF",
  },
  androidButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HomeScreen;
