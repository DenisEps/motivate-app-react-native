import React from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { Icon } from '@ui-kitten/components';

/* <FontAwesome5 name="running" size={35} color="#8389E6" /> */
export const vectorIcons = {
  smoke: (props) => <MaterialIcons name="smoke-free" {...props} />,
  running: (props) => <FontAwesome5 name="running" {...props} />,
  water: (props) => <MaterialCommunityIcons name="cup-water" {...props} />,
  sport: (props) => <Ionicons name="ios-fitness" {...props} />,
  fastfood: (props) => <MaterialCommunityIcons name="food-off" {...props} />,
  read: (props) => <FontAwesome5 name="readme" {...props} />,
  learn: (props) => <MaterialCommunityIcons name="brain" {...props} />,
  code: (props) => <FontAwesome name="code" {...props} />,
  badwords: (props) => <MaterialIcons name="mood-bad" {...props} />,
  music: (props) => <MaterialCommunityIcons name="music" {...props} />,
  bottle: (props) => <FontAwesome5 name="wine-bottle" {...props} />,
  dog: (props) => <FontAwesome5 name="dog" {...props} />,
  medicine: (props) => <MaterialCommunityIcons name="pill" {...props} />,
  meditation: (props) => <Ionicons name="ios-sunny" {...props} />,
  unknown: (props) => <FontAwesome5 name="question" {...props} />,
};

export const vectorIconsUtility = {
  menuHorizontal: (props) => (
    <MaterialCommunityIcons {...props} name="dots-horizontal-circle-outline" />
  ),
  zoomOut: (props) => <MaterialIcons name="zoom-out-map" {...props} />,
  edit: (props) => <Feather name="edit" {...props} />,
  plus: (props) => <Entypo name="plus" {...props} />,
};

export const kittenIcons = {
  BackIcon: (props) => <Icon {...props} name="arrow-back" />,
  EditIcon: (props) => <Icon {...props} name="edit" />,
  MenuIcon: (props) => <Icon {...props} name="more-vertical" />,
  MenuIconHorizontal: (props) => (
    <Icon
      {...props}
      name="more-horizontal-outline
"
    />
  ),
  HomeOutline: (props) => <Icon {...props} name="home-outline" />,
  SettingsIcon: (props) => <Icon {...props} name="settings-outline" />,
  PieChart: (props) => <Icon {...props} name="pie-chart-outline" />,
  profile: (props) => <Icon {...props} name="person-outline" />,
};
