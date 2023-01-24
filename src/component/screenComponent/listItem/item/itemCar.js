import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import { Device, Identify } from "@Helper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ItemCar = ({ item, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("DetailItem", {
      type: item?.object_model,
      id: item?.id,
    });
  };

  const topItem = () => {
    return (
      <View style={styles.wrapTopItem}>
        <ImageApp
          source={{ uri: item?.image }}
          style={styles.image}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  const oneItemInformation = (icon, value) => {
    return (
      <View style={styles.rootOneItemInformation}>
        <View style={styles.wrapOneItemInformation}>
          <MaterialCommunityIcons name={icon} size={30} color={"#C3C3C3"} />
          <TextApp style={styles.transformText}>{value}</TextApp>
        </View>
        <SizedBox width={10} />
      </View>
    );
  };

  const nameItem = () => {
    return (
      <View style={styles.wrapNameItem}>
        <TextApp bold title style={styles.transformText}>
          {item?.title}
        </TextApp>
      </View>
    );
  };

  const informationItem = () => {
    return (
      <View style={styles.wrapInformationItem}>
        {oneItemInformation("seat-passenger", item?.passenger)}
        {oneItemInformation("car-door", item?.door)}
        {oneItemInformation("briefcase", item?.baggage)}
        {oneItemInformation("tournament", item?.gear)}
      </View>
    );
  };
  return (
    <TouchableScale onPress={() => handleNavigation()}>
      <View style={styles.wrapItem}>
        {topItem()}
        <View style={styles.wrapItemInfor}>
          <View>
            {nameItem()}
            {informationItem()}
          </View>
          <View>
            <TextApp bold>{global.language["From"]}</TextApp>
            {!Identify.isExistValue(item?.sale_price) && (
              <TextApp primary bold h8 style={styles.transformText}>
                {item?.price}
              </TextApp>
            )}
            {Identify.isExistValue(item?.sale_price) && (
              <TextApp
                medium
                button
                style={{ ...styles.salePrice, ...styles.transformText }}
              >
                {item?.price}
              </TextApp>
            )}
            {Identify.isExistValue(item?.sale_price) && (
              <TextApp primary bold h8 style={styles.transformText}>
                {item?.sale_price}
              </TextApp>
            )}
          </View>
        </View>
      </View>
    </TouchableScale>
  );
};

const sizeItem = (Device.width - 20) * 0.15;
const styles = StyleSheet.create({
  wrapItem: {
    width: Device.width - 20,
    height: 250,
    paddingVertical: 10,
    marginBottom: 15,
  },
  wrapTopItem: {
    height: 150,
    width: "100%",
  },
  image: {
    flex: 1,
  },
  rootOneItemInformation: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
  },
  wrapOneItemInformation: {
    width: sizeItem,
    height: sizeItem,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    alignItems: "center",
    borderRadius: 5,
  },
  wrapInformationItem: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
  },
  wrapNameItem: {
    paddingBottom: 10,
  },
  wrapItemInfor: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salePrice: {
    textDecorationLine: "line-through",
  },
  transformText: {
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(ItemCar);
