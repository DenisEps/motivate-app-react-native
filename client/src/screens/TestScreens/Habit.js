import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Habit({ route }) {

  // const { id, title } = route.params
  const title = 'hui tebe'


  return (
    <View>
      <Text>
        {title ? title : 'hui'}
      </Text>
    </View>
  )
}

export default Habit