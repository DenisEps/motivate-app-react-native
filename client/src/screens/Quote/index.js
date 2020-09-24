import React, { useState } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { Layout, Text, Divider, Modal, Card, Button } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const QuoteMain = () => {
  const [visible, setVisible] = useState(true);
  const [quote, setQuote] = useState('');
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const [load, setLoad] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const quoteFetch = await fetch('https://zenquotes.io/api/random');
        let [quoteObject] = await quoteFetch.json();
        setQuote(quoteObject)
        setVisible(true);
        setLoad(false)
      })()
      return () => {
        setLoad(true)
      };
    }, [])
  )

  if (load) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </Layout>
    );
  }

    return (
      <Layout style={[styles.mainContainer, { paddingTop }]}>
        <Card disabled={true} style={styles.card}>
          <Text style={styles.quote }>"{quote.q}"</Text>
          <Text style={styles.quoteAuthor}>{"\n"} {quote.a}</Text>
        </Card>
      </Layout>
    );

};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderColor: "#FEA82F",
    width: "85%",
  },
  quote: {
    fontSize: 25,
  },
  quoteAuthor: {
    textAlign: "right",
    fontSize: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default QuoteMain;
