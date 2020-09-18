import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Testhome = () => {
  return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text category="h1">Test Home</Text>
      </Layout>
  );
};

export default Testhome;
