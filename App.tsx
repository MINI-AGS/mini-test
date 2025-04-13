import "./globals.css";
import React /*, { useEffect }*/ from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import QuestionDisplay from "./screens/QuestionsScreen/questionPage";
import Results from "./screens/ResultsScreen";
//import dataTest from "./backend/dataTest";

const Stack = createStackNavigator();

export default function App() {
  //useEffect(() => {
  //  console.log("App: useEffect");
  //  dataTest();
  //}, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Questions" component={QuestionDisplay} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
