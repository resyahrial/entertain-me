import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useQuery, useReactiveVar } from "@apollo/client";

import theme from "../../theme";
import { GET_ALL_DATA } from "../graphql/queries";
import { CardList, Hero, ItemChoice } from "../components";
import { getCategories } from "../helpers";
import { showItem, reFetch } from "../graphql/reactiveVar";

export default function Home() {
  const [isShown, setIsShown] = useState(false);
  const [categories, setCategories] = useState([]);
  const item = useReactiveVar(showItem);
  const isRefetch = useReactiveVar(reFetch);
  const { loading, error, data, refetch } = useQuery(GET_ALL_DATA);

  useEffect(() => {
    if (!loading) {
      setCategories(getCategories(data[item]));
    }
  }, [item, loading, isRefetch]);

  useEffect(() => {
    if (!loading && isRefetch) {
      refetch();
      reFetch(false);
    }
  }, [isRefetch, loading]);

  return (
    <ScrollView style={styles.container}>
      {data && (
        <Hero
          data={data[item][Math.floor(Math.random() * data[item].length)]}
          openChooseItem={() => setIsShown(true)}
        />
      )}
      {categories &&
        categories.map((category, idx) => {
          return <CardList data={data[item]} title={category} key={idx} />;
        })}
      {isShown && <ItemChoice closeChooseItem={() => setIsShown(false)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: theme.color.font.primary,
  },
});
