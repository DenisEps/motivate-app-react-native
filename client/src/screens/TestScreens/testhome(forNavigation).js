import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import Habit from './Habit';
const Stack = createStackNavigator();

function Testhome() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Habit" component={Habit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Testhome;