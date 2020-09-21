import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { vectorIcons } from '../../assets/icons';


const Item = ({ item, onPress, style, navigation }) => {

  if (!vectorIcons[item]) return null;
  const icon = vectorIcons[item]({ size: 35, color: '#FFFFFF' });

  return (
    <TouchableOpacity onPress={() => {
      onPress();
      // handleSelect();
    }} style={[styles.item, style]}>
      {icon}
    </TouchableOpacity>
  )
};

const IconSelect = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item === selectedId ? "#7E0087" : "#5B58AF";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.keys(vectorIcons)}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedId}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 32,
  },
});

export default IconSelect;