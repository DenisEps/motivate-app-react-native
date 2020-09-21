// import React from 'react';
// import { SafeAreaView } from 'react-native';
// import { Layout, Text } from '@ui-kitten/components';

// const Testhome = () => {
//   return (
//     <Layout
//       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//     >
//       <Text category="h1">Test Home</Text>
//     </Layout>
//   );
// };

// export default Testhome;

import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { Layout, Icon, Button } from '@ui-kitten/components';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits, setSettingsScreen } from '../../redux/actions';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Habit from '../Habit';
import { ROUTES } from '../../navigation/routes'
import { vectorIcons } from '../../assets/icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Smoking',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'smoke' },
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Fastfood',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'fastfood' },
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Learning',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'learn' },
  },
  {
    id: '586d94a0f-3da1-471f-bd96-145571e29d72',
    title: 'Bad Words',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'badwords' },
  },
  {
    id: '58694ad0f-3da1-471f-bd96-145571e29d72',
    title: 'Water',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'water' },
  },
  {
    id: '58694a0ff-3da1-471f-bd96-145571e29d72',
    title: 'Code',
    goals: ['lose', 'win', 'win', 'win', 'lose', 'lose', 'win'],
    icon: { name: 'code' },
  },
];

console.log(Object.keys(vectorIcons));

function Item({ item, onPress, style, handleOpen }) {
  const habits = useSelector((state) => state.habits);


  const iconName = item.icon.name;

  if (!vectorIcons[iconName]) return null;
  const icon = vectorIcons[iconName]({ size: 35, color: '#8389E6' });

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>

      {icon}

      <View style={styles.goals}>
        {item.goals.map((goal, i) => {
          let color = '';
          let type = '';
          if (goal === 'lose') {
            color = '#DE4E57';
            type = 'checkmark';
          } else {
            color = '#8BEE88';
            type = 'close';
          }
          return <Icon key={i} style={styles.icon} fill={color} name={type} />;
        })}
      </View>
    </TouchableOpacity>
  );
}

const SettingsIcon = (props) => (
  <Icon fill="black" {...props} name="maximize-outline" />
);

function ItemBack({ item, onPress, style, navigation, handleOpen }) {
  const dispatch = useDispatch();

  const handlePress = () => {
    handleOpen(item.id)
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.itemBack, style]}
    >
      <Button
        style={{ width: 20, height: 20 }}
        appearance="ghost"
        accessoryLeft={SettingsIcon}
        onPress={handlePress}
      />
      <Text>DETAILS</Text>
    </TouchableOpacity>
  );
}

const Testhome = (props) => {
  const { navigation } = props
  const [selectedId, setSelectedId] = useState(null);
  // const [settingScreen, SetSettingsScreen] = useState(false)
  const habits = useSelector((state) => state.habits);
  const settingScreen = useSelector((state) => state.settingsScreen);
  const dispatch = useDispatch();
  dispatch(setHabits(DATA));

  const handleOpenHabit = (id) => {
    navigation.navigate(ROUTES.habitDetails, {
      id,
    })
  }

  const handleCreateNew = () => {
    navigation.navigate(ROUTES.createNewHabit)
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#7B8CDE' : '#2B344F';

    return (
      <View>
        {item.id === selectedId ? (
          <ItemBack
            item={item}
            onPress={() => setSelectedId('')}
            style={{ backgroundColor }}
            handleOpen={handleOpenHabit}
          ></ItemBack>
        ) : (
            <>
              <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
              ></Item>
            </>
          )}
      </View>
    );
  };

  // const playSound = async () => {
  //   try {
  //     await Audio.setIsEnabledAsync(true);
  //     const soundObject = new Audio.Sound();
  //     await soundObject.loadAsync(require("../../audio/click.mp3"));
  //     await soundObject.playAsync();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Layout style={styles.container}>
      {settingScreen ? (
        <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
          <FlatList
            numColumns={2}
            data={habits}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
          <ProgressBar />
          {/* sounds button */}
          {/* <Button onPress={playSound} title="Play sound" /> */}
        </View>
      ) : (
          // <View style={{ width: 300, height: 500, backgroundColor: 'white', borderRadius: 15 }}>
          //   <Button title="poiti na tri huya" onPress={() => dispatch(setSettingsScreen(true))} />
          // </View>
          <Habit />
        )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  goals: { flexDirection: 'row' },
  icon: { width: 10, height: 10 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    height: 110,
    width: 110,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBack: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    height: 110,
    width: 110,
    // margin: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
    color: '#FFFFFF',
  },
});

export default Testhome;
