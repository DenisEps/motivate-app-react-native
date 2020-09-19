import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const EditIcon = (props) => <Icon {...props} name="edit" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const CreateHabitAlert = () => {
  Alert.alert('Habit menu', 'What would you like to do?', [
    { text: 'Delete', onPress: () => console.log('Delete'), style: 'cancel' },
    { text: 'Cancel', onPress: () => console.log('Delete'), style: 'default' },
  ]);
};

const Habit = () => {
  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <TopNavigationAction icon={MenuIcon} onPress={CreateHabitAlert} />
    </React.Fragment>
  );

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Layout style={styles.iconLayout}>
        <Layout style={styles.circle}>
          <MaterialIcons name="smoke-free" size={100} color="#7983a4" />
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  iconLayout: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    marginTop: 25,
    marginBottom: 25,
  },
  circle: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2538',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 10,
    borderColor: '#7b8cde',
  },
});

export default Habit;
