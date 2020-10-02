import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from "@ui-kitten/components";
import { firebase } from "../../../firebase";
import { deleteUser } from "../../redux/actions";
import AsyncStorage from "@react-native-community/async-storage";
import { ROUTES } from "../../navigation/routes";
import AvatarDefault from '../../photo/startavatar.jpeg';
import * as FileSystem from "expo-file-system";

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const TopNavMain = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState(AvatarDefault);
  const dispatch = useDispatch();

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

  // useEffect(() => {
    
  //   return () => {
      
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot(async (snap) => {
          const user = await snap.data();
          setDisplayName(user.displayName);
          if (user.photoURL.slice(0, 4) !== 'http') {
            await FileSystem.writeAsStringAsync(
              FileSystem.documentDirectory + 'avatar.jpeg',
              user.photoURL,
              { encoding: FileSystem.EncodingType.Base64 }
            );
            setPhoto(FileSystem.documentDirectory + 'avatar.jpeg');
          } else {
            const imageFromGoogle = await Asset.fromModule(
              dataFromStorage.photoURL
            ).downloadAsync();
            setPhoto(imageFromGoogle.localUri);
          }
        });
      return () => {
        unsubscribe();
      };
    }, [])
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem
          onPress={() => logout()}
          accessoryLeft={LogoutIcon}
          title="Logout"
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const navigateToProfile = () => navigation.navigate(ROUTES.profile);
  const derivedPhoto = typeof photo === 'string' ? { uri: photo } : photo;

  const renderTitle = (props) => (
    
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={navigateToProfile}>
        <Avatar
          style={styles.logo}
          source={derivedPhoto}
        />
      </TouchableOpacity>
      <Text {...props}>Hi, {displayName}</Text>
    </View>
  );
  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
});
