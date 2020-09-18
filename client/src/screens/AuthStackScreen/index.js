import React from 'react';
import { Layout } from '@ui-kitten/components';
import AuthForm from '../../components/Auth/AuthForm';

const Auth = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AuthForm />
    </Layout>
  );
};

export default Auth;
