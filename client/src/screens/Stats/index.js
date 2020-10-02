import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { firebase } from '../../../firebase';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { format, parse } from 'date-fns';

const PADDING = 16;

const screenWidth = Dimensions.get('window').width;

// const data =[
//   { x: new Date(1986, 1, 1), y: 2 },
//   { x: new Date(1996, 1, 1), y: 3 },
//   { x: new Date(2006, 1, 1), y: 5 },
//   { x: new Date(2016, 1, 1), y: 4 }
// ];

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#667eea',
  backgroundGradientTo: '#764ba2',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '3',
    stroke: '#9CABEB',
  },
};

const StatsMain = () => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [habits, setHabits] = useState([]);
  const [allPerformedShow, setAllPerformedShow] = useState(0);
  const [
    percentPerformedInMonthShow,
    setPercentPerformedInMonthShow,
  ] = useState(0);
  const [data, setData] = useState({
    labels: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  });
  const uid = firebase.auth().currentUser.uid;

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('habits')
        .onSnapshot((snap) => {
          let firestoreHabits = [];
          snap.docs.forEach((d) => {
            const newData = { ...d.data(), id: d.id };
            firestoreHabits.push(newData);
          });
          setHabits(firestoreHabits);
          addStats(firestoreHabits);
        });
      return () => {
        unsubscribe();
      };
    }, [])
  );

  async function addStats(habits) {
    let habitsToChart = [...habits];
    let countsBadDays = 0;
    let dayOfPerformed = 0;
    let positiveForWeeks = [0, 0, 0, 0, 0, 0];
    let negativeForWeeks = [0, 0, 0, 0, 0, 0];
    let allPerformedPositiveNum = 0;
    let allPerformedNegativeNum = 0;
    let createdAt = '';
    let createdAtDay = 0;
    let createdAtMonth = 0;
    let dateNow = new Date();
    let days_in_month =
      32 - new Date(dateNow.getFullYear(), dateNow.getMonth(), 32).getDate();
    let thisMonth = dateNow.getMonth() + 1;
    let thisDay = dateNow.getDate();
    let firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    let dayOfWeekOfFirstDayInMonth = firstDayOfMonth.getDay();
    let lastDayOfFirstWeek = 8 - dayOfWeekOfFirstDayInMonth;
    let firstDayOfSecondWeek = lastDayOfFirstWeek + 1;
    let lastDayOfSecondWeek = firstDayOfSecondWeek + 6;
    let firstDayOfThirdWeek = lastDayOfSecondWeek + 1;
    let lastDayOfThirdWeek = firstDayOfThirdWeek + 6;
    let firstDayOfFourthWeek = lastDayOfThirdWeek + 1;
    let lastDayOfFourthWeek = firstDayOfFourthWeek + 6;
    let firstDayOfFifthWeek = lastDayOfFourthWeek + 1;
    let lastDayOfFifthWeek = firstDayOfFifthWeek + 6;
    let firstDayOfSixthWeek = lastDayOfFifthWeek + 1;
    let lastDayOfSixthWeek = firstDayOfSixthWeek + 6;
    if (lastDayOfFourthWeek + 1 <= days_in_month) {
      firstDayOfFifthWeek = lastDayOfFourthWeek + 1;
      if (lastDayOfFourthWeek + 1 == days_in_month) {
        lastDayOfFifthWeek = days_in_month;
      } else {
        if (firstDayOfFifthWeek + 6 <= days_in_month) {
          lastDayOfFifthWeek = firstDayOfFifthWeek + 6;
          if (firstDayOfFifthWeek + 6 == days_in_month) {
            lastDayOfFifthWeek = days_in_month;
          } else {
            if (lastDayOfFifthWeek + 1 <= days_in_month) {
              firstDayOfSixthWeek = days_in_month;
              if (firstDayOfSixthWeek + 6 <= days_in_month) {
                lastDayOfSixthWeek = days_in_month;
              }
            }
          }
        }
      }
    }
    // let lastDayOfFifthWeek = firstDayOfFifthWeek + 6;
    // console.log(lastDayOfFifthWeek, '>>>>>>>>', thisDayOfWeek);
    habitsToChart.forEach((element) => {
      createdAt = new Date(element.createdAt).toLocaleDateString().split('/');
      // console.log(createdAt);
      createdAtDay = Number(createdAt[1]);
      createdAtMonth = Number(createdAt[0]);
      if (element.type === 1) {
        for (let variable in element.dates) {
          if (Number(variable.slice(3, 5)) === thisMonth) {
            allPerformedPositiveNum += element.dates[variable];
            dayOfPerformed = Number(variable.slice(0, 2));
            if (dayOfPerformed <= lastDayOfFirstWeek) {
              positiveForWeeks[0] += 1;
            } else if (
              dayOfPerformed <= lastDayOfSecondWeek &&
              dayOfPerformed >= firstDayOfSecondWeek
            ) {
              positiveForWeeks[1] += 1;
            } else if (
              dayOfPerformed <= lastDayOfThirdWeek &&
              dayOfPerformed >= firstDayOfThirdWeek
            ) {
              positiveForWeeks[2] += 1;
            } else if (
              dayOfPerformed <= lastDayOfFourthWeek &&
              dayOfPerformed >= firstDayOfFourthWeek
            ) {
              positiveForWeeks[3] += 1;
            } else if (
              dayOfPerformed <= lastDayOfFifthWeek &&
              dayOfPerformed >= firstDayOfFifthWeek
            ) {
              positiveForWeeks[4] += 1;
            } else if (
              dayOfPerformed <= lastDayOfSixthWeek &&
              dayOfPerformed >= firstDayOfSixthWeek
            ) {
              positiveForWeeks[5] += 1;
            }
          }
        }
      } else {
        if (createdAtMonth === thisMonth) {
          countsBadDays += thisDay - createdAtDay;
        } else {
          countsBadDays += thisDay;
        }

        for (let variable in element.dates) {
          if (Number(variable.slice(3, 5)) === thisMonth) {
            allPerformedNegativeNum += element.dates[variable];
            dayOfPerformed = Number(variable.slice(0, 2));
            if (dayOfPerformed <= lastDayOfFirstWeek) {
              negativeForWeeks[0] += 1;
            } else if (
              dayOfPerformed <= lastDayOfSecondWeek &&
              dayOfPerformed >= firstDayOfSecondWeek
            ) {
              negativeForWeeks[1] += 1;
            } else if (
              dayOfPerformed <= lastDayOfThirdWeek &&
              dayOfPerformed >= firstDayOfThirdWeek
            ) {
              negativeForWeeks[2] += 1;
            } else if (
              dayOfPerformed <= lastDayOfFourthWeek &&
              dayOfPerformed >= firstDayOfFourthWeek
            ) {
              negativeForWeeks[3] += 1;
            } else if (
              dayOfPerformed <= lastDayOfFifthWeek &&
              dayOfPerformed >= firstDayOfFifthWeek
            ) {
              negativeForWeeks[4] += 1;
            } else if (
              dayOfPerformed <= lastDayOfSixthWeek &&
              dayOfPerformed >= firstDayOfSixthWeek
            ) {
              negativeForWeeks[5] += 1;
            }
          }
        }
      }
    });
    let allPerformed =
      allPerformedPositiveNum + countsBadDays - allPerformedNegativeNum + 1; // ПЛЮС 1 - КОСТЫЛЬ ЕСТЬ КОСЯК С ДАТАМИ
    setAllPerformedShow(allPerformed);
    let percentOfPositive = (allPerformedPositiveNum / thisDay) * 100;
    let percentOfNegative =
      ((countsBadDays + 1 - allPerformedNegativeNum) / thisDay) * 100; // ПЛЮС 1 - КОСТЫЛЬ ЕСТЬ КОСЯК С ДАТАМИ
    // console.log(countsBadDays - allPerformedNegativeNum);
    let percentPerformedInMonth = (percentOfPositive + percentOfNegative) / 2;
    setPercentPerformedInMonthShow(Math.floor(percentPerformedInMonth));
    // console.log('999', percentPerformedInMonth);

    const datas = {
      labels: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'],
      datasets: [
        {
          data: [
            positiveForWeeks[0],
            positiveForWeeks[1],
            positiveForWeeks[2],
            positiveForWeeks[3],
          ],
        },
      ],
    };
    setData(datas);
  }

  return (
    <Layout style={[styles.mainContainer, { paddingTop }]}>
      <Layout style={styles.overviewContainer}>
        <Layout style={styles.overviewBox}>
          <Text category="h3">7</Text>
          <Text category="p2">BEST STREAK</Text>
        </Layout>
        <Layout style={styles.overviewBox}>
          <Text category="h3">{percentPerformedInMonthShow}%</Text>
          <Text category="p2">SEP</Text>
        </Layout>
        <Layout style={styles.overviewBox}>
          <Text category="h3">{allPerformedShow}</Text>
          <Text category="p2">COMPLETIONS</Text>
        </Layout>
      </Layout>
      <Divider />

      <Layout style={styles.chartContainer}>
        <LineChart
          style={styles.chart}
          data={data}
          width={screenWidth - PADDING * 4}
          height={256}
          verticalLabelRotation={0}
          chartConfig={chartConfig}
          bezier
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: PADDING,
  },
  overviewContainer: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 15,
  },
  overviewBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  chart: {
    borderRadius: 10,
  },
});

export default StatsMain;
