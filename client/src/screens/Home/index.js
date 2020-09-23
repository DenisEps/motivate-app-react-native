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
import { setHabits } from '../../redux/actions';
import { ROUTES } from '../../navigation/routes';
import { TopNavMain } from '../../components/Header';
import { vectorIcons, vectorIconsUtility } from '../../assets/icons';
import AsyncStorage from '@react-native-community/async-storage';

// const habits = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'Smoking',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'smoke' },
//     status: false
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Fastfood',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'fastfood' },
//     status: false
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Learning',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'learn' },
//     status: false
//   },
//   {
//     id: '586d94a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Bad Words',
//     goals: [0, 1, 1, 1, 0, 0, 1],
//     icon: { name: 'badwords' },
//     status: false
//   },
// ];
// const uid = firebase.auth().currentUser.uid
// const user = firebase.firestore().collection('users').doc(uid).get().then(info => console.log(info.data()))

// const load = async () => {
//   try {
//     const user = await AsyncStorage.getItem('user');
//   } catch (e) {
//     console.log(e);
//   }
// }
// load()

const { width, height } = Dimensions.get('window');
const PADDING = width / 24;
const ITEM_SIZE = (width - PADDING * 2) / 2 - PADDING;

function Item({ item, onPress, style, handleOpen }) {
  const iconName = item.icon;
  const [spinner, setSpinner] = useState(false);
  const [check, setCheck] = useState(false);
  const [styleOnStatys, setStyleOnStatys] = useState({});
  if (!vectorIcons[iconName]) return null;
  const icon = vectorIcons[iconName]({ size: ITEM_SIZE / 2, color: '#8389E6' });
  const iconActive = vectorIcons[iconName]({ size: ITEM_SIZE / 2, color: '#2B344F' });
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
            item.goals[4] = 1;
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
          {!check && <Text style={styles.title}>{item.title}</Text>}

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

          {/* {!check && (
            <Layout style={styles.goals}>
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
            </Layout>
          )} */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.item, style, { backgroundColor: '#7B8CDE' }]}
        >
          <Text style={styles.title}>{item.title}</Text>

          {iconActive}

          {/* <Layout style={styles.goals}>
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
          </Layout> */}
        </TouchableOpacity>
      )}
    </>
  );
}

function ItemBack({ item, onPress, style, navigation, handleOpen }) {
  const handlePress = () => {
    handleOpen(item.id);
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
  const { navigation } = props;
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(null);
  const [habits, setHabits] = useState(null);

  useEffect(() => {
    let firestoreHabits = [];
    const uid = firebase.auth().currentUser.uid;
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('habits')
      .onSnapshot((snap) => {
        snap.docs.forEach((d) => {
          const newData = {...d.data(), id: d.id}
          firestoreHabits.push(newData);
        });
        setHabits(firestoreHabits);
      });
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
      <View>
        <TopNavMain />

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
  },
  title: {
    color: '#E6ECFD',
  },
});

export default Home;
