import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import dataTest from "./backend/dataTest";

export default function App() {
  useEffect(() => {
    console.log("App: useEffect");
    dataTest();
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
