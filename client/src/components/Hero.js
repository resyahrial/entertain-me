import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useReactiveVar } from "@apollo/client";

import theme from "../../theme";
import {
  showBottomSheet,
  detailId,
  formState,
  showItem,
} from "../graphql/reactiveVar";

const { width, height } = Dimensions.get("window");

export default function Hero({ data, openChooseItem }) {
  const item = useReactiveVar(showItem);

  const addMovie = () => {
    detailId(null);
    formState(true);
    showBottomSheet(true);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.poster_path }} style={styles.heroImage} />
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent"]}
        style={[styles.overlay, { height: "50%", top: 0 }]}
      />
      <View
        style={[
          styles.overlay,
          {
            top: 0,
          },
        ]}
      >
        <View
          style={[
            styles.action,
            {
              justifyContent:
                item === "movies" ? "space-between" : "flex-start",
              paddingHorizontal: 32,
              paddingTop: 32,
            },
          ]}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={openChooseItem}
          >
            <Text style={{ color: "white", fontSize: 20, marginRight: 4 }}>
              {item[0].toUpperCase() + item.slice(1)}
            </Text>
            <Ionicons name="md-caret-down-outline" color="white" size={24} />
          </TouchableOpacity>
          {item === "movies" && (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={addMovie}
            >
              <Ionicons name="add-circle" color="white" size={32} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={[styles.overlay, { height: "50%", bottom: 0 }]}
      />
      <View
        style={[
          styles.overlay,
          {
            bottom: 0,
          },
        ]}
      >
        <Text style={styles.tags}>{data.tags.join(" · ")}</Text>
        <View
          style={[
            styles.action,
            {
              justifyContent: "space-around",
            },
          ]}
        >
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Ionicons name="heart-outline" color="white" size={24} />
            <Text style={{ color: "white" }}>Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Ionicons
              name="information-circle-outline"
              color="white"
              size={24}
            />
            <Text style={{ color: "white" }}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: (height * 3.6) / 5,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  tags: {
    color: theme.color.font.primary,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  action: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
