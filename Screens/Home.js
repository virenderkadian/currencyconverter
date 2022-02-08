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
  ActivityIndicator,
} from "react-native";
import colors from "../Constants/colors";
import { ConversionContext } from "../utils/conversionContext";
import { ConversionInputs } from "../components/ConversionInpts";
import { Button } from "../components/Button";
import { format } from "date-fns";
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
  text: {
    textAlign: "center",
    color: colors.whiteText,
  },
  header: {
    alignItems: "flex-end",
    position: "relative",
    marginHorizontal: 20,
  },
  optionText: {},
});

window.location = "currencyconverter://";
export default ({ navigation }) => {
  const [value, setValue] = useState("100");

  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  } = useContext(ConversionContext);

  const conversionRate = rates[quoteCurrency];

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [data, setData] = useState(null);
  const [Id, setId] = useState(null);

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }
  console.log(Id, "ID");
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
          <TouchableOpacity onPress={() => navigation.push("Options")}>
            <Entypo name="cog" size={32} color={colors.whiteText} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Text>{Id ? JSON.stringify(Id) : "not thru deep link"}</Text>
          {/* <Text>{query.get("hostname")}</Text> */}
        </View>
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
        {isLoading ? (
          <ActivityIndicator color={colors.white} size="large" />
        ) : (
          <>
            <ConversionInputs
              text={baseCurrency}
              value={value}
              onButtonPress={() =>
                navigation.push("CurrencyList", {
                  title: "Base Currency",

                  isBaseCurrency: true,
                })
              }
              onChangeText={(text) => setValue(text)}
              keyboardType="numeric"
            />
            <ConversionInputs
              text={quoteCurrency}
              value={
                value && `${(parseFloat(value) * conversionRate).toFixed(3)}`
              }
              editable={false}
              onButtonPress={() =>
                navigation.push("CurrencyList", {
                  title: "Quote Currency",
                  isBaseCurrency: false,
                })
              }
            />
            <Text
              style={styles.text}
            >{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
              date && format(new Date(date), "do MMMM , yyyy ")
            }.`}</Text>
            <Button
              onPress={() => swapCurrencies()}
              text="Reverse Currencies"
            />
          </>
        )}
        <View style={{ height: screen.height * 0.33 }} />
      </ScrollView>
    </View>
  );
};
