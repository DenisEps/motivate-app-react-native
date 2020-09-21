import React, { useState } from 'react';
import { StyleSheet, Alert, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Calendar,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  Card,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';

// ICONS
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const EditIcon = (props) => <Icon {...props} name="edit" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

// CALENDAR
const CellStatus = ({ date }, style) => {
  return (
    <View style={[styles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>
        {`${date.getDate()}.${date.getMonth() + 1}`}
      </Text>
    </View>
  );
};

const CalendarComponent = () => {
  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderDay={CellStatus}
      style={styles.calendar}
    />
  );
};

// ALERT
const CreateHabitAlert = () => {
  Alert.alert('Habit menu', 'What would you like to do?', [
    { text: 'Delete', onPress: () => console.log('Delete'), style: 'cancel' },
    { text: 'Cancel', onPress: () => console.log('Delete'), style: 'default' },
  ]);
};

// TITLE CARD
const Header = (props) => (
  <View {...props}>
    <Text category="s1">Habit Title:</Text>
  </View>
);
const TitleCard = () => (
  <Card style={styles.card} header={Header}>
    <Text category="h6">Don't smoke</Text>
  </Card>
);

const Habit = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [habit, setHabit] = React.useState(false);

  const {
    params: { id },
  } = route;

  // React.useEffect(() => {

  //   const fetchHabitById = async () => {
  //     setLoading(true)

  //     const habit = await firebase
  //         .firestore()
  //         .collection(userId) // брать from redux - id аутентифифрованного юзера
  //         .doc('habits')
  //         .collection('treatments')
  //         .orderBy('date', 'desc')
  //         setHabit(habit)
  //         setLoading(false)
  //   }

  //   fetchHabitById()
  // }, [id]);

  const back = () => {
    navigation.goBack();
  };

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <TopNavigationAction icon={MenuIcon} onPress={CreateHabitAlert} />
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={BackIcon} />
  );

  if (loading) {
    return (
      <Layout style={styles.container}>
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
    <Layout style={styles.container}>
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
            <MaterialIcons name="smoke-free" size={100} color="#7983a4" />
          </Layout>
        </Layout>

        <TitleCard />

        <Layout style={styles.calendarLayout}>
          <CalendarComponent />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  navContainer: {
    // minHeight: 128,
  },
  iconLayout: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    marginTop: 25,
    marginBottom: 25,
  },
  circle: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2538',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 10,
    borderColor: '#7b8cde',
  },
  card: { marginTop: 25, marginBottom: 25 },
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
