import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
} from "react-native";
import colors from "../Constants/colors";
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    color: colors.text,
  },
  icon: {
    color: colors.text,
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});
export const Rowitem = ({ text, rightIcon, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {/* <Entypo style={styles.icon} name="chevron-right" size={20} /> */}
      {rightIcon}
    </TouchableOpacity>
  );
};
export const RowSeparator = () => {
  return <View style={styles.separator} />;
};
