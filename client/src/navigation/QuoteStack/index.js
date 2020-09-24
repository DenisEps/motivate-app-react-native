import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ROUTES } from '../routes';
import QuoteMain from '../../screens/Quote';

const QuoteStack = createStackNavigator();

const QuoteStackScreen = () => {
  return (
    <QuoteStack.Navigator>
      <QuoteStack.Screen
        name={ROUTES.quote}
        component={QuoteMain}
        options={{ headerShown: false }}
      />
    </QuoteStack.Navigator >
  );
};

export { QuoteStackScreen };
