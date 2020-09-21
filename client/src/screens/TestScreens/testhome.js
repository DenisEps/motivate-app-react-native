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
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebase } from '../../../firebase';
import {
  Layout,
  Icon,
  Button,
  Text,
  Layout as View,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../../redux/actions';
import { ROUTES } from '../../navigation/routes';
import { vectorIcons } from '../../assets/icons';
import AsyncStorage from '@react-native-community/async-storage';

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
// const uid = firebase.auth().currentUser.uid
// const user = firebase.firestore().collection('users').doc(uid).get().then(info => console.log(info.data()))

// const load = async () => {
//   try {
//     const user = await AsyncStorage.getItem('user');
//     console.log(user);
//   } catch (e) {
//     console.log(e);
//   }
// }
// load()

const { width } = Dimensions.get('window');
const PADDING = 10;
const SIZE = (width - PADDING * 2) / 2 - PADDING;

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
    handleOpen(item.id);
  };
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
  const { navigation } = props;
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(null);
  // const [settingScreen, SetSettingsScreen] = useState(false)
  const habits = useSelector((state) => state.habits);
  const settingScreen = useSelector((state) => state.settingsScreen);
  const dispatch = useDispatch();
  dispatch(setHabits(DATA));

  const handleOpenHabit = (id) => {
    navigation.navigate(ROUTES.habitDetails, {
      id,
    });
  };

  const handleCreateNew = () => {
    navigation.navigate(ROUTES.createNewHabit);
  };

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
          />
        ) : (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            style={{ backgroundColor }}
          />
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
    <Layout style={[styles.container, { paddingTop }]}>
      <View
      // style={{ marginTop: StatusBar.currentHeight || 0 }}
      >
        <Layout style={{ alignItems: 'center' }}>
          <Text category="h4">HEADER HERE</Text>
        </Layout>
        {/* <FlatList
          numColumns={2}
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        /> */}

        <Layout
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {habits.map((h) => {
            return <Layout key={h.id}>{renderItem({ item: h })}</Layout>;
          })}
        </Layout>

        {/* sounds button */}
        {/* <Button onPress={playSound} title="Play sound" /> */}
      </View>
      <Layout style={{ alignItems: 'center' }}>
        <AnimatedCircularProgress
          size={110}
          width={15}
          backgroundWidth={5}
          fill={40}
          tintColor="#F39B6D"
          tintColorSecondary="#7FC29B"
          backgroundColor="rgba(243,155,109,0.5)"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
        >
          {(fill) => <Text>{`${Math.round(fill)}%`}</Text>}
        </AnimatedCircularProgress>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  goals: { flexDirection: 'row' },
  icon: { width: 10, height: 10 },
  container: {
    flex: 1,
  },
  item: {
    padding: PADDING,
    marginVertical: PADDING,
    // marginHorizontal: 16,
    marginHorizontal: PADDING,
    height: SIZE,
    width: SIZE,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemBack: {
    padding: PADDING,
    marginVertical: PADDING,
    // marginHorizontal: 16,
    height: SIZE,
    width: SIZE,
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
