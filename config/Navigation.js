import React from "react";
import Constants, { AppOwnership } from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";
import Options from "../Screens/Options";
import CurrencyList from "../Screens/CurrencyList";
import Links from "../Screens/Linking";

import { ConversionContextProvider } from "../utils/conversionContext";
const isStandalone = Constants.appOwnership === AppOwnership.Standalone;
const MainStack = createStackNavigator();

// const prefix = Linking.createURL(isStandalone ? "" : "/");
const prefix = "currencyconverter://";
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: {
        path: "a",
      },
      Options: {
        path: "b",
      },
      Links: {
        path: "c",
      },
    },
  },
};
console.log(linking, "Linking");

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Options" component={Options} />
    <MainStack.Screen
      name="CurrencyList"
      component={CurrencyList}
      options={({ route }) => ({
        title: route.params.title,
      })}
    />
    <MainStack.Screen name="Links" component={Links} />
  </MainStack.Navigator>
);

export default () => (
  <NavigationContainer linking={linking} uriPrefix={prefix}>
    <ConversionContextProvider>
      <MainStackScreen />
    </ConversionContextProvider>
  </NavigationContainer>
);
