import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import StartForm from '../../components/Auth/StartForm'
import Profile from "../../components/Profile";
const RootNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? <TabNavigator /> : <StartForm />;
};

export default RootNavigator;
