import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ROUTES } from '../routes';
import StatsMain from '../../screens/Stats';

const StatsStack = createStackNavigator();

const StatsStackScreen = () => {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen
        name={ROUTES.stats}
        component={StatsMain}
        options={{ headerShown: false }}
      />
    </StatsStack.Navigator>
  );
};

export {StatsStackScreen}
