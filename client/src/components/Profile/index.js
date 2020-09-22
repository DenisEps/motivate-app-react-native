import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions'
import { Layout, Button, Input, Submit, Text, Avatar, Icon, Modal, Card } from "@ui-kitten/components";
import TabNavigator from '../../navigation/TabNavigator';
import { View } from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { firebase } from '../../../firebase';
import AsyncStorage from '@react-native-community/async-storage';

function Profile() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(require('../../photo/startavatar.jpeg'));
  const [err, setError] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const dataFromStorage = JSON.parse(await AsyncStorage.getItem('user'));
      setDisplayName(dataFromStorage.displayName);
      setEmail(dataFromStorage.email);
      setPhone(dataFromStorage.phone);
      const photoFromStorage = await FileSystem.writeAsStringAsync(require('../../photo/avatar.jpeg'), dataFromStorage.photoURL, { encoding: FileSystem.EncodingType.Base64 });
    })();
  }, []);

  async function photoPreparation(galPhotoUri) {
    const galPhotoUriFinish = galPhotoUri.uri;
    const varFunct = await FileSystem.getInfoAsync(galPhotoUriFinish);
    let smallPhoto;
    if (varFunct.size >= 1048486) {
      let compressMult = 800000 / varFunct.size;
      smallPhoto = await ImageManipulator.manipulateAsync(
        varFunct.uri,
        [],
        { compress: compressMult, format: 'jpeg' }
      );
    } else {
      smallPhoto = varFunct;
    }
    setPhoto({ uri: smallPhoto.uri });
    setVisible(false);

  }

  async function startGallery() {
    try {
      const galPhotoUri = await ImagePicker.launchImageLibraryAsync();
      photoPreparation(galPhotoUri);
    } catch (err) {
      console.error(err);
    }
  }

  async function launchCamera() {
    try {
      const newPhoto = await ImagePicker.launchCameraAsync();
      photoPreparation(newPhoto);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveChanges() {
    try {
    galPhoto = '';
    const galPhoto = await FileSystem.readAsStringAsync(photo, { encoding: FileSystem.EncodingType.Base64 });
    const currentUser = firebase.auth();
    console.log(firebase.auth().currentUser);
    await firebase.firestore().collection('users').doc(currentUser.uid).update({
      displayName,
      phoneNumber: phone,
      photoURL: galPhoto,
    });
    // if (currentUser.email !== email) {
    //   await firebase.firestore().collection('users').doc(currentUser.uid).update({

    //   });
    // }
  } catch(error) {
    setError(error.message);
  }
  }


  const remove = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      const err = new Error(e);
      setError(err.message);
    }
  }

  const logout = async () => {
    dispatch(deleteUser())
    remove()
    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    return user ? console.log('somthing went wrong') : console.log('logout is successfullllllll');
  }

  return (
    <View>
      <Layout style={styles.container}>
        <Layout style={styles.containerInn}>
          <Text style={{ textAlign: "center", marginBottom: 25, color: "black", fontSize: 40 }}>Edit Profile</Text>
          <Avatar style={{ width: 300, height: 300 }} size="giant" source={photo}></Avatar>
          <Button style={{ width: 50, height: 50, top: -50, left: 250, borderRadius: 50 }} onPress={() => setVisible(true)}>
          </Button>
          <Text style={{ marginBottom: 5, color: "black" }}>Display Name</Text>
          <Input style={{ marginBottom: 10 }} value={displayName} onChangeText={nextValue => setDisplayName(nextValue)}></Input>
          <Text style={{ marginBottom: 5, color: "black" }}>Phone</Text>
          <Input style={{ marginBottom: 10 }} value={phone} onChangeText={nextValue => setPhoto(nextValue)}></Input>
          <Text style={{ marginBottom: 5, color: "black" }}>Email</Text>
          <Input style={{ marginBottom: 10 }} value={email} onChangeText={nextValue => setEmail(nextValue)} ></Input>
          <Text style={{ marginBottom: 5, color: "black" }}>Password</Text>
          <Input style={{ marginBottom: 10 }} value={password} onChangeText={nextValue => setPassword(nextValue)} ></Input>
          <Button style={{ marginBottom: 10 }} onPress={saveChanges}>Save Changes</Button>
          <Button onPress={logout} >Logout</Button>
        </Layout>
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{ width: "75%" }}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} >
          <Text style={{ textAlign: "center", marginBottom: 10 }}>Change Photo</Text>
          <Button onPress={startGallery} style={{ marginBottom: 10 }}>
            Gallery
          </Button>
          <Button onPress={launchCamera} style={{ marginBottom: 10 }}>
            Take Photo
          </Button>
          <Button onPress={() => setVisible(false)} style={{ marginBottom: 10 }}>
            Close
          </Button>
        </Card>
      </Modal>
    </View >
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
