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
import { setHabits } from '../../redux/actions';
import { format } from 'date-fns';
import {playSound, donatDone, details} from '../../audioFunctions'

const { width, height } = Dimensions.get('window');
console.log(height);
const PADDING = width / 24;
const ITEM_SIZE = (width - PADDING * 2) / 2 - PADDING;
const headerHeight = 64;
const bottomNavHeight = 88.5;
const AnimatedCircularProgressHeight = 110;
const availableHeight =
  height - headerHeight - bottomNavHeight - AnimatedCircularProgressHeight;
const ITEM_SIZE_v2 = availableHeight / 3 - PADDING * 2;

function Item({ item, onPress, style, changeStatus }) {
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
      {!item.status && item.type === 1 ? (
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
              changeStatus(true, item);
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
      ) : item.status && item.type === 0 ? (
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
              changeStatus(true, item);
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
                  width: ITEM_SIZE / 1.25,
                  height: ITEM_SIZE / 1.25,
                  borderRadius: 10,
                }}
                onLongPress={() => {
                  // item.goals[4] = 0;
                  changeStatus(false, item);
                  setUndoButton(false);
                }}
              >
                HOLD TO UNDO
              </Button>
            </Layout>
          ) : item.type === 1 ? (
            iconPositive
          ) : item.type === 0 ? (
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
    details()
    handleOpen(item.id, item.icon, item.title, item.type);
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

const seeder = async () => {
  const uid = firebase.auth().currentUser.uid;
  const smoke = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('habits')
    .add({
      icon: 'smoke',
      title: 'do not smoke',
      type: 0,
      createdAt: Date.parse(new Date(2020, 8, 1)),
      dates: {
        '01-09-2020': 1,
        '02-09-2020': 1,
        '03-09-2020': 1,
        '04-09-2020': 1,
        '05-09-2020': 1,
        '06-09-2020': 1,
        '08-09-2020': 1,
        '09-09-2020': 1,
        '10-09-2020': 1,
        '11-09-2020': 1,
        '12-09-2020': 1,
        '13-09-2020': 1,
        '14-09-2020': 1,
        '15-09-2020': 1,
        '17-09-2020': 1,
        '18-09-2020': 1,
        '19-09-2020': 1,
        '20-09-2020': 1,
        '21-09-2020': 1,
        '22-09-2020': 1,
        '23-09-2020': 1,
      },
    });
  const running = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('habits')
    .add({
      icon: 'running',
      title: 'Go running',
      type: 1,
      createdAt: Date.parse(new Date(2020, 8, 1)),
      dates: {
        '01-09-2020': 1,
        '03-09-2020': 1,
        '04-09-2020': 1,
        '05-09-2020': 1,
        '07-09-2020': 1,
        '08-09-2020': 1,
        '09-09-2020': 1,
        '10-09-2020': 1,
        '11-09-2020': 1,
        '13-09-2020': 1,
        '14-09-2020': 1,
        '15-09-2020': 1,
        '16-09-2020': 1,
        '17-09-2020': 1,
        '18-09-2020': 1,
        '19-09-2020': 1,
        '22-09-2020': 1,
        '23-09-2020': 1,
      },
    });
  const read = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('habits')
    .add({
      icon: 'read',
      title: 'Read 30 minutes',
      type: 1,
      createdAt: Date.parse(new Date(2020, 8, 1)),
      dates: {
        '01-09-2020': 1,
        '03-09-2020': 1,
        '04-09-2020': 1,
        '05-09-2020': 1,
        '07-09-2020': 1,
        '09-09-2020': 1,
        '11-09-2020': 1,
        '13-09-2020': 1,
        '14-09-2020': 1,
        '15-09-2020': 1,
        '16-09-2020': 1,
        '17-09-2020': 1,
        '18-09-2020': 1,
        '19-09-2020': 1,
        '20-09-2020': 1,
        '22-09-2020': 1,
        '24-09-2020': 1,
      },
    });
};

// seeder()

const Home = (props) => {
  const iconAdd = vectorIconsUtility['plus']({
    size: ITEM_SIZE / 1.3,
    color: '#2B344F',
  });
  const { navigation } = props;
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(null);
  const [habits, setHabits] = useState([]);
  const [progressBar, setProgressBar] = useState(0);
  // console.log(habits, "....>>>>dsadsaads");

  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    if (progressBar === 100) {
      donatDone()
    }
  }, [progressBar])

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .onSnapshot((snap) => {
          let firestoreHabits = [];
          snap.docs.forEach((d, index) => {
            const newData = { ...d.data(), id: d.id };
            firestoreHabits.splice(index, 0, newData);
          });
          const totalHabits = firestoreHabits.length
            ? firestoreHabits.length
            : 1;
          const donat =
            (firestoreHabits.reduce((result, { status }) => {
              if (status) {
                result += 1;
              }
              return result;
            }, 0) /
              totalHabits) *
            100;
            setProgressBar(donat);
          setHabits(firestoreHabits);
          console.log('set');
        });
      return () => {
        unsubscribe();
      };
    }, [])
  );

  // useFocusEffect(() => {
  //   let firestoreHabits = [];
  //   const unsubscribe = firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(uid)
  //     .collection("habits")
  //     .onSnapshot((snap) => {
  //       snap.docs.forEach((d) => {
  //         const newData = { ...d.data(), id: d.id };
  //         firestoreHabits.push(newData);
  //       });

  // if (habits.length !== firestoreHabits.length) {
  //   console.log(firestoreHabits);
  //   setHabits(firestoreHabits);
  // }
  // });
  // const seeder = async () => {
  //   const uid = firebase.auth().currentUser.uid;
  //   const habit1 = await firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .collection('habits')
  //     .add({
  //       icon: 'smoke',
  //       title: 'do not smoke',
  //       type: 'negative',
  //       dates: {
  //         '09.1': 1,
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
  //       },
  //     });
  // };

  // seeder();
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  if (habits === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleOpenHabit = (id, icon, title, type) => {
    navigation.navigate(ROUTES.habitDetails, {
      id,
      icon,
      title,
      type,
    });
  };
  
  const handleChangeStatus = async (status, item) => {
    playSound()
    const { title, type, id } = item;

    const oneHabit = habits.filter((el) => el.id === id);
    const dataToday = format(new Date(), 'dd-MM-yyyy');
    const check = oneHabit[0].dates[format(new Date(), 'dd-MM-yyyy')];

    const variable = status ? 1 : 0;
    let statusLoad =
      status && type === 1 ? true : !status && type === 0 ? true : false;

    console.log('statusLoad', statusLoad);

    let payload;
    if (variable === 1) {
      payload = { status: statusLoad };
      payload[`dates.${dataToday}`] = variable;
    } else if (variable === 0) {
      payload = { status: statusLoad };
      payload[`dates.${dataToday}`] = firebase.firestore.FieldValue.delete();
    }
    const habitUpdateStatus = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('habits')
      .doc(id)
      .update(payload);
    navigation.navigate(ROUTES.home);
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
            changeStatus={handleChangeStatus}
            style={{ backgroundColor }}
          />
        )}
      </View>
    );
  };



  return (
    <Layout style={[styles.container, { paddingTop }]}>
      <View>
        <TopNavMain navigation={navigation} />
        <Layout
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
      <Layout
        style={{ alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <AnimatedCircularProgress
          size={AnimatedCircularProgressHeight}
          width={15}
          backgroundWidth={5}
          fill={progressBar}
          tintColor="#F39B6D"
          tintColorSecondary="#7FC29B"
          backgroundColor="rgba(243,155,109,0.5)"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
        >
          {(fill) => (
            <Text style={{ color: 'white' }} category="h6">{`${Math.round(
              fill
            )}%`}</Text>
          )}
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
    marginBottom: PADDING,
    marginHorizontal: PADDING / 2,
    height: ITEM_SIZE_v2,
    width: ITEM_SIZE_v2,
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
    marginBottom: PADDING,
    marginHorizontal: PADDING / 2,
    height: ITEM_SIZE_v2,
    width: ITEM_SIZE_v2,
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
