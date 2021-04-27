import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useReactiveVar } from "@apollo/client";

import { textTurncate } from "../helpers";
import theme from "../../theme";
import {
  formState,
  showBottomSheet,
  showItem,
  reFetch,
  favouritesData,
} from "../graphql/reactiveVar";
import { DELETE_MOVIE } from "../graphql/queries";

const { width } = Dimensions.get("screen");

export default function Detail({ data }) {
  const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE);
  const itemShown = useReactiveVar(showItem);
  const favourites = useReactiveVar(favouritesData);

  data = data[itemShown.slice(0, itemShown.length - 1)];

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const isFavourite =
    favourites.filter((item) => item._id === data._id).length > 0;

  const deletePressHandler = () => {
    showBottomSheet(false);
    deleteMovie({ variables: { id: data._id } });

    if (!loading) {
      reFetch(true);
      ToastAndroid.show("Delete succesfully", ToastAndroid.SHORT);
    }

    if (error) return;
  };

  const editPressHandler = () => {
    formState(true);
  };

  const favouritePressHandler = () => {
    favouritesData([data, ...favourites]);
  };

  const unFavouritePressHandler = () => {
    favouritesData(favourites.filter((item) => item._id !== data._id));
  };

  if (!data) {
    return <View></View>;
  }

  return (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <Image source={{ uri: data.poster_path }} style={styles.image} />
      <View style={{ justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title}>{textTurncate(data.title, 14)}</Text>
          <Text
            style={{ color: theme.color.font.secondary, marginVertical: 4 }}
          >
            {data.tags.slice(0, 3).join(" · ")}
          </Text>
          <Text
            style={{
              color: theme.color.font.primary,
              width: width / 1.7,
            }}
          >
            {textTurncate(data.overview, 15, "word")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isFavourite
                  ? theme.color.background.secondary
                  : theme.color.font.primary,
                flex: 2,
                borderColor: theme.color.font.primary,
                borderWidth: isFavourite ? 1 : 0,
              },
            ]}
            onPress={
              isFavourite ? unFavouritePressHandler : favouritePressHandler
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={`heart${isFavourite ? "" : "-outline"}`}
                size={24}
                color={
                  isFavourite
                    ? theme.color.font.primary
                    : theme.color.background.primary
                }
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isFavourite
                      ? theme.color.font.primary
                      : theme.color.background.primary,
                  },
                ]}
              >
                {isFavourite ? "Unf" : "F"}avourite
              </Text>
            </View>
          </TouchableOpacity>
          {itemShown === "movies" && (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={editPressHandler}
              >
                <Ionicons name="create-outline" size={24} color="yellow" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="red"
                  onPress={deletePressHandler}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width / 3,
    height: "100%",
    marginRight: 8,
    borderRadius: 10,
  },
  title: {
    color: theme.color.font.primary,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 4,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
