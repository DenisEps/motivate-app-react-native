import React from 'react';
import { View, Text } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ROUTES } from '../routes';
import TestHome from '../../screens/TestScreens/testhome';
import Habit from '../../screens/Habit';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROUTES.home}
        component={TestHome}
        options={{
          headerShown: false,
        }}
      />
      {/* ROUTES.createNewHabit */}
      <HomeStack.Screen
        name={ROUTES.habitDetails}
        component={Habit}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
