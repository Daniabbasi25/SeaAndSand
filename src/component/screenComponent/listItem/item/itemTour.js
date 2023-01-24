import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp } from "@BaseComponent";
import { Device, Identify } from "@Helper";
import { CommonStyle } from "@Style";
import { useTheme } from "react-native-paper";

const ItemTour = ({ item, navigation }) => {
  const { colors } = useTheme();
  const handleNavigation = () => {
    navigation.navigate("DetailItem", {
      type: item?.object_model,
      id: item?.id,
    });
  };

  const topItem = () => {
    return (
      <View style={styles.wrapTopItem}>
        <ImageApp source={{ uri: item?.image }} style={styles.image} />
        <View style={styles.overlay} />
        <View style={styles.wrapName}>
          <TextApp quaternary caption medium style={styles.transformText}>
            {item?.location?.name}
          </TextApp>
          <TextApp quaternary bold title style={styles.transformText}>
            {item?.title}
          </TextApp>
          <View style={styles.wrapInfor}>
            <View>
              <TextApp bold quaternary style={styles.transformText}>
                {global.language["Duration"]}: {item?.duration}
              </TextApp>
            </View>
          </View>
        </View>
        <View style={styles.wrapPrice}>
          {!Identify.isExistValue(item?.sale_price) && (
            <TextApp quaternary bold h7 style={styles.transformText}>
              {item?.price}
            </TextApp>
          )}
          {Identify.isExistValue(item?.sale_price) && (
            <TextApp
              medium
              button
              quaternary
              style={{ ...styles.salePrice, ...styles.transformText }}
            >
              {item?.price}
            </TextApp>
          )}
          {Identify.isExistValue(item?.sale_price) && (
            <TextApp quaternary bold h7 style={styles.transformText}>
              {item?.sale_price}
            </TextApp>
          )}
        </View>
        {Identify.isExistValue(item?.discount_percent) && (
          <View
            style={[styles.wrapDiscount, { backgroundColor: colors.primary }]}
          >
            <TextApp h8 medium quaternary style={styles.transformText}>
              -{item?.discount_percent}
            </TextApp>
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableScale onPress={() => handleNavigation()}>
      {topItem()}
    </TouchableScale>
  );
};

const sizeItem = Device.width - 20;
const styles = StyleSheet.create({
  wrapTopItem: {
    width: sizeItem,
    height: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    ...CommonStyle.dropShadow,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  wrapName: {
    position: "absolute",
    bottom: 20,
    left: global.isRtl ? undefined : 10,
    right: global.isRtl ? 10 : undefined,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: sizeItem,
    height: 250,
    position: "absolute",
    borderRadius: 10,
  },
  wrapInfor: {
    marginTop: 5,
  },
  wrapPrice: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  salePrice: {
    marginRight: 5,
    textDecorationLine: "line-through",
  },
  wrapDiscount: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  transformText: {
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(ItemTour);
