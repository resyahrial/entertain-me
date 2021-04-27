import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useMutation, useReactiveVar } from "@apollo/client";

import theme from "../../theme";
import Input from "./Input";
import { UPDATE_MOVIE, ADD_MOVIE } from "../graphql/queries";
import { showBottomSheet, reFetch } from "../graphql/reactiveVar";

export default function Form({ passedData }) {
  const [
    updateMovie,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_MOVIE);
  const [addMovie, { loading: addLoading, error: addError }] = useMutation(
    ADD_MOVIE
  );
  const isShow = useReactiveVar(showBottomSheet);

  const [dataForm, setDataForm] = useState({
    title: passedData?.movie?.title || "",
    overview: passedData?.movie?.overview || "",
    poster_path: passedData?.movie?.poster_path || "",
    popularity: passedData?.movie?.popularity
      ? `${passedData.movie.popularity}`
      : "",
    tags: passedData?.movie?.tags ? passedData.movie.tags.join(", ") : "",
  });

  const changeHandler = (text, name) => {
    setDataForm({
      ...dataForm,
      [name]: text,
    });
  };

  const submitHandler = () => {
    const movieInput = {
      ...dataForm,
      popularity: +dataForm.popularity,
      tags: dataForm.tags.split(",").map((tag) => tag.trim()),
    };

    if (Object.keys(passedData).length > 0) {
      updateMovie({
        variables: {
          id: passedData.movie._id,
          movieInput,
        },
      });
    } else {
      addMovie({
        variables: {
          movieInput,
        },
      });
    }

    if (!updateLoading || !addLoading) {
      showBottomSheet(false);

      ToastAndroid.show(
        Object.keys(passedData).length > 0
          ? "Update Successfully"
          : "Add Movie Succesfully",
        ToastAndroid.SHORT
      );

      reFetch(true);
    }
  };

  useEffect(() => {
    if (!isShow) {
      setDataForm({
        ...dataForm,
        title: "",
        overview: "",
        poster_path: "",
        popularity: "",
        tags: "",
      });
    }
  }, [isShow]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: theme.color.font.primary,
          fontSize: 28,
          fontWeight: "bold",
          marginVertical: 8,
          marginLeft: 4,
        }}
      >
        {Object.keys(passedData).length > 0 ? "Edit" : "Add"} Movie
      </Text>
      <ScrollView>
        <Input
          name="title"
          value={dataForm.title}
          onChangeText={(text) => changeHandler(text, "title")}
        />
        <Input
          name="overview"
          value={dataForm.overview}
          onChangeText={(text) => changeHandler(text, "overview")}
          multiline={true}
        />
        <Input
          name="poster_path"
          value={dataForm.poster_path}
          onChangeText={(text) => changeHandler(text, "poster_path")}
        />
        <Input
          name="popularity"
          value={dataForm.popularity}
          onChangeText={(text) => changeHandler(text, "popularity")}
        />
        <Input
          name="tags"
          value={dataForm.tags}
          onChangeText={(text) => changeHandler(text, "tags")}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.color.font.primary,
            marginVertical: 8,
            borderRadius: 8,
            paddingVertical: 8,
          }}
          onPress={submitHandler}
        >
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
