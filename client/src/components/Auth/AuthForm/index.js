import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import TestDb from '../../TestDb/TestDb'
import { firebase } from "../../../../firebase";
import "@firebase/firestore";
import "@firebase/auth";


const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setError] = useState(null);
  const [test, setTest] = useState(false);

  const Login = async () => {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, pass)
      const currentUser = await firebase.auth().currentUser
      setEmail('')
      setPass('')
      setTest(true)
      console.log('currentUser>>>>>>>>>>',currentUser);
    } catch (err) {
      const error = new Error(err)
      setError(error.message)
    } 


  }

  // useEffect(() => {

  // })
  return (
    <Layout style={styles.container, { position: "absolute", top: 250, left: 120, minWidth: 200 }} level="1" >
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
      <Button onPress={Login}>Register</Button>
      {test ? <TestDb /> : null}
    </Layout>
  );
};

// function AuthForm() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = firebase.firebase.auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }

styles = {};
export default AuthForm;
