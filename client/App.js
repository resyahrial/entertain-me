import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloProvider } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";

import client from "./src/graphql/config";
import theme from "./theme";
import { Home, Favourites } from "./src/screens";
import { BottomSheet, ItemChoice } from "./src/components";

const Tab = createBottomTabNavigator();

export default function App() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Favourites") {
        iconName = focused ? "bookmark" : "bookmark-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  const tabBarOptions = {
    activeTintColor: theme.color.font.primary,
  };

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
      </NavigationContainer>
      <BottomSheet />
    </ApolloProvider>
  );
}
