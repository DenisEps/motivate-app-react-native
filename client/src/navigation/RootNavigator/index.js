import React, { useState } from 'react';

import TabNavigator from '../TabNavigator';
import AuthStackScreen from '../../screens/AuthStackScreen/index';

const RootNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? <TabNavigator /> : <AuthStackScreen />;
};

export default RootNavigator;
