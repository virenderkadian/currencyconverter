import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import colors from "../Constants/colors";

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginTop: 8,
  },
  logo: {
    margin: 15,
    width: 25,
    height: 25,
  },
  text: {
    margin: 1,
    fontSize: 20,
    color: colors.white,
  },
});

export const Button = ({ onPress, text }) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image
          source={require("../Assests/images/reverse.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
