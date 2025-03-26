
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import example from "./backend/example.ts";
import AppNavigator from './navigator/AppNavigator';

export default function App() {
  useEffect(() => {
    example();
  }, []);
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
