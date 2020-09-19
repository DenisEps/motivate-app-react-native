import React, { useRef, useState } from 'react';
import { Input, Button, Layout, Text, ButtonGroup } from "@ui-kitten/components";
import { Animated, View } from "react-native";
import AuthForm from '../AuthForm';
import RegistrationForm from '../RegistrationForm';

// import * from 'react-native-animatable';
// import Animated from 'react-native-reanimated';
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

function StartForm() {
  const fadeAnim = useRef(new Animated.Value(500)).current;
  const opacitySIAnim = useRef(new Animated.Value(0)).current;
  const opacitySUAnim = useRef(new Animated.Value(0)).current;
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [btnSIColor, setbtnSIColor] = useState('white');
  const [btnSUColor, setbtnSUColor] = useState('white');

  function buttonsUp(form) {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 1000
    }).start();
    if (form === 'signIn') {
      setbtnSIColor('blue');
      setbtnSUColor('white');
      setTimeout(() => {
        Animated.timing(opacitySUAnim, {
          toValue: 0,
          duration: 1000
        }).start();
      }, 1000);
      Animated.timing(opacitySIAnim, {
        toValue: 1,
        duration: 1000
      }).start();
      setSignUp(false);
      return setSignIn(true)
    }
    if (form === 'signUp') {
      setbtnSUColor('blue');
      setbtnSIColor('white');
      setTimeout(() => {
        Animated.timing(opacitySIAnim, {
          toValue: 0,
          duration: 1000
        }).start();
        setSignIn(false);
      }, 2000)
      Animated.timing(opacitySUAnim, {
        toValue: 1,
        duration: 1000
      }).start();
      return setSignUp(true)
    }
  }
  return (
    <Layout level="1">
      <Animated.View style={{ position: "absolute", top: fadeAnim, left: 120, borderRadius: 10, borderWidth: 3, borderColor: "blue", borderStyle: "solid", backgroundColor: "white", color: "blue" }}>
        <ButtonGroup>
          <Button style={{ backgroundColor: btnSIColor, color: "blue" }} onPress={() => buttonsUp('signIn')}>Sign in</Button>
          <Button style={{ backgroundColor: btnSUColor, color: "blue" }} onPress={() => buttonsUp('signUp')}>Sign up</Button>
        </ButtonGroup>
      </Animated.View>
      <Animated.View style={{ position: "absolute", top: fadeAnim, opacity: opacitySIAnim }}>
        {signIn ? <AuthForm /> : null}
      </Animated.View>
      <Animated.View style={{ position: "absolute", top: fadeAnim, opacity: opacitySUAnim }}>
        {signUp ? <RegistrationForm /> : null}
      </Animated.View>
    </Layout >
  )
}


export default StartForm;
