import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import {
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import {
  kittenIcons,
  vectorIcons,
  vectorIconsUtility,
} from "../../assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ROUTES } from "../../navigation/routes";
import {firebase} from '../../../firebase'

const AddHabit = ({ navigation }) => {
  const [icon, setIcon] = useState("unknown");
  const [titleInput, setTitleInput] = React.useState("Unknown");

  const [type, setType] = useState(0)

  //radio
  // const successRadioState = useRadioState();
  // const dangerRadioState = useRadioState();

  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  const handlePress = () => {
    navigation.navigate(ROUTES.iconSelect, { setIcon });
  };

  const back = () => {
    navigation.goBack();
  };

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={kittenIcons.BackIcon} />
  );

  const handleSave = async () => {
let status;
if(type === 0) {
  status = true
} else {
  status = false
}

    const uid = firebase.auth().currentUser.uid;
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .add({ title: titleInput, icon, type, status, createdAt: Date.now(), dates: {} });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={[styles.container, { paddingTop }]}>
      <Layout style={styles.navContainer} level="1">
        <TopNavigation alignment="center" accessoryLeft={renderBackAction} />
      </Layout>
      <Layout style={styles.iconLayout}>
        <Layout style={styles.circle}>
          {vectorIcons[icon]({ size: 75, color: "#7983a4" })}

          {vectorIconsUtility.edit({
            size: 40,
            color: "#A1A8CE",
            onPress: handlePress,
            style: styles.editIconIcon,
          })}
        </Layout>
      </Layout>
      <Layout style={styles.titleInputDiv}>
        <Text category="h4">Habit title:</Text>
        <Input

          placeholder="Enter text"
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
    alignItems: "center",
    minHeight: 150,
    marginTop: 20,
  },
  circle: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f2538",
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    borderWidth: 10,
    borderColor: "#7b8cde",
  },
  editIconIcon: {
    position: "absolute",
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

export default AddHabit;
