import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { StyleSheet } from "react-native";
import {
  Layout,
  Button,
  Input,
  Submit,
  Text,
  Image,
} from "@ui-kitten/components";
import TabNavigator from "../../navigation/TabNavigator";
import {firebase} from '../../../firebase';

export default function Profile() {

  return (
    <Layout>
      <Text>Edit Profile</Text>
      <Button>Photo</Button>
      <Text>Login</Text>
      <Input value="#"></Input>
      <Text>Email Address</Text>
      <Input value="#"></Input>
      <Text>Phone</Text>
      <Input value="#"></Input>
      <TabNavigator />
    </Layout>
  );
}

