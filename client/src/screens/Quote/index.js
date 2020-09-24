import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { Layout, Text, Divider, Modal, Card, Button } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuoteMain = () => {
  const [visible, setVisible] = useState(true);
  const [quote, setQuote] = useState('');
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const quoteFetch = await fetch('https://zenquotes.io/api/random');
        let [quoteObject] = await quoteFetch.json();
        setQuote(quoteObject)
        setVisible(true);
      })()
      return () => {
      };
    }, [])
  );

  return (
    <Layout style={[styles.mainContainer, { paddingTop }]}>
          <Card disabled={true} style={{borderColor: "#FEA82F", width: "85%"}}>
            <Text style={styles.cardText, {fontSize: 25}}>"{quote.q}"</Text>
            <Text style={styles.cardText, { textAlign: "right", fontSize: 20 }}>{"\n"} {quote.a}</Text>
          </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default QuoteMain;
