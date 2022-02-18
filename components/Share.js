import React from "react";
import { Share, View, Button } from "react-native";

export const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Check out my app",
        message:
          "Check out my app \n" +
          "https://y7zgnxfk9k.execute-api.ap-south-1.amazonaws.com/Prod1?screen=c&&id=100",
        // message: "Check out my app",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log("Sharing");
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
