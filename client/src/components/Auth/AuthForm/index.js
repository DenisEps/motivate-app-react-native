import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Layout, Text, Icon } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth, deleteUser, setLoader } from '../../../redux/actions';
import TestDb from '../../TestDb/TestDb';
import { firebase } from '../../../../firebase';
import '@firebase/firestore';
import '@firebase/auth';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const provider = new firebase.auth.GoogleAuthProvider();

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setError] = useState(null);
  // const [userStore, setUserStore] = useState(null);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);

  const save = async (user) => {
    try {
      const objectValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', objectValue);
      dispatch(setLoader(true));
    } catch (e) {
      const error = new Error(e);
      setError(error.message);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      const error = new Error(e);
      setError(error.message);
    } finally {
      // setUserStore('');
    }
  };

  const Login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      const uid = await firebase.auth().currentUser.uid;
      await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((info) => {
          save(info.data());
        });
      setEmail('');
      setPass('');
      setTest(true);
      dispatch(userAuth(true));
    } catch (err) {
      const error = new Error(err);
      setError(error.message);
    }
  };

  const logout = async () => {
    dispatch(deleteUser(false));
    remove();
    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    return user ? console.log('logout', user) : console.log('signOut');
  };

  const onSignIn = (googleUser) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase
        .auth()
        // TODO: переделать ?
        .onAuthStateChanged(function (firebaseUser) {
          unsubscribe();
          if (!isUserEqual(googleUser, firebaseUser)) {
            // start here ⚠️
            const credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(async function (user) {
                if (user.additionalUserInfo.isNewUser) {
                  const photo = firebase.auth().currentUser.photoURL;
                  const userAuth = user.user;
                  await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .set({
                      email: userAuth.email == null ? '' : userAuth.email,
                      displayName:
                        userAuth.displayName == null
                          ? 'Anonymous'
                          : userAuth.displayName,
                      phoneNumber:
                        userAuth.phoneNumber == null
                          ? ''
                          : userAuth.phoneNumber,
                      photoURL: userAuth.photoURL == null ? '' : photo,
                      emailVerified:
                        userAuth.emailVerified == null
                          ? ''
                          : userAuth.emailVerified,
                    });

                  // await firebase
                  //   .firestore()
                  //   .collection("users")
                  //   .doc(user.user.uid)
                  //   .collection("habits")
                  //   .add({
                  //     type: "",
                  //     icon: "",
                  //     title: "",
                  //     dates: {},
                  //   });

                  await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .get()
                    .then((info) => {
                      resolve(save(info.data()));
                    });
                } else {
                  const userAuth = user.user;
                  console.log(userAuth.photoURL);
                  const photo = firebase.auth().currentUser.photoURL;
                  await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .update({
                      email: userAuth.email == null ? '' : userAuth.email,
                      displayName:
                        userAuth.displayName == null
                          ? 'Anonymous'
                          : userAuth.displayName,
                      phoneNumber:
                        userAuth.phoneNumber == null
                          ? ''
                          : userAuth.phoneNumber,
                      photoURL: userAuth.photoURL == null ? '' : photo,
                      emailVerified:
                        userAuth.emailVerified == null
                          ? ''
                          : userAuth.emailVerified,
                    });

                  // await firebase
                  // .firestore()
                  // .collection('users')
                  // .doc(user.user.uid)
                  // .collection('habits')
                  // .doc()

                  await firebase
                    .firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .get()
                    .then((info) => {
                      resolve(save(info.data()));
                    });
                }
              })
              .catch(function (error) {
                const errorCode = error.code;
                errorCode ? setError(errorCode) : null;
                const errorMessage = error.message;
                errorCode ? setError(errorMessage) : null;
                const email = error.email;
                errorCode ? setError(email) : null;
                const credential = error.credential;
                errorCode ? setError(credential) : null;
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
                reject(error);
              });
          } else {
            const err = new Error('User already signed-in Firebase.');
            setError(err.message);
            console.log(err);
            reject(err);
          }
        });
    });
  };
  //  DONT DELETE //
  // console firebase id client old 331031432009-jd9240r775sse5hcm436i3l47r8pkeq7.apps.googleusercontent.com

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId:
          '531972357750-se0jv52p37gs986lcv4j8sma2crlom3i.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        setError(null);
        await onSignIn(result);
        // setUserStore(result.user);
        // save(result.user)
        return result.accessToken;
      } else {
        return setError('Something went wrong');
      }
    } catch (e) {
      const error = new Error(e);
      return setError(error.message);
    }
  }

  const GoogleIcon = (props) => (
    <Icon {...props} fill="#E3B23C" size="28" name="google" />
  );

  return (
        <Layout style={styles.container} level="1">
          <Input
            style={styles.inputs}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Input
            style={styles.inputs}
            secureTextEntry={true}
            placeholder="Password"
            value={pass}
            onChangeText={(nextValue) => setPass(nextValue)}
          />
          <Button style={styles.inputs} onPress={Login}>
            <Text category="h6">Sign In </Text>
          </Button>
          <Layout style={styles.inputsGoogle}>
            <Button
              style={styles.button}
              accessoryLeft={GoogleIcon}
              onPress={signInWithGoogleAsync}
              category="h2"
            >
              <Text category="h6">Sign In With Google</Text>
            </Button>
          </Layout>
          {err ? <Text style={styles.error}>{err}</Text> : null}
        </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: 250,
  },
  inputs: {
    width: '75%',
    marginBottom: 5,
  },
  inputsGoogle: {
    width: '75%',
    marginBottom: 5,
    fontSize: 26,
  },
  button: {
    margin: 1,
  },
  error: {
    width: '75%',
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#FEA82F',
    borderRadius: 6,
    color: '#FEA82F',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthForm;
