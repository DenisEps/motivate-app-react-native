import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Button, Input, Submit, Text } from "@ui-kitten/components";
import { firebase } from "../../../../firebase";

const RegistrationForm = () => {
  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [authUser, setAuthUser] = React.useState(null);
  const [emailMessage, setEmailMessage] = React.useState(null);

  // const provider = new firebase.auth.GoogleAuthProvider()

  const CreateUser = async (email, pass) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((info) => {
          return firebase
            .firestore()
            .collection("users")
            .doc(info.user.uid)
            .set({
              test: "test",
            });
        });
      const currnetUser = firebase.auth().currentUser;

      currnetUser
        .sendEmailVerification()
        .then(() => {
          setEmailMessage("Подтвердите Ваш email на почте");
        })
        .catch((err) => {
          const error = new Error(err);
          setError(error.message);
        });
      // firebase.database().ref('/' + user.user.uid).set({
      //   email: user.user.email,
      //   emailVerified: user.user.emailVerified,
      // })
      setAuthUser(user.user);
      setError(null);
      setEmail("");
      setPass("");
      setEmailMessage("");
    } catch (err) {
      const error = new Error(err);
      setError(error.message);
    }
  };

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
      <Button onPress={() => CreateUser(email, pass)}>Register</Button>
      {/* message of error */}
      {error && <Text style={styles.error}>{error}</Text>}
      {emailMessage && <Text style={styles.message}>{emailMessage}</Text>}
    </Layout>
  );
};

const styles = StyleSheet.create({
  error: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 6,
    color: "red",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  message: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 6,
    color: "green",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
});

export default RegistrationForm;
