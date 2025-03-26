
import React from 'react';
import { View, Text, Button } from 'react-native';

const QuestionsScreen = ({ navigation }: { navigation: any }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Questions Page</Text>
    <Button title="Finish" onPress={() => navigation.navigate('End')} />
  </View>
);

export default QuestionsScreen;
