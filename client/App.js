import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, YellowBox } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';
import { dark, light, mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { default as theme } from './custom-theme.json';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';
import { Provider } from 'react-redux';

const themes = { light: { ...light, ...theme }, dark: { ...dark, ...theme } };
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning:']);

const App = () => {
  return (
    <AppearanceProvider>
        <NavigationContainer>
          <Provider store={store}>
            <View style={{ flex: 1 }}>
              <StatusBar barStyle="light-content" />
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider mapping={mapping} theme={themes.dark}>
                <Layout style={{ flex: 1 }}>
                  <RootNavigator />
                </Layout>
              </ApplicationProvider>
            </View>
          </Provider>
        </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
