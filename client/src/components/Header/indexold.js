import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {

  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { firebase } from '../../../firebase';
import { deleteUser } from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { ROUTES } from '../../navigation/routes';

const defaultAvatar = require('../../assets/img/medved.jpg');

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const TopNavMain = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photo, setPhoto] = useState(''); // https:/// .... path to photo
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

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(async (snap) => {
        const user = await snap.data();
        setDisplayName(user.displayName);
        console.log(user);
        if(user.photoURL) {
          setPhoto(user.photoURL)
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

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

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={navigateToProfile}>
        {photo ? <Image style={styles.avatar} source={{uri: photo}}/> : <Image style={styles.avatar} source={defaultAvatar}/>}
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48/2,
    marginHorizontal: 16,
  }
});
