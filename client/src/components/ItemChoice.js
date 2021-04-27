import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReactiveVar } from "@apollo/client";

import theme from "../../theme";
import { showItem } from "../graphql/reactiveVar";

const { height } = Dimensions.get("window");

export default function ItemChoice({ closeChooseItem }) {
  const item = useReactiveVar(showItem);

  const chooseItem = (item) => {
    showItem(item);
    closeChooseItem();
  };

  return (
    <View style={styles.contianer}>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <TouchableOpacity onPress={() => chooseItem("movies")}>
          <Text
            style={[
              styles.text,
              item === "movies" ? { fontWeight: "bold" } : {},
            ]}
          >
            Movies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => chooseItem("series")}>
          <Text
            style={[
              styles.text,
              item === "series" ? { fontWeight: "bold" } : {},
            ]}
          >
            Series
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={closeChooseItem}>
        <Ionicons
          name="close-circle"
          size={56}
          color={theme.color.font.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contianer: {
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 56,
  },
  text: {
    color: theme.color.font.primary,
    fontSize: 20,
    marginVertical: 4,
  },
});
