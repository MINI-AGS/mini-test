import "./globals.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import QuestionDisplay from "./screens/QuestionsScreen/questionPage";
import EndScreen from "./screens/EndScreen/EndScreen";
import { RootStackParamList } from "./screens/navigation";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name="Questions"
            component={QuestionDisplay}
            options={{ title: "Cuestionario" }}
          />
          <Stack.Screen
            name="EndScreen"
            component={EndScreen}
            options={{ title: "Resultados" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
