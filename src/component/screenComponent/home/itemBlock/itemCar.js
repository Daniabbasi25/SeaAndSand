import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp } from "@BaseComponent";
import { Device, Identify } from "@Helper";
import { CommonStyle } from "@Style";

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
          resizeMode={"cover"}
        />
        {information()}
        {price()}
      </View>
    );
  };

  const information = () => {
    return (
      <View style={styles.information}>
        <TextApp bold title quaternary style={styles.transformText}>
          {item?.title}
        </TextApp>
      </View>
    );
  };

  const price = () => {
    return (
      <View style={styles.price}>
        {!Identify.isExistValue(item?.sale_price) && (
          <TextApp quaternary bold h8 style={styles.transformText}>
            {item?.price}
          </TextApp>
        )}
        {Identify.isExistValue(item?.sale_price) && (
          <TextApp
            quaternary
            medium
            body
            style={{ ...styles.salePrice, ...styles.transformText }}
          >
            {item?.price}
          </TextApp>
        )}
        {Identify.isExistValue(item?.sale_price) && (
          <TextApp quaternary bold h8 style={styles.transformText}>
            {item?.sale_price}
          </TextApp>
        )}
      </View>
    );
  };
  return (
    <TouchableScale onPress={() => handleNavigation()}>
      <View style={styles.wrapItem}>{topItem()}</View>
    </TouchableScale>
  );
};

const sizeItem = (Device.width - 20) * 0.15;
const styles = StyleSheet.create({
  wrapItem: {
    width: Device.width - 30,
    height: 250,
    paddingVertical: 10,
    marginBottom: 15,
  },
  wrapTopItem: {
    height: 220,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    ...CommonStyle.dropShadow,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
  information: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 9999,
    bottom: 0,
    paddingHorizontal: 5,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rootOneItemInformation: {
    flexDirection: "row",
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
    flexDirection: "row",
  },
  wrapNameItem: {
    paddingBottom: 10,
  },
  wrapItemInfor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salePrice: {
    textDecorationLine: "line-through",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 9999,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  transformText: {
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(ItemCar);
