import 'react-native-gesture-handler';
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './custom-theme.json';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <RootNavigator />
    </ApplicationProvider>
  );
};

export default App;
