import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { ROUTES } from '../routes'
// import Habit from '../../screens/TestScreens/Habit';
import { HomeStackScreen } from '../HomeStack/HomeStack'
import TestSettings from '../../screens/TestScreens/testsettings';
import { useSelector } from 'react-redux';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeOutline = (props) => <Icon {...props} name="home-outline" />;
const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeOutline} title="HOME" />
    <BottomNavigationTab icon={SettingsIcon} title="SETTINGS" />
  </BottomNavigation>
);



const TabNavigator = () => {
  // const habits = useSelector((state) => state.habits);
console.log('`,,,,,,,,,,,,,,,,tab');
  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen name={ROUTES.homeTab} component={HomeStackScreen} />
        <Screen name={ROUTES.settingsTab} component={TestSettings} />
        {/* <Screen name="HABIT" component={Habit} /> */}
        {/* <Screen name="HABIT" component={Habit} /> */}
      </Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
