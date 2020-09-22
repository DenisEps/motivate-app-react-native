import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

export const TopNavMain = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const [displayName, setDisplayName] = useState('anonymous');

  useEffect(() => {
    (async function () {
     const user =  await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(info => info.data())
     setDisplayName(user.displayName)
    })();
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
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={{
          uri:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=100',
        }}
      />
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
