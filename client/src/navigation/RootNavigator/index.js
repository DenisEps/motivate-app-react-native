import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AuthForm from '../../components/Auth/AuthForm'

const RootNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? <TabNavigator /> : <AuthForm />;
};

export default RootNavigator;
