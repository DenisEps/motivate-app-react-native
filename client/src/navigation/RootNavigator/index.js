import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";

const RootNavigator = () => {
  const [user, setUser] = useState(false);

  return user ? <TabNavigator /> : <RegistrationForm />;
};

export default RootNavigator;
