import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import example from "./backend/example.ts";

export default function App() {
  useEffect(() => {
    example();
  }, []);

  return (
    <View style={styles.container}>
      <Text>CTM Beto</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
