import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';

const StatsMain = () => {
  return (
    <Layout style={styles.mainContainer}>
      <Layout style={styles.overViewContainer}>
        <Layout style={styles.overViewBox}>
          <Text category="h3">26</Text>
          <Text category="p2">BEST STREAK</Text>
        </Layout>
        <Layout style={styles.overViewBox}>
          <Text category="h3">49%</Text>
          <Text category="p2">SEP</Text>
        </Layout>
        <Layout style={styles.overViewBox}>
          <Text category="h3">58</Text>
          <Text category="p2">COMPLETIONS</Text>
        </Layout>
      </Layout>
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  overViewContainer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 15,
  },
  overViewBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
});

export default StatsMain;
