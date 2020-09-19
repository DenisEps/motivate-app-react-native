import React from 'react';

function StartForm() {
  return (
    <>
      <Layout style={styles.container} level="1">
        <Button onPress={Submit}>Register</Button>
        <ButtonGroup>
          <Button onPress={}>Log in</Button>
          <Button onPress={}>Registration</Button>
        </ButtonGroup>
      </Layout>
    </>
  )
}

export default StartForm;
