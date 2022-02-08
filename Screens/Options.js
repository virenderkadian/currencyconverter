import React from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../Constants/colors";
import { Rowitem, RowSeparator } from "../components/Rowitem";
import { ShareExample } from "../components/Share";

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert("Something went wrong");
  });
};

const styles = StyleSheet.create({
  va: {
    backgroundColor: colors.background,
    flex: 1,
  },
  icon: {
    color: colors.whiteText,
  },
});

export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.va}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusbar} />
      <ScrollView>
        <Rowitem
          onPress={() => navigation.push("Links")}
          text={"Themes"}
          rightIcon={
            <Entypo
              style={styles.icon}
              name="chevron-right"
              size={20}
              color={colors.blueback}
            />
          }
        />
        <RowSeparator />
        <Rowitem
          onPress={() =>
            openUrl(
              "https://learn.reactnativeschool.com/courses/enrolled/175915"
            )
          }
          text={"React Native Basics"}
          rightIcon={<Entypo style={styles.icon} name="export" size={20} />}
        />

        <RowSeparator />
        <Rowitem
          onPress={() => openUrl("https://reactnativebyexample.com")}
          text={"React Native by Example"}
          rightIcon={<Entypo style={styles.icon} name="export" size={20} />}
        />
        <ShareExample />
      </ScrollView>
    </SafeAreaView>
  );
};

{
  /* <TouchableOpacity style={styles.row}>
        <Text style={styles.text}>Themes</Text>
        <Entypo style={styles.icon} name="chevron-right" size={20}/>
      </TouchableOpacity> */
}
