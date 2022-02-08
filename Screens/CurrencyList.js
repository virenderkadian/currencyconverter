import React, { useContext } from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import currencies from "../data/currencies.json";
import colors from "../Constants/colors";
import { Rowitem, RowSeparator } from "../components/Rowitem";
import { ConversionContext } from "../utils/conversionContext";

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    backgroundColor: colors.blueback,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation, route = {} }) => {
  const insets = useSafeArea();

  const params = route.params || {};
  const { isBaseCurrency } = params;

  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } =
    useContext(ConversionContext);

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusbar} />
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          // const selected = params.activeCurrency === item;
          let selected = false;
          if (isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!isBaseCurrency && item === quoteCurrency) {
            selected = true;
          }
          return (
            <View>
              <Rowitem
                text={item}
                onPress={() => {
                  if (isBaseCurrency) {
                    setBaseCurrency(item);
                  } else {
                    setQuoteCurrency(item);
                  }
                  navigation.pop();
                }}
                rightIcon={
                  selected && (
                    <View style={styles.icon}>
                      <Entypo name="check" size={20} color={colors.white} />
                    </View>
                  )
                }
              />
              <RowSeparator />
            </View>
          );
        }}
        keyExtractor={(item) => item}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};
