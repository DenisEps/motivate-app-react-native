import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { firebase } from '../../../firebase';
import {
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Radio,
  RadioGroup
} from '@ui-kitten/components';
import {
  kittenIcons,
  vectorIcons,
  vectorIconsUtility,
} from '../../assets/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../navigation/routes';
import {details} from '../../audioFunctions'

const EditHabit = ({ navigation, route }) => {
  const { id, title} = route.params;
const typeFromHabit = route.params.type;
  const iconFromHabitPage = route.params.icon;
  const [icon, setIcon] = useState(iconFromHabitPage);
  const [titleInput, setTitleInput] = React.useState(title);
  const [type, setType] = useState(typeFromHabit)

console.log(typeFromHabit);
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  const handlePress = () => {
    navigation.navigate(ROUTES.iconSelect, { setIcon });
  };

  const handleSave = async () => {
    const uid = firebase.auth().currentUser.uid;
    try {
      const habit = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .doc(id)
        .update({ title: titleInput, icon, type });
      navigation.navigate(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  // const CreateHabitAlert = () => {
  //   Alert.alert('Habit menu', 'What would you like to do?', [
  //     { text: 'Delete', onPress: () => console.log('Delete'), style: 'cancel' },
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Delete'),
  //       style: 'default',
  //     },а
  //   ]);
  // };

  // const renderRightActions = () => (
  //   <React.Fragment>
  //     <TopNavigationAction
  //       icon={kittenIcons.MenuIcon}
  //       onPress={CreateHabitAlert}
  //     />
  //   </React.Fragment>
  // );

  const back = () => {
    navigation.goBack();
  };

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={kittenIcons.BackIcon} />
  );

  return (
    <Layout style={[styles.container, { paddingTop }]}>
      <Layout style={styles.navContainer} level="1">
        <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          // accessoryRight={renderRightActions}
        />
      </Layout>
      <Layout style={styles.iconLayout}>
        <Layout style={styles.circle}>
          {vectorIcons[icon]({ size: 75, color: '#7983a4' })}

          {vectorIconsUtility.edit({
            size: 40,
            color: '#A1A8CE',
            onPress: handlePress,
            style: styles.editIconIcon,
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
        <RadioGroup 
        onChange={index => setType(index)}
          selectedIndex={type}
        style={{justifyContent: "space-around", flexDirection: 'row', marginTop: 10,}}
        >
          <Radio status="danger">
            Negative
          </Radio>

          <Radio  status="success" >
            Positive
          </Radio>
        </RadioGroup>
        <Button onPress={handleSave} style={styles.button} status="primary">
          <Text category="h6">SAVE</Text>
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  iconLayout: {
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
    top: -15,
    right: -50,
  },
  titleInputDiv: {
    paddingHorizontal: 10,
    marginTop: 40,
  },
  titleInput: {
    marginTop: 5,
  },
  button: {
    marginTop: 20,
  },
});

export default EditHabit;
