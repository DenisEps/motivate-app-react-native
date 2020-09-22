import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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

const PADDING = 16;

const screenWidth = Dimensions.get('window').width;

// const data =[
//   { x: new Date(1986, 1, 1), y: 2 },
//   { x: new Date(1996, 1, 1), y: 3 },
//   { x: new Date(2006, 1, 1), y: 5 },
//   { x: new Date(2016, 1, 1), y: 4 }
// ];

const data = {
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
};

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
  return (
    <Layout style={[styles.mainContainer, { paddingTop }]}>
      <Layout style={styles.overviewContainer}>
        <Layout style={styles.overviewBox}>
          <Text category="h3">26</Text>
          <Text category="p2">BEST STREAK</Text>
        </Layout>
        <Layout style={styles.overviewBox}>
          <Text category="h3">49%</Text>
          <Text category="p2">SEP</Text>
        </Layout>
        <Layout style={styles.overviewBox}>
          <Text category="h3">58</Text>
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
