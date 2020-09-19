import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
// import auth from '@react-native-firebase/auth';
import { firebase } from "../../../../firebase";
import "@firebase/firestore";
import "@firebase/auth";


const AuthForm = () => {
  const [email, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  async function Submit() {
    let q = await firebase.auth().signInWithEmailAndPassword(email, pass);
    // .signInWithEmailAndPassword(email, pass)
    // .then(
    //   this.onLoginSuccess.bind(this),

    //   )
    //   .catch(error => {
    //     let errorCode = error.code;
    //     let errorMessage = error.message;
    //     if (errorCode == 'auth / weak-password') {
    //       this.onLoginFailure.bind(this)('Weak Password!');
    //     } else {
    //       this.onLoginFailure.bind(this)(errorMessage);
    //     }
    //   });
    console.log('>>>>>>>>>>>>', q)
  }

  useEffect(() => {

  })
  return (
    <Layout style={styles.container} level="1">
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(nextValue) => setLogin(nextValue)}
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        value={pass}
        onChangeText={(nextValue) => setPass(nextValue)}
      />
      <Button onPress={Submit}>Register</Button>

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
