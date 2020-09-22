import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const StatsMain = () => {
  const {top: paddingTop, bottom: paddingBottom} = useSafeAreaInsets();
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
});

export default StatsMain;
