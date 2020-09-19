import React from 'react';
import { StyleSheet } from 'react-native'
import { Layout, Button, Input, Submit, Text, Image } from "@ui-kitten/components";
import TabNavigator from '../../navigation/TabNavigator';

function Profile() {
  useEffect(() => {
    //Login, Email, phone, avatar
  }, []);
  return (
    <>
      <Text>Edit Profile</Text>
      <Image source=""></Image>
      <Button>Photo</Button>
      <Text>Login</Text>
      <Input value="#"></Input>
      <Text>Email Address</Text>
      <Input value="#"></Input>
      <Text>Phone</Text>
      <Input value="#"></Input>
      <TabNavigator />
    </>
  )
}

export default Profile;
