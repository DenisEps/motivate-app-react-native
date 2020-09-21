import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { ROUTES } from '../routes';
import { HomeStackScreen } from '../HomeStack/HomeStack';
import { StatsStackScreen } from '../StatsStack';
import { vectorIcons, kittenIcons } from '../../assets/icons';
import TestSettings from '../../screens/TestScreens/testsettings';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={kittenIcons.HomeOutline} title="HOME" />
    <BottomNavigationTab icon={kittenIcons.PieChart} title="STATS" />
    <BottomNavigationTab icon={kittenIcons.SettingsIcon} title="SETTINGS" />
  </BottomNavigation>
);

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen name={ROUTES.homeTab} component={HomeStackScreen} />
        <Screen name={ROUTES.stats} component={StatsStackScreen} />
        <Screen name={ROUTES.settingsTab} component={TestSettings} />
      </Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
