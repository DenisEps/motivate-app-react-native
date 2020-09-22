import React, { useRef, useState } from 'react';
import { Input, Button, Layout, Text, ButtonGroup } from "@ui-kitten/components";
import { Animated, View, ActivityIndicator } from "react-native";
import AuthForm from '../AuthForm';
import RegistrationForm from '../RegistrationForm';
import CustomTheme from '../../../../custom-theme.json'

// import * from 'react-native-animatable';
// import Animated from 'react-native-reanimated';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

function StartForm() {
  const fadeAnim = useRef(new Animated.Value(400)).current;
  const opacitySIAnim = useRef(new Animated.Value(0)).current;
  const opacitySUAnim = useRef(new Animated.Value(0)).current;
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [btnSIColor, setbtnSIColor] = useState(CustomTheme["color-primary-300"]);
  const [btnSUColor, setbtnSUColor] = useState(CustomTheme["color-primary-300"]);

  const [loader, setLoader] = useState(false);

  function buttonsUp(form) {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    if (form === 'signIn') {
      setbtnSIColor(CustomTheme["color-primary-600"]);
      setbtnSUColor(CustomTheme["color-primary-300"]);
      Animated.timing(opacitySUAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }).start(),
        Animated.timing(opacitySIAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }).start()
      setSignUp(false);
      return setSignIn(true)
    }
    if (form === 'signUp') {
      setbtnSUColor(CustomTheme["color-primary-600"]);
      setbtnSIColor(CustomTheme["color-primary-300"]);
      Animated.timing(opacitySIAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }).start(),
        Animated.timing(opacitySUAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }).start()
      setSignIn(false);
      return setSignUp(true)
    }
  }
  return (
    <Layout style={{ backgroundColor: "white", width: "100%" }}>
      <Animated.View style={{ top: fadeAnim }}>
        <ButtonGroup style={{ justifyContent: "center" }}>
          <Button style={{ backgroundColor: btnSIColor }} onPress={() => buttonsUp('signIn')}>Sign in</Button>
          <Button style={{ backgroundColor: btnSUColor }} onPress={() => buttonsUp('signUp')}>Sign up</Button>
        </ButtonGroup>
      </Animated.View>
      <Animated.View style={{ top: fadeAnim, opacity: opacitySIAnim }}>
        {signIn && <AuthForm />}
      </Animated.View>
      <Animated.View style={{ top: fadeAnim, opacity: opacitySUAnim }}>
        {signUp && <RegistrationForm />}
      </Animated.View>
    </Layout >
  )
}

export default StartForm;
