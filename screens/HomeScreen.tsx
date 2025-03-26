
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>
      <Button title="Start" onPress={() => navigation.navigate('Questions')} />
    </View>
  );
};

export default HomeScreen;
