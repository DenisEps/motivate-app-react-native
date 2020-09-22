import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from "react-native";

import TabNavigator from "../TabNavigator";
import AuthStackScreen from "../../screens/AuthStackScreen/index";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import AuthForm from '../../components/Auth/AuthForm'
import PushNotifications from '../../components/TestDb/TestPushNotifications'
import Profile from '../../components/Profile/index'
import StartForm from '../../components/Auth/StartForm'
import AsyncStorage from '@react-native-community/async-storage';
<<<<<<< HEAD
import { userAuth, deleteUser, setLoader } from "../../redux/actions";
import {firebase} from '../../../firebase'
=======
import { userAuth, deleteUser } from "../../redux/actions";
import { firebase } from '../../../firebase';
>>>>>>> 0d77ec8ce2141630f6a4e276c8c2ee283b2b3d87


const RootNavigator = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.user);
  console.log('>>>>AUTH', auth);

<<<<<<< HEAD

useEffect(() => {
  load();
  // if (auth === true) {
  //   console.log('dispatch TRUE');
  //   dispatch(setLoader(true))
  // } else {
  //   console.log('dispatch FALSE');
  //   dispatch(setLoader(false))
  // }
}, [])
=======
  useEffect(() => {
    load();
  }, [])
>>>>>>> 0d77ec8ce2141630f6a4e276c8c2ee283b2b3d87

  const load = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      console.log('>>>>>>>>>>>>>>>>>ASYNCSTORAGE', user);
      if (user !== null) {
        dispatch(userAuth(true));
      }
    } catch (error) {
      const err = new Error(error)
      setError(err.message);
    }
  }
  // return <AuthForm />
  return auth ? <Profile /> : <StartForm />;
};

export default RootNavigator;
