import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import TestDb from "../../TestDb/TestDb";
import { firebase } from "../../../../firebase";
import "@firebase/firestore";
import "@firebase/auth";
import * as Google from "expo-google-app-auth";

const provider = new firebase.auth.GoogleAuthProvider();

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setError] = useState(null);
  const [test, setTest] = useState(false);

  const Login = async () => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass);
      const currentUser = await firebase.auth().currentUser;
      setEmail("");
      setPass("");
      setTest(true);
      console.log("currentUser>>>>>>>>>>", currentUser);
    } catch (err) {
      const error = new Error(err);
      setError(error.message);
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    return user ? console.log(user) : console.log("signOut");
  };

  const onSignIn = (googleUser) => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        if (!isUserEqual(googleUser, firebaseUser)) {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(async function (user) {
              const userAuth = user.user
              console.log("UUUUUSSSEEERRRR", userAuth);
              await firebase
              .firestore()
              .collection('users')
              .doc(user.user.uid)
              .set({
                email: userAuth.email,
                displayName: userAuth.displayName,
                phoneNumber: userAuth?.phoneNumber,
                photoURL: userAuth.photoURL,
                emailVerified: userAuth.emailVerified,
              })
            })
            .catch(function (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = error.credential;
              console.log(errorCode);
              console.log(errorMessage);
              console.log(email);
              console.log(credential);
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

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
      console.log(">>>>>>>>>", firebase.auth().currentUser);
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "531972357750-se0jv52p37gs986lcv4j8sma2crlom3i.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("error", e);
      return { error: true };
    }
  }

  return (
    <Layout style={styles.container} level="1">
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={pass}
        onChangeText={(nextValue) => setPass(nextValue)}
      />
      <Button onPress={Login}>Sugn Up</Button>
      <Button onPress={() => signInWithGoogleAsync()}>
        Sign Up With Google
      </Button>
      <Button onPress={logout}>Logout</Button>
      {test ? <TestDb /> : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthForm;
