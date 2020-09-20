import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AuthForm from '../../components/Auth/AuthForm'
import PushNotifications from '../../components/TestDb/TestPushNotifications'
import Profile from '../../components/Profile'

const RootNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? <TabNavigator /> : <Profile />;
};

export default RootNavigator;
