import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
//import QuestionsScreen from "./screens/QuestionsScreen/index";
import QuestionDisplay from "./screens/QuestionsScreen/questionPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Questions" component={QuestionDisplay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
