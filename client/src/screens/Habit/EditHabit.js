import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from '@ui-kitten/components';
import { kittenIcons, vectorIcons } from '../../assets/icons';
import { ROUTES } from '../../navigation/routes';

const EditHabit = ({ navigation }) => {
  const [icon, setIcon] = useState('smoke')
  console.log(icon);
  const [titleInput, setTitleInput] = React.useState("Don't smoke");

  const handlePress = () => {
    navigation.navigate(ROUTES.iconSelect, { setIcon });
  }

  const CreateHabitAlert = () => {
    Alert.alert('Habit menu', 'What would you like to do?', [
      { text: 'Delete', onPress: () => console.log('Delete'), style: 'cancel' },
      {
        text: 'Cancel',
        onPress: () => console.log('Delete'),
        style: 'default',
      },
    ]);
  };

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={kittenIcons.MenuIcon}
        onPress={CreateHabitAlert}
      />
    </React.Fragment>
  );

  const back = () => {
    navigation.goBack();
  };

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={kittenIcons.BackIcon} />
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.navContainer} level="1">
        <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
      </Layout>
      <Layout style={styles.iconLayout}>
        <Layout style={styles.circle}>
          {vectorIcons[icon]({ size: 75, color: '#7983a4' })}



          {vectorIcons.menuHorizontal({
            size: 40,
            color: '#f39b6d',
            onPress: handlePress,
            style: styles.editIconIcon
          })}

        </Layout>
      </Layout>
      <Layout style={styles.titleInputDiv}>
        <Text category="s1">Habit title:</Text>
        <Input
          placeholder="Place your Text"
          value={titleInput}
          onChangeText={(nextValue) => setTitleInput(nextValue)}
          style={styles.titleInput}
        />
      </Layout>
      <Button style={styles.button} status="primary">
        SAVE
      </Button>
    </Layout >
  );
};

const styles = StyleSheet.create({
  container: {},
  iconLayout: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    marginTop: 20,
  },
  circle: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2538',
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    borderWidth: 10,
    borderColor: '#7b8cde',
  },
  editIconIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  titleInputDiv: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
  titleInput: {
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default EditHabit;
