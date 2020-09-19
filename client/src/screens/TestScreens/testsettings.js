import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

const TestSettings = ({ route, navigation }) => {
  const { itemId } = route.params;

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Test Settings</Text>
    </Layout>
  );
};

export default TestSettings;
