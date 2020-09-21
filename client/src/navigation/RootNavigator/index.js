import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AuthForm from '../../components/Auth/AuthForm'
import PushNotifications from '../../components/TestDb/TestPushNotifications'
import Profile from '../../components/Profile/index'
import StartForm from '../../components/Auth/StartForm'
import AsyncStorage from '@react-native-community/async-storage';
import { userAuth, deleteUser } from "../../redux/actions";


const RootNavigator = () => {
// const stateUser = useSelector(state => state.user)
// console.log('rootNavigation',stateUser);
const [userStore, setUserStore] = useState(false);
const [error, setError] = useState(null);
const dispatch = useDispatch();
const auth = useSelector(state => state.user);
console.log('>>>>AUTH', auth);

// console.log('>>>>>>>>>>>>>> USER STORE', userStore)

useEffect(() => {
  load();
  console.log('>>>>>>>>user in the state!!j!!!!!!!!!!!!!',userStore);
}, [])

const load = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    console.log('>>>>>>>>>>>>>>>>>ASYNCSTORAGE',user);
    if (user !== null) {
      dispatch(userAuth(true));
    }
  } catch (e) {
    const err = new Error(e)
    setError(err.message)
  }
}
  // return <AuthForm />
  return auth ? <TabNavigator /> : <StartForm />;
};

export default RootNavigator;
