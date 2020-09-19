// import React from 'react';
// import { SafeAreaView } from 'react-native';
// import { Layout, Text } from '@ui-kitten/components';

// const Testhome = () => {
//   return (
//     <Layout
//       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//     >
//       <Text category="h1">Test Home</Text>
//     </Layout>
//   );
// };

// export default Testhome;

import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { setHabits } from "../../redux/actions";
// import { Audio } from "expo-av";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Smoking",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Fastfood",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Kicker",
  },
  {
    id: "586d94a0f-3da1-471f-bd96-145571e29d72",
    title: "ShitWords",
  },
  {
    id: "58694ad0f-3da1-471f-bd96-145571e29d72",
    title: "don't kill people after learning react native",
  },
  {
    id: "58694a0ff-3da1-471f-bd96-145571e29d72",
    title: "sleep",
  },
];

const Item = ({ item, onPress, style, navigation }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    {/* <View onPress={() => {
      navigation.navigate('')
    }}>
      <Text> ⚙️ </Text>
    </View> */}
  </TouchableOpacity>
);

const Testhome = () => {
  const [selectedId, setSelectedId] = useState(null);

  const habits = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  dispatch(setHabits(DATA));

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#7B8CDE" : "#2B344F";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      >
        {/* <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        /> */}
      </Item>
    );
  };

  // const playSound = async () => {
  //   try {
  //     await Audio.setIsEnabledAsync(true);
  //     const soundObject = new Audio.Sound();
  //     await soundObject.loadAsync(require("../../audio/click.mp3"));
  //     await soundObject.playAsync();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Layout style={styles.container}>
      <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
        <FlatList
          numColumns={2}
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <ProgressBar />
        {/* sounds button */}
        {/* <Button onPress={playSound} title="Play sound" /> */}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  item: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    height: 110,
    width: 110,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default Testhome;
