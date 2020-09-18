import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Layout, Text } from '@ui-kitten/components';

const AuthForm = () => {
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  function Submit() {}
  return (
    <Layout style={styles.container} level="1">
      <Input
        placeholder="Login"
        value={login}
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

styles = {};
export default AuthForm;
