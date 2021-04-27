import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReactiveVar, useLazyQuery } from "@apollo/client";

import theme from "../../theme";
import Detail from "./Detail";
import Form from "./Form";
import {
  showBottomSheet,
  detailId,
  formState,
  showItem,
} from "../graphql/reactiveVar";
import { GET_DETAIL_MOVIE, GET_DETAIL_SERIE } from "../graphql/queries";

const { width, height } = Dimensions.get("screen");

export default function BottomSheet() {
  const [
    getDetailMovie,
    { loading: loadingMovie, data: dataMovie },
  ] = useLazyQuery(GET_DETAIL_MOVIE);
  const [
    getDetailSerie,
    { loading: loadingSerie, data: dataSerie },
  ] = useLazyQuery(GET_DETAIL_SERIE);
  const [alignment] = useState(new Animated.Value(0));
  const id = useReactiveVar(detailId);
  const isShow = useReactiveVar(showBottomSheet);
  const isForm = useReactiveVar(formState);
  const itemShown = useReactiveVar(showItem);

  const bottomSheetHeight = isForm ? 1 : 2.4;

  const show = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const hide = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const interpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / bottomSheetHeight, 0],
  });

  const bottomSheetStyle = {
    bottom: interpolate,
  };

  useEffect(() => {
    if (isShow) {
      show();

      id &&
        itemShown === "movies" &&
        getDetailMovie({
          variables: { id },
        });

      id &&
        itemShown === "series" &&
        getDetailSerie({
          variables: { id },
        });

      if (loadingMovie || loadingSerie) {
        return <Text>Still loading...</Text>;
      }
    } else {
      hide();
      formState(false);
      detailId(null);
    }
  }, [isShow, id, itemShown]);

  return (
    <Animated.View
      style={[
        styles.container,
        bottomSheetStyle,
        {
          height: height / (bottomSheetHeight + 0.6),
        },
      ]}
    >
      {!isForm && itemShown === "movies" && dataMovie && (
        <Detail data={dataMovie} />
      )}
      {!isForm && itemShown === "series" && dataSerie && (
        <Detail data={dataSerie} />
      )}
      {isForm && <Form passedData={id ? dataMovie : {}} />}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => showBottomSheet(false)}
      >
        <Ionicons name="close-outline" size={32} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background.secondary,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  closeIcon: {
    position: "absolute",
    top: "5%",
    right: "3%",
  },
});
