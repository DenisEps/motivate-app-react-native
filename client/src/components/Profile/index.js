import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Layout, Button, Input, Submit, Text, Avatar, Icon, Modal, Card } from "@ui-kitten/components";
import TabNavigator from '../../navigation/TabNavigator';
import { View } from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {firebase} from '../../../firebase';

function Profile() {
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState({ uri: '' });


  async function startGallery() {
    try {
      const uid = firebase.auth().currentUser.uid
      const galPhotoUri = await ImagePicker.launchImageLibraryAsync();
      const galPhotoUriFinish = galPhotoUri.uri;
      const varFunct = await FileSystem.getInfoAsync(galPhotoUriFinish);
      const galPhoto = await FileSystem.readAsStringAsync(varFunct.uri, { encoding: FileSystem.EncodingType.Base64, length: varFunct.size, position: 0 });
      const user = await firebase.firestore().collection('users').doc(uid).set({
        photoURL : galPhoto,
      })
      console.log(user);
      // setPhoto(galPhotoUri);
    } catch (err) {
      console.error(err);
    }
  }

  function launchCamera() {
    ImagePicker.requestCameraPermissionsAsync();
    ImagePicker.launchCameraAsync();
  }

  return (
    <View>
      <Layout style={styles.container}>
        <Layout style={styles.containerInn}>
          <Text style={{ textAlign: "center", marginBottom: 50, color: "black", fontSize: 50 }}>Edit Profile</Text>
          <Avatar style={{ width: 300, height: 300 }} size="giant" source={photo}></Avatar>
          <Button style={{ width: 50, height: 50, top: -50, left: 250, borderRadius: 50 }} onPress={() => setVisible(true)}>
          </Button>
          <Text style={{ marginBottom: 5, color: "black" }}>Display Name</Text>
          <Input style={{ marginBottom: 10 }} ></Input>
          <Text style={{ marginBottom: 5, color: "black" }}>Email</Text>
          <Input style={{ marginBottom: 10 }} ></Input>
          <Text style={{ marginBottom: 5, color: "black" }}>Phone</Text>
          <Input style={{ marginBottom: 10 }}  ></Input>
          <Button >Save Changes</Button>
        </Layout>
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>Change Photo</Text>

          <Button onPress={startGallery}>
            Gallery
          </Button>
          <Button onPress={launchCamera}>
            Take Photo
          </Button>
          <Button onPress={() => setVisible(false)}>
            Close
          </Button>
        </Card>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  containerInn: {
    backgroundColor: "white",
    width: "75%",
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Profile;
