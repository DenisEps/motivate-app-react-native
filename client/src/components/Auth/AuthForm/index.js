import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import {firebase} from "../../../../firebase";


// const AuthForm = () => {
//   const [login, setLogin] = React.useState('');
//   const [pass, setPass] = React.useState('');
//   function Submit() {}
//   return (
//     <Layout style={styles.container} level="1">
//       <Input
//         placeholder="Login"
//         value={login}
//         onChangeText={(nextValue) => setLogin(nextValue)}
//       />
//       <Input
//         secureTextEntry={true}
//         placeholder="Password"
//         value={pass}
//         onChangeText={(nextValue) => setPass(nextValue)}
//       />
//       <Button onPress={Submit}>Register</Button>
//     </Layout>
//   );
// };

function AuthForm() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.firebase.auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber)
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

styles = {};
export default AuthForm;
