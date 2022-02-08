import React from "react";
import { Share, View, Button } from "react-native";

export const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out my app",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};
