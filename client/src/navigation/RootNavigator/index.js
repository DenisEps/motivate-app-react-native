import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import TabNavigator from '../TabNavigator';
import AuthStackScreen from '../../screens/AuthStackScreen/index';

const RootNavigator = () => {
  const [user, setUser] = useState(true);

  return user ? <TabNavigator /> : <AuthStackScreen />;
};

export default RootNavigator;
