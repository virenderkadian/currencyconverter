import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import colors from "../Constants/colors";
import { ConversionContext } from "../utils/conversionContext";
import { Entypo } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    //justifyContent: "center",
  },
  statusBar: {
    backgroundColor: colors.statusbar,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.height * 0.25,
  },
  logoBackground: {
    width: screen.width * 0.35,
    height: screen.height * 0.35,
  },
  headerText: {
    marginVertical: 20,
    color: colors.white,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  deepLink: {
    marginVertical: 20,
    color: colors.white,
    textAlign: "center",
    fontSize: 30,
    borderColor: colors.border,
  },
  text: {
    textAlign: "center",
    color: colors.whiteText,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    //position: "relative",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  optionText: {},
});
export default ({ navigation }) => {
  const [data, setData] = useState(null);
  const [Id, setId] = useState(null);

  const { quoteCurrency, rates } = useContext(ConversionContext);

  const conversionRate = rates[quoteCurrency];

  const [scrollEnabled, setScrollEnabled] = useState(false);

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setScrollEnabled(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setScrollEnabled(false);
    });
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      console.log(initialURL, " : initial url");

      if (initialURL) {
        const { path, queryParams } = Linking.parse(initialURL);
        setId(queryParams);
        setData(Linking.parse(initialURL));
      }
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }
    return () => {
      showListener.remove();
      hideListener.remove();

      Linking.removeEventListener("url");
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusbar}
        />
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push("Home")}>
            <Entypo name="link" size={32} color={colors.whiteText} />
            <Text>Deep link to Home Screen</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push("Options")}>
            <Entypo name="link" size={32} color={colors.whiteText} />
            <Text>Deep link to Options Screen</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.logoContainer}>
          <Image
            source={require("../Assests/images/background.png")}
            style={styles.logoBackground}
            resizeMode="contain"
          />
          <Image
            source={require("../Assests/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerText}>Currency Converter</Text>
        {/* <Text>InitialURL {data} </Text> */}
        <Text>
          Id {Id ? JSON.stringify(Id) : "Not received from deep link"}{" "}
        </Text>
        <View style={{ height: screen.height * 0.33 }} />
      </ScrollView>
    </View>
  );
};
