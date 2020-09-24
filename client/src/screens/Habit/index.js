import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { format, parse } from 'date-fns';
import compareAsc from 'date-fns/compareAsc';
import { firebase } from '../../../firebase';
import { useFocusEffect } from '@react-navigation/native';
import {deleteHabitAudio} from '../../audioFunctions'
import {
  Calendar,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Divider,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { kittenIcons, vectorIcons } from '../../assets/icons';
import { ROUTES } from '../../navigation/routes';
import HabitCTX from './habitCTX';

// CALENDAR

const badgeStyle = StyleSheet.create({
  badgeOk: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#44AF69',
  },
  badgeFailed: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#EE6352',
  },
});

const CellStatus = ({ date, myData }, style) => {
  const today = format(new Date(), 'dd-MM-yyyy');
  const key = format(date, 'dd-MM-yyyy');
  const { dates, type } = myData;
  const record = dates[key];

  return (
    <View style={[styles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      {new Date() < date ? null : record !== undefined ? (
        <Layout style={badgeStyle.badgeOk}></Layout>
      ) : (
        <Layout style={badgeStyle.badgeFailed}></Layout>
      )}
    </View>
  );
};

const CalendarComponent = (props) => {
  const [date, setDate] = useState(null);

  const { dates, type } = useContext(HabitCTX);

  return (
    <Calendar
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderDay={(props) => <CellStatus myData={{ dates, type }} {...props} />}
      style={styles.calendar}
    />
  );
};


// TITLE CARD
const Header = (props) => <View {...props}></View>;
const TitleCard = ({ title }) => (
  <Layout style={styles.titleCard}>
    <Text category="s1">Habit Title:</Text>
    <Text category="h5">{title}</Text>
  </Layout>
);

const Habit = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const {
    params: { id, icon, title, type },
  } = route;
  
  const deleteHabit = async (id) => {
    deleteHabitAudio()
    const uid = await firebase.auth().currentUser.uid;
    firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('habits')
    .doc(id)
    .delete()
    .then(() => console.log('deleted'));
    navigation.goBack()
  }
  
  // ALERT
  const CreateHabitAlert = (id) => {
    Alert.alert('Habit menu', 'What would you like to do?', [
      { text: 'Delete', onPress: () => deleteHabit(id), style: 'cancel' },
      { text: 'Cancel', onPress: () => console.log('Delete'), style: 'default' },
    ]);
  };

  const [habit, setHabit] = useState(null);

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    try {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .doc(id)
        .get()
        .then((d) => {
          setHabit(d.data());
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // React.useEffect(() => {

  //   const fetchHabitById = async () => {
  //     setLoading(true)

  //     const habit = await firebase
  //         .firestore()
  //         .collection(userId) // брать from redux - id аутентифифрованного юзера
  //         .doc('habits')
  //         .collection('habits')
  //         .orderBy('date', 'desc')
  //         setHabit(habit)
  //         setLoading(false)
  //   }

  //   fetchHabitById()
  // }, [id]);

  // const handleAddRecord = async () => {
  //   const uid = firebase.auth().currentUser.uid;
  //   const ref = firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .collection('habits')
  //     .doc(id);

  //   const key = format(date, 'dd-MM-yyyy');

  //   try {
  //     await ref.update({
  //       dates: {
  //         ...habit.dates,
  //         [key]: 1,
  //       },
  //     });
  //     navigation.navigate(ROUTES.home);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (habit === null) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

  const back = () => {
    navigation.goBack();
  };

  const handleEditButton = () => {
    navigation.navigate(ROUTES.editHabit, { id, icon, title, type });
  };

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={kittenIcons.EditIcon}
        onPress={handleEditButton}
      />
      <TopNavigationAction
        icon={kittenIcons.MenuIcon}
        onPress={() => CreateHabitAlert(id)}
      />
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={kittenIcons.BackIcon} />
  );

  if (loading || !habit) {
    return (
      <Layout style={[styles.container, { paddingTop: top }]}>
        <Layout style={styles.navContainer} level="1">
          <TopNavigation
            alignment="center"
            accessoryLeft={renderBackAction}
            accessoryRight={renderRightActions}
          />
        </Layout>
        <Layout style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={'#000'} />
        </Layout>
      </Layout>
    );
  }

  return (
    <HabitCTX.Provider value={habit}>
      <Layout style={[styles.container, { paddingTop: top }]}>
        <Layout style={styles.navContainer} level="1">
          <TopNavigation
            alignment="center"
            accessoryLeft={renderBackAction}
            accessoryRight={renderRightActions}
          />
        </Layout>
        <ScrollView>
          <Layout style={styles.iconLayout}>
            <Layout style={styles.circle}>
              {/* {vectorIcons.smoke({ size: 75, color: '#7983a4' })} */}
              {vectorIcons[icon]({ size: 75, color: '#7983a4' })}
            </Layout>
          </Layout>

          <Divider />

          <TitleCard title={title} />

          <Divider />

          <Layout style={styles.calendarLayout}>
            <CalendarComponent />
          </Layout>
        </ScrollView>
      </Layout>
    </HabitCTX.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    // minHeight: 128,
  },
  iconLayout: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  circle: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2538',
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    borderWidth: 10,
    borderColor: '#7b8cde',
  },
  titleCard: { marginTop: 25, marginBottom: 25, paddingHorizontal: 15 },
  calendarLayout: {},
  calendar: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
    color: '#f39b6d',
  },
});

export default Habit;
