import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Submit, Text } from "@ui-kitten/components";
import {firebase} from '../../../firebase';

export default function TestDb() {
  const [displayName, setDisplayName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const edit = async () => {
    const currentUser = await firebase.auth().currentUser

    // firebase.auth().updateCurrentUser().then(info => {
      
    // })
    // firebase.firestore().collection().
    // const test = firebase.firestore().collection().get().then(info => console.log(info.docs))
    // console.log(test);
    const create = await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        displayName: displayName,
        phoneNumber: phoneNumber, 
        photoURL: photoURL,
      })

      // get data
      const info = await firebase.firestore().collection('users').doc(currentUser.uid).get().then()
      // console.log(info);
  };

  return (
    <Layout>
      <Input
        onChangeText={(value) => setDisplayName(value)}
        value={displayName}
        placeholder="displayName"
        placeholderTextColor="yellow"
      />
      <Input
        onChangeText={(value) => setPhoneNumber(value)}
        value={phoneNumber}
        placeholder="phoneNumber"
        placeholderTextColor="yellow"
      />
      <Input
        onChangeText={(value) => setPhotoURL(value)}
        value={photoURL}
        placeholder="photoURL"
        placeholderTextColor="yellow"
      />
      <Button onPress={edit}>Edit</Button>
    </Layout>
  );
}
