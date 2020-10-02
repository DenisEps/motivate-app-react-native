import React from 'react';
import { View, Text } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ROUTES } from '../routes';
import Home from '../../screens/Home';
import Habit from '../../screens/Habit';
import IconSelect from '../../components/IconSelect';
import EditHabit from '../../screens/Habit/EditHabit';
import AddHabit from '../../screens/Habit/AddHabit';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROUTES.home}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.habitDetails}
        component={Habit}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.editHabit}
        component={EditHabit}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.addHabit}
        component={AddHabit}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.iconSelect}
        component={IconSelect}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
