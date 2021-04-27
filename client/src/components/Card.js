import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

import { showBottomSheet, detailId } from "../graphql/reactiveVar";

const { width } = Dimensions.get("window");

export default function Card({ item, index }) {
  const handlePress = () => {
    detailId(item._id);
    showBottomSheet(true);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{ uri: item.poster_path }}
        style={[styles.container, { marginLeft: index === 0 ? 10 : 0 }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (width * 6) / 15,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});
