import "./globals.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import QuestionDisplay from "./screens/QuestionsScreen/questionPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Questions" component={QuestionDisplay} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* 👇 Este Toast debe ir aquí para que los popups funcionen en cualquier pantalla */}
      <Toast />
    </>
  );
}
