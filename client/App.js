import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <RootNavigator />
      </ApplicationProvider>
    </SafeAreaView>
  );
};

export default App;
