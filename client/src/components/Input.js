import React from "react";
import { TextInput } from "react-native";

import theme from "../../theme";

export default function Form({ name, value, onChangeText, multiline }) {
  const parsedName = name
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <TextInput
      style={{
        height: multiline ? 80 : 40,
        textAlignVertical: multiline ? "top" : "center",
        borderColor: theme.color.font.secondary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: theme.color.font.primary,
        fontSize: 20,
        marginVertical: 8,
        lineHeight: 40,
      }}
      onChangeText={(text) => onChangeText(text)}
      value={value}
      placeholder={parsedName}
      placeholderTextColor={theme.color.font.secondary}
      multiline={multiline}
      numberOfLines={2}
    />
  );
}
