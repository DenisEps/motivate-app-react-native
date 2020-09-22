import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import {
  Layout,
  Button,
  Input,
  Submit,
  Text,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import TabNavigator from "../../navigation/TabNavigator";
import { firebase } from "../../../firebase";

function Profile() {
  
  const user = firebase.auth().currentUser;
  const seeder = async () => {
    const data = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        habits: [
          {
            name: "meditation",
            type: "positive",
            date: {
              "09.1": 1,
              "09.2": 0,
              "09.3": 1,
              "09.4": 1,
              "09.5": 0,
              "09.6": 1,
              "09.7": 1,
              "09.8": 0,
              "09.9": 1,
              "09.10": 1,
              "09.11": 0,
              "09.12": 1,
              "09.13": 1,
              "09.14": 1,
              "09.15": 0,
              "09.16": 1,
              "09.17": 1,
              "09.18": 0,
              "09.19": 0,
              "09.20": 0,
              "09.21": 1,
              "09.22": 1,
              "09.23": 1,
              "09.24": 1,
              "09.25": 0,
              "09.26": 1,
              "09.27": 1,
              "09.28": 0,
              "09.29": 1,
              "09.30": 1,
            },
          },
          {
            name: "water",
            type: "positive",
            date: {
              "09.1": 0,
              "09.2": 0,
              "09.3": 1,
              "09.4": 1,
              "09.5": 0,
              "09.6": 1,
              "09.7": 0,
              "09.8": 0,
              "09.9": 1,
              "09.10": 1,
              "09.11": 0,
              "09.12": 1,
              "09.13": 1,
              "09.14": 1,
              "09.15": 0,
              "09.16": 1,
              "09.17": 1,
              "09.18": 0,
              "09.19": 0,
              "09.20": 0,
              "09.21": 1,
              "09.22": 1,
              "09.23": 1,
              "09.24": 0,
              "09.25": 0,
              "09.26": 1,
              "09.27": 1,
              "09.28": 0,
              "09.29": 0,
              "09.30": 1,
            },
          },
          {
            name: 'smoking',
            type: 'negative',
            date: {
              '09.1': 1,
              '09.2': 0,
              '09.3': 1,
              '09.4': 1,
              '09.5': 0,
              '09.6': 1,
              '09.7': 1,
              '09.8': 0,
              '09.9': 1,
              '09.10': 1,
              '09.11': 0,
              '09.12': 1,
              '09.13': 1,
              '09.14': 1,
              '09.15': 1,
              '09.16': 1,
              '09.17': 0,
              '09.18': 1,
              '09.19': 1,
              '09.20': 1,
              '09.21': 1,
              '09.22': 1,
              '09.23': 1,
              '09.24': 1,
              '09.25': 0,
              '09.26': 1,
              '09.27': 1,
              '09.28': 0,
              '09.29': 1,
              '09.30': 1,
            }
          },
          {
            name: 'fastfood',
            type: 'negative',
            date: {
              '09.1': 0,
              '09.2': 0,
              '09.3': 1,
              '09.4': 1,
              '09.5': 1,
              '09.6': 1,
              '09.7': 1,
              '09.8': 1,
              '09.9': 1,
              '09.10': 1,
              '09.11': 1,
              '09.12': 1,
              '09.13': 1,
              '09.14': 1,
              '09.15': 0,
              '09.16': 1,
              '09.17': 1,
              '09.18': 0,
              '09.19': 0,
              '09.20': 0,
              '09.21': 1,
              '09.22': 0,
              '09.23': 0,
              '09.24': 0,
              '09.25': 0,
              '09.26': 0,
              '09.27': 0,
              '09.28': 0,
              '09.29': 1,
              '09.30': 1,
            }
          }
        ],
      });
  };

  seeder()

  return (
    <Layout style={{ backgroundColor: "white", alignItems: "center" }}>
      <Text
        style={{
          width: "75%",
          textAlign: "center",
          marginBottom: 50,
          color: "black",
          fontSize: 64,
        }}
      >
        Edit Profile
      </Text>
      <Avatar
        style={{ width: 300, height: 300 }}
        size="giant"
        source={require("../../photo/avatar.jpeg")}
      ></Avatar>
      <Button
        style={{ width: 50, height: 50, top: -50, left: 100, borderRadius: 50 }}
      ></Button>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>
        Display Name
      </Text>
      <Input style={{ width: "75%", marginBottom: 10 }}></Input>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>
        Email
      </Text>
      <Input style={{ width: "75%", marginBottom: 10 }}></Input>
      <Text style={{ width: "75%", marginBottom: 5, color: "black" }}>
        Phone
      </Text>
      <Input style={{ width: "75%", marginBottom: 10 }}></Input>
      <Button style={{ width: "75%" }}>Save Changes</Button>
      <TabNavigator />
    </Layout>
  );
}

export default Profile;
