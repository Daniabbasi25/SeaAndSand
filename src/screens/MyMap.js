/** @format */

import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MyMap = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      {/* <Text>HI</Text> */}
    </View>
  );
};

export default MyMap;
