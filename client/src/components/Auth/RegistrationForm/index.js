import React from 'react';
import { Input, Button, Layout, Text } from "@ui-kitten/components";

function RegistrationForm() {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  function submit() {

  }
  return (
    <>
      <Layout style={styles.container, { position: "absolute", top: 250, left: 120, minWidth: 200 }} level="1">
      <Input
        placeholder="Login"
        value={login}
        onChangeText={(nextValue) => setLogin(nextValue)}
      />
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
      <Button onPress={submit}>Register</Button>
    </Layout>
    </>
  )
}

export default RegistrationForm;
