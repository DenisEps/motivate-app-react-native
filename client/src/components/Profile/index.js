import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions';
import {
  Layout,
  Button,
  Input,
  Submit,
  Text,
  Avatar,
  Modal,
  Card,
} from '@ui-kitten/components';
import { vectorIconsUtility } from '../../assets/icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { firebase } from '../../../firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { Asset } from 'expo-asset';
import AvatarDefault from '../../photo/startavatar.jpeg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../navigation/routes';

const defaultAvatar = require('../../assets/img/medved.jpg');

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(AvatarDefault);
  const [userAvatar, setUserAvatar] = useState('');
  const [err, setError] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      try {
        const dataFromStorage = JSON.parse(await AsyncStorage.getItem('user'))
          ? JSON.parse(await AsyncStorage.getItem('user'))
          : { data: 'hello' };
        setDisplayName(dataFromStorage.displayName);
        setEmail(dataFromStorage.email);
        setPhone(dataFromStorage.phoneNumber);
        if (dataFromStorage.data !== 'hello') {
          if (dataFromStorage.photoURL.slice(0, 4) !== 'http') {
            await FileSystem.writeAsStringAsync(
              FileSystem.documentDirectory + 'avatar.jpeg',
              dataFromStorage.photoURL,
              { encoding: FileSystem.EncodingType.Base64 }
            );
            setPhoto(FileSystem.documentDirectory + 'avatar.jpeg');
          } else {
            const imageFromGoogle = await Asset.fromModule(
              dataFromStorage.photoURL
            ).downloadAsync();

            setPhoto(imageFromGoogle.localUri);
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(async (snap) => {
        const user = await snap.data();
        if(user.photoURL) {
          setUserAvatar(user.photoURL)
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  async function photoPreparation(galPhotoUri) {
    try {
      const galPhotoUriFinish = galPhotoUri.uri;
      const varFunct = await FileSystem.getInfoAsync(galPhotoUriFinish);
      let smallPhoto = '';
      if (varFunct.size >= 1048486) {
        let compressMult = 800000 / varFunct.size;
        smallPhoto = await ImageManipulator.manipulateAsync(varFunct.uri, [], {
          compress: compressMult,
          format: 'jpeg',
        });
        smallPhoto = smallPhoto.uri;
      } else {
        smallPhoto = varFunct.uri;
      }
      setPhoto(smallPhoto);
      setVisible(false);
    } catch (err) {
      console.error(err);
    }
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
      ImagePicker.getCameraRollPermissionsAsync();
      // ImagePicker.requestCameraPermissionsAsync();
      const newPhoto = await ImagePicker.launchCameraAsync();
    } catch (err) {
      console.error(err);
    }
  }

  async function saveChanges() {
    try {
      let galPhoto = '';
      galPhoto = await FileSystem.readAsStringAsync(photo, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const currentUser = firebase.auth().currentUser;
      console.log(currentUser);
      await firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .update({
          displayName: displayName,
          phoneNumber: phone,
          photoURL: galPhoto,
        });
      navigation.navigate(ROUTES.home);
    } catch (e) {
      const error = new Error(e);
      setError(error.message);
      console.log(err);
    }
  }

  const remove = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      const err = new Error(e);
      setError(err.message);
    }
  };

  const logout = async () => {
    dispatch(deleteUser(false));
    remove();
    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    return user
      ? console.log('somthing went wrong')
      : console.log('logout is successfullllllll');
  };

  const passwordChange = async () => {
    const email = await firebase.auth().currentUser.email;
    const auth = await firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => console.log('email has been sended fro password'))
      .catch((err) => setError(err));
  };

  const derivedPhoto = typeof photo === 'string' ? { uri: photo } : photo;

  return (
    <Layout style={[styles.container, { paddingTop, flex: 1 }]}>
      <Layout style={styles.container}>
        <Layout style={styles.avatarContainer}>
          <Avatar
            style={styles.avatar}
            size="giant"
            source={derivedPhoto}
          />
          {/* {userAvatar ? <Image style={styles.avatar} source={{uri: userAvatar}}/> : <Image style={styles.avatar} source={defaultAvatar}/>} */}
          {vectorIconsUtility.edit({
            size: 40,
            color: '#A1A8CE',
            onPress: () => setVisible(true),
            style: styles.changeAvatarButton,
          })}
        </Layout>
        <Text style={styles.insideText}>Display Name</Text>
        <Input
          style={styles.inputElements}
          value={displayName}
          onChangeText={(nextValue) => setDisplayName(nextValue)}
        ></Input>
        <Text style={styles.insideText}>Phone</Text>
        <Input
          style={styles.inputElements}
          value={phone}
          onChangeText={(nextValue) => setPhone(nextValue)}
        ></Input>
        <Text style={styles.insideText}>Email</Text>
        <Input
          style={styles.inputElements}
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
        ></Input>
        <Button style={styles.inputElements} onPress={passwordChange}>
          Change password
        </Button>
        <Button style={styles.inputElements} onPress={saveChanges}>
          Save Changes
        </Button>
        <Button onPress={logout}>Logout</Button>
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card
          style={{ width: 300, backgroundColor: '#AE5036' }}
          disabled={true}
        >
          <Text style={styles.cardText}>Change Photo</Text>
          <Button onPress={startGallery} style={styles.inputElements}>
            Gallery
          </Button>
          <Button onPress={launchCamera} style={styles.inputElements}>
            Take Photo
          </Button>
          <Button
            onPress={() => setVisible(false)}
            style={styles.inputElements}
          >
            Close
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatarContainer: { alignItems: 'center', marginBottom: 50, marginTop: 50 },
  insidetext: {
    marginBottom: 5,
  },
  inputElements: {
    marginBottom: 10,
  },
  changeAvatarButton: {
    position: 'absolute',
    top: -10,
    right: 40,
  },
  avatar: {
    width: 170  ,
    height: 170,
    borderRadius: 170/2,
    borderWidth: 10,
    borderColor: '#F39B6D',
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Profile;
