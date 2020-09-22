import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AuthForm from '../../components/Auth/AuthForm'
import PushNotifications from '../../components/TestDb/TestPushNotifications'
import Profile from '../../components/Profile/index'
import StartForm from '../../components/Auth/StartForm'
import AsyncStorage from '@react-native-community/async-storage';

const RootNavigator = () => {
  // const stateUser = useSelector(state => state.user)
  // console.log('rootNavigation',stateUser);
  const [userStore, setUserStore] = useState(null);
  const [error, setError] = useState(null);
  const auth = useSelector(state => state.user);

  useEffect(() => {
    load();
  }, [auth])

  const load = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        setUserStore(user)
      } else {
        setUserStore(null)
      }
    } catch (e) {
      const err = new Error(e)
      setError(err.message)
    }
  }
  // return <AuthForm />
  return true ? <TabNavigator /> : <StartForm />;
};

export default RootNavigator;
