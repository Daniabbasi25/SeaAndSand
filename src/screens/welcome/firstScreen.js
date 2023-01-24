/** @format */

import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableScale, TextApp } from "@BaseComponent";
import { imageFirstScreen, backgroundFirstScreen } from "@Images";
import { Device } from "@Helper";

const FirstScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Image
        source={backgroundFirstScreen}
        style={styles.background}
        resizeMode={"cover"}
      />
      <Image
        source={imageFirstScreen}
        style={styles.image}
        resizeMode={"contain"}
      />
      <View>
        <TextApp primary bold h4>
          {"Ultimate"}
        </TextApp>
        <TextApp medium h6>
          {"Booking System based on Laravel"}
        </TextApp>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Device.width,
    height: Device.height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: Device.width * 0.7,
    height: Device.width * 0.7,
  },
  background: {
    position: "absolute",
    top: 0,
    right: 0,
    width: Device.width,
    height: Device.height,
  },
});

export default React.memo(FirstScreen);
