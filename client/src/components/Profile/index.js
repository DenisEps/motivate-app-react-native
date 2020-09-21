import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native'
import { Layout, Button, Input, Submit, Text, Avatar, Icon } from "@ui-kitten/components";
import TabNavigator from '../../navigation/TabNavigator';
import {firebase} from '../../../firebase'



 function Profile() {

  const user =  firebase.auth().currentUser

  return (
    <Layout style={{ backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ width: "75%", textAlign: "center", marginBottom: 50, color: "black", fontSize: 64 }}>Edit Profile</Text>
      <Avatar style={{ width: 300, height: 300 }} size="giant" source={require('../../photo/avatar.jpeg')}></Avatar>
      <Button style={{ width: 50, height: 50, top: -50, left: 100, borderRadius: 50 }}>

      </Button>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>Display Name</Text>
      <Input style={{ width: "75%", marginBottom: 10 }} ></Input>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>Email</Text>
      <Input style={{ width: "75%", marginBottom: 10 }} ></Input>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>Phone</Text>
      <Input style={{ width: "75%", marginBottom: 10 }}  ></Input>
      <Button style={{ width: "75%" }}>Save Changes</Button>
      <TabNavigator />
    </Layout>
  )
}

export default Profile
