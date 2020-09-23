import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../routes';
import { HomeStackScreen } from '../HomeStack/HomeStack';
import { StatsStackScreen } from '../StatsStack';
import Profile from '../../components/Profile';
import { vectorIcons, kittenIcons } from '../../assets/icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
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
      <BottomNavigationTab icon={kittenIcons.profile} title="PROFILE" />
    </BottomNavigation>
  );
};

// function TabNavigator() {
//   return (
//     <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}
//       initialRouteName="Home"
//       activeColor="#f0edf6"
//       inactiveColor="#3e2465"
//       barStyle={{ backgroundColor: '#694fad' }} >
//       <Tab.Screen name={ROUTES.homeTab} component={HomeStackScreen} />
//       <Tab.Screen name={ROUTES.stats} component={StatsStackScreen} />
//       <Tab.Screen name={ROUTES.profile} component={Profile} />
//     </Tab.Navigator>
//   );
// }

const TabNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name={ROUTES.homeTab} component={HomeStackScreen} />
      <Screen name={ROUTES.stats} component={StatsStackScreen} />
      <Screen name={ROUTES.profile} component={Profile} />
    </Navigator>
  );
};

export default TabNavigator;
