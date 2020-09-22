import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../routes';
import { HomeStackScreen } from '../HomeStack/HomeStack';
import { StatsStackScreen } from '../StatsStack';
import { vectorIcons, kittenIcons } from '../../assets/icons';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BottomNavigation
      style={{
        paddingBottom: bottom,
        paddingTop: 8,
        backgroundColor: '#162050',
      }}
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={kittenIcons.HomeOutline} title="HOME" />
      <BottomNavigationTab icon={kittenIcons.PieChart} title="STATS" />
      <BottomNavigationTab icon={kittenIcons.SettingsIcon} title="SETTINGS" />
    </BottomNavigation>
  );
};

const TabNavigator = () => {
  // const habits = useSelector((state) => state.habits);
// console.log('`,,,,,,,,,,,,,,,,tab');
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name={ROUTES.homeTab} component={HomeStackScreen} />
      <Screen name={ROUTES.stats} component={StatsStackScreen} />
      {/* <Screen name={} component={} /> */}
    </Navigator>
  );
};

export default TabNavigator;
