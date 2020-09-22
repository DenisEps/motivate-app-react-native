import React, { useState, useEffect } from 'react';
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
} from '@ui-kitten/components';
import { firebase } from '../../../firebase';
import { deleteUser } from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { ROUTES } from '../../navigation/routes';

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const TopNavMain = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [displayName, setDisplayName] = useState('anonymous');
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
    dispatch(deleteUser());
    remove();
    await firebase.auth().signOut();
    const user = firebase.auth().currentUser;
    return user
      ? console.log('somthing went wrong')
      : console.log('logout is successfullllllll');
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('focused ✅');
      return () => {
        console.log('unfocused ❌');
      };
    }, [])
  );

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snap) => {
        const user = snap.data();
        setDisplayName(user.displayName);
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
        <Avatar
          style={styles.logo}
          source={{
            uri:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=100',
          }}
        />
      </TouchableOpacity>
      <Text {...props}>Hi {displayName}</Text>
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
