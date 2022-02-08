import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import colors from "../Constants/colors";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.bluebackLight,
    borderTopLeftRadius: 8,
    borderBottomStartRadius: 8,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
  },

  button: {
    backgroundColor: colors.blueback,
    padding: 8,
    borderTopLeftRadius: 8,
    borderBottomStartRadius: 8,
  },

  buttonText: {
    fontSize: 20,
    color: colors.text,
  },
  textInput: {
    color: colors.textLight,
    padding: 8,
    flex: 1,
  },
  containerDisabled: {
    backgroundColor: colors.brightred,
  },
  separator: {
    backgroundColor: colors.background,
    width: StyleSheet.hairlineWidth,
  },
});

export const ConversionInputs = ({ text, onButtonPress, ...props }) => {
  const containerStyles = [styles.textInput];
  if (props.editable === false) {
    containerStyles.push(styles.containerDisabled);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
};
