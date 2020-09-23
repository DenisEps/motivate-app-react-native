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
import {
  kittenIcons,
  vectorIcons,
  vectorIconsUtility,
} from '../../assets/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../navigation/routes';

const AddHabit = ({ navigation }) => {
  const [icon, setIcon] = useState('unknown');
  const [titleInput, setTitleInput] = React.useState('');

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

  return (
    <Layout style={[styles.container, { paddingTop }]}>
      <Layout style={styles.navContainer} level="1">
        <TopNavigation alignment="center" accessoryLeft={renderBackAction} />
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
          placeholder="Enter text"
          value={titleInput}
          onChangeText={(nextValue) => setTitleInput(nextValue)}
          style={styles.titleInput}
        />
        <Button style={styles.button} status="primary">
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

export default AddHabit;
