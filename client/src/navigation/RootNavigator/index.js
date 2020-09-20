import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import StartForm from '../../components/Auth/StartForm'
const RootNavigator = () => {
  const [user, setUser] = useState(true);

  return user ? <TabNavigator /> : <StartForm />;
};

export default RootNavigator;
