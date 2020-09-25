import React, { useRef, useState } from 'react';
import {
  Input,
  Button,
  Layout,
  Text,
  ButtonGroup,
} from '@ui-kitten/components';
import {
  Animated,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import AuthForm from '../AuthForm';
import RegistrationForm from '../RegistrationForm';
import CustomTheme from '../../../../custom-theme.json';
import { Avatar } from 'react-native-paper';

// import * from 'react-native-animatable';
// import Animated from 'react-native-reanimated';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

function StartForm() {
  const fadeAnim = useRef(new Animated.Value(400)).current;
  const opacitySIAnim = useRef(new Animated.Value(0)).current;
  const opacitySUAnim = useRef(new Animated.Value(0)).current;
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [btnSIColor, setbtnSIColor] = useState(
    CustomTheme['color-primary-300']
  );
  const [btnSUColor, setbtnSUColor] = useState(
    CustomTheme['color-primary-300']
  );
  const [loader, setLoader] = useState(false);

  function buttonsUp(form) {
    Animated.timing(fadeAnim, {
      toValue: 250,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    if (form === 'signIn') {
      setbtnSIColor(CustomTheme['color-primary-600']);
      setbtnSUColor(CustomTheme['color-primary-300']);
      Animated.timing(opacitySUAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(),
        Animated.timing(opacitySIAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      setSignUp(false);
      return setSignIn(true);
    }
    if (form === 'signUp') {
      setbtnSUColor(CustomTheme['color-primary-600']);
      setbtnSIColor(CustomTheme['color-primary-300']);
      Animated.timing(opacitySIAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(),
        Animated.timing(opacitySUAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      setSignIn(false);
      return setSignUp(true);
    }
  }
  return (
    <Layout style={{ flexDirection: 'column', flex: 1 }}>
      <Animated.View style={{ top: fadeAnim }}>
        <Image
          style={{
            marginTop: -60,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 20,
            borderRadius: 100,
            borderColor: '#7B8CDE',
            borderWidth: 10,
          }}
          source={require('../../../img/main.png')}
        ></Image>
        <ButtonGroup style={styles.buttonGroup}>
          <Button
            style={{ backgroundColor: btnSIColor }}
            onPress={() => buttonsUp('signIn')}
          >
            <Text style={{ color: '#2B344F' }}>Sign In</Text>
          </Button>
          <Button
            style={{ backgroundColor: btnSUColor }}
            onPress={() => buttonsUp('signUp')}
          >
            <Text style={{ color: '#2B344F' }}>Sign Up</Text>
          </Button>
        </ButtonGroup>
      </Animated.View>

      <Animated.View
        style={{
          opacity: opacitySIAnim,
          zIndex: -1,
          marginTop: -220,
          top: fadeAnim,
        }}
      >
        {signIn && <AuthForm />}
      </Animated.View>
      <Animated.View style={{ opacity: opacitySUAnim, top: fadeAnim }}>
        {signUp && <RegistrationForm />}
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    justifyContent: 'center',
  },
});

export default StartForm;
