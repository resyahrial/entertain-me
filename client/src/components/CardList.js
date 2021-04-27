import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../../theme";

import Card from "./Card";

export default function CardList({ data, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <FlatList
        horizontal
        data={data
          .filter((el) => el.tags.includes(title))
          .sort(() => Math.floor(0.5 - Math.random()))}
        renderItem={({ item, index }) => <Card item={item} index={index} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: theme.color.font.primary,
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },
});
