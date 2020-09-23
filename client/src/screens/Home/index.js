import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
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
import { ROUTES } from '../../navigation/routes';
import { TopNavMain } from '../../components/Header';
import { vectorIcons, vectorIconsUtility } from '../../assets/icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// const habitsFB = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Smoking',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'smoke' },
//     status: false,
//     type: 'negative',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Fastfood',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'fastfood' },
//     status: false,
//     type: 'negative',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Learning',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'learn' },
//     status: false,
//     type: 'positive',
//   },
// {
//   id: '586d94a0f-3da1-471f-bd96-145571e29d72',
//   title: 'Bad Words',
//   goals: [0, 1, 1, 1, 1, 0, 1],
//   icon: { name: 'badwords' },
//   status: true,
//   type: 'negative',
// },
// {
//   id: '58694ad0f-3da1-471f-bd96-145571e29d72',
//   title: 'Water',
//   goals: [0, 1, 1, 1, 0, 0, 1],
//   icon: { name: 'water' },
//   status: true,
//   type: 'positive',
// },
// {
//   id: '58694a0ff-3da1-471f-bd96-145571e29d72',
//   title: 'Code',
//   goals: [0, 1, 1, 1, 0, 0, 1],
//   icon: { name: 'code' },
// status: true,
// type: 'positive',
// },
// ];
// const uid = firebase.auth().currentUser.uid

const { width, height } = Dimensions.get('window');
const PADDING = width / 24;
const ITEM_SIZE = (width - PADDING * 2) / 2 - PADDING;

function Item({ item, onPress, style }) {
  const iconName = item.icon;
  const [spinner, setSpinner] = useState(false);
  const [check, setCheck] = useState(false);
  const [undoButton, setUndoButton] = useState(false);
  if (!vectorIcons[iconName]) return null;
  const icon = vectorIcons[iconName]({ size: ITEM_SIZE / 2, color: '#8389E6' });
  const iconPositive = vectorIcons[iconName]({
    size: ITEM_SIZE / 2,
    color: '#8BEE88',
  });
  const iconNegative = vectorIcons[iconName]({
    size: ITEM_SIZE / 2,
    color: '#DE4E57',
  });

  const downsize = 20;
  return (
    <>
      {!item.status ? (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={() => {
            setTimeout(() => {
              setSpinner(true);
            }, 200);
            setTimeout(() => {
              setSpinner(false);
              setCheck(true);
            }, 700);
          }}
          onLongPress={() => {
            // item.goals[4] = 1;
            setTimeout(() => {
              item.status = true;
            }, 1000);
          }}
          onPressOut={() => {
            setSpinner(false);
            setTimeout(() => {
              setCheck(false);
            }, 1000);
          }}
          style={[styles.item, style]}
        >
          {!check && (
            <Text category="h6" style={styles.title}>
              {item.title}
            </Text>
          )}

          {!check && icon}

          {spinner && (
            <Image
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                left: 0,
                bottom: 0,
                zIndex: 1,
                position: 'absolute',
              }}
              source={require('../../img/spinner4.gif')}
            />
          )}

          {check && (
            <Image
              style={{
                width: ITEM_SIZE - downsize,
                height: ITEM_SIZE - downsize,
                left: downsize / 2,
                bottom: downsize / 2,
                zIndex: 1,
                position: 'absolute',
              }}
              source={require('../../img/check1.png')}
            />
          )}

          {/* {!check && <Layout style={styles.goals}>
            {item.goals.map((goal, i) => {
              let color = '';
              let type = '';
              if (goal === 1) {
                color = '#8BEE88';
                type = 'checkmark';
              } else {
                color = '#DE4E57';
                type = 'close';
              }
              return (
                <Icon key={i} style={styles.icon} fill={color} name={type} />
              );
            })}
          </Layout>} */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          onLongPress={() => setUndoButton(true)}
          style={[styles.item, style, { backgroundColor: '#7B8CDE' }]}
        >
          {!undoButton && (
            <Text category="h6" style={styles.title}>
              {item.title}
            </Text>
          )}

          {/* {item.type === 'positive' ? iconPositive : iconNegative} */}

          {undoButton ? (
            <Layout style={{ borderRadius: 10 }}>
              <Button
                style={{
                  backgroundColor: '#2B344F',
                  width: 120,
                  height: 120,
                  borderRadius: 10,
                }}
                onLongPress={() => {
                  item.status = false;
                  // item.goals[4] = 0;
                  setUndoButton(false);
                }}
              >
                HOLD TO UNDO
              </Button>
            </Layout>
          ) : item.type === 'positive' ? (
            iconPositive
          ) : item.type === 'negative' ? (
            iconNegative
          ) : (
            iconAdd
          )}

          {/* {!undoButton && <Layout style={styles.goals}>
            {item.goals.map((goal, i) => {
              let color = '';
              let type = '';
              if (goal === 1) {
                color = '#8BEE88';
                type = 'checkmark';
              } else {
                color = '#DE4E57';
                type = 'close';
              }
              return (
                <Icon key={i} style={styles.icon} fill={color} name={type} />
              );
            })}
          </Layout>} */}
        </TouchableOpacity>
      )}
    </>
  );
}

function ItemBack({ item, onPress, style, handleOpen }) {
  const handlePress = () => {
    handleOpen(item.id, item.icon, item.title);
  };
  const renderZoomIcon = () => {
    return vectorIconsUtility.menuHorizontal({ size: 50, color: '#090D20' });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.itemBack, style]}
    >
      <Button
        appearance="ghost"
        accessoryLeft={renderZoomIcon}
        onPress={handlePress}
      />
      <Text category="s1" style={{ color: '#090D20' }}>
        DETAILS
      </Text>
    </TouchableOpacity>
  );
}

const Home = (props) => {
  const iconAdd = vectorIconsUtility['plus']({
    size: ITEM_SIZE / 1.3,
    color: '#2B344F',
  });
  const { navigation } = props;
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(null);
  const [habits, setHabits] = useState(null);

  const uid = firebase.auth().currentUser.uid;

  useFocusEffect(() => {
    let firestoreHabits = [];
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('habits')
      .onSnapshot((snap) => {
        snap.docs.forEach((d) => {
          const newData = { ...d.data(), id: d.id };
          firestoreHabits.push(newData);
        });

        setHabits(firestoreHabits);
      });

    const seeder = async () => {
      const uid = firebase.auth().currentUser.uid;
      const habit1 = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .add({
          icon: 'smoke',
          title: 'do not smoke',
          type: 'negative',
          dates: [
            {day: 1, month: 9, value: 1},
            {day: 2, month: 9, value: 0},
            {day: 3, month: 9, value: 0},
            {day: 4, month: 9, value: 1},
            {day: 5, month: 9, value: 1},
            {day: 6, month: 9, value: 0},
            {day: 7, month: 9, value: 1},
            {day: 8, month: 9, value: 0},
            {day: 9, month: 9, value: 1},
            {day: 10, month: 9, value: 1},
            {day: 11, month: 9, value: 0},
            {day: 12, month: 9, value: 0},
            {day: 13, month: 9, value: 0},
            {day: 14, month: 9, value: 1},
            {day: 15, month: 9, value: 1},
            {day: 16, month: 9, value: 0},
            {day: 17, month: 9, value: 1},
            {day: 18, month: 9, value: 0},
            {day: 19, month: 9, value: 1},
            {day: 20, month: 9, value: 1},
            {day: 21, month: 9, value: 0},
            {day: 22, month: 9, value: 1},
            {day: 23, month: 9, value: 1},
    //         '09.2': 0,
    //         '09.3': 1,
    //         '09.4': 1,
    //         '09.5': 0,
    //         '09.6': 1,
    //         '09.7': 1,
    //         '09.8': 0,
    //         '09.9': 1,
    //         '09.10': 1,
    //         '09.11': 0,
    //         '09.12': 1,
    //         '09.13': 1,
    //         '09.14': 1,
    //         '09.15': 0,
    //         '09.16': 1,
    //         '09.17': 1,
    //         '09.18': 0,
    //         '09.19': 0,
    //         '09.20': 0,
    //         '09.21': 1,
    //         '09.22': 1,
    //         '09.23': 1,
    //         '09.24': 1,
    //         '09.25': 0,
    //         '09.26': 1,
    //         '09.27': 1,
    //         '09.28': 0,
    //         '09.29': 1,
    //         '09.30': 1,
          ],
        });
    };

    // seeder();
    return () => {
      unsubscribe();
    };
  }, []);

  if (habits === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleOpenHabit = (id, icon, title) => {
    navigation.navigate(ROUTES.habitDetails, {
      id,
      icon,
      title,
    });
  };

  const handleCreateNew = () => {
    navigation.navigate(ROUTES.addHabit);
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
            onPress={() => {
              setSelectedId(item.id);
              setTimeout(() => {
                setSelectedId('');
              }, 3000);
            }}
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
      <View>
        <TopNavMain navigation={navigation} />
        <Layout
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {habits.map((h) => {
            return <Layout key={h.id}>{renderItem({ item: h })}</Layout>;
          })}

          {/* ADD BUTTON */}
          {habits.length < 6 && (
            <TouchableOpacity
              onPress={handleCreateNew}
              style={[
                styles.item,
                { backgroundColor: '#7B8CDE', justifyContent: 'space-around' },
              ]}
            >
              <Text category="h6" style={{ color: '#E6ECFD' }}>
                ADD
              </Text>
              {iconAdd}
              <Text category="h6" style={{ color: '#E6ECFD' }}>
                NEW HABIT
              </Text>
            </TouchableOpacity>
          )}
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
  goals: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0)' },
  icon: { width: 20, height: 20 },
  container: {
    flex: 1,
    position: 'relative',
  },
  item: {
    padding: PADDING,
    marginVertical: PADDING,
    marginHorizontal: PADDING,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemBack: {
    padding: PADDING,
    marginVertical: PADDING,
    marginHorizontal: PADDING,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#E6ECFD',
  },
});

export default Home;
