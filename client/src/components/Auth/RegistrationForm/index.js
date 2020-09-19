import React from 'react';

function RegistrationForm() {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  return (
    <>
      <Layout style={styles.container} level="1">
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
        <Button onPress={Submit}>Register</Button>
      </Layout>
    </>
  )
}

export default RegistrationForm;
