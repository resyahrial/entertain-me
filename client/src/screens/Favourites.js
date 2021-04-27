import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useReactiveVar } from "@apollo/client";

import theme from "../../theme";
import { CardList } from "../components";
import { getCategories } from "../helpers";
import { favouritesData } from "../graphql/reactiveVar";

export default function Favourites() {
  const Favourites = useReactiveVar(favouritesData);

  const categories = getCategories(Favourites);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Favourites</Text>
      {categories.map((category, idx) => {
        return <CardList data={Favourites} title={category} key={idx} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: theme.color.font.primary,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 8,
  },
  text: {
    color: theme.color.font.primary,
  },
});
