import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp } from "@BaseComponent";
import { Identify } from "@Helper";
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
          <TextApp quaternary caption medium style={styles.name}>
            {item?.location?.name}
          </TextApp>
          <TextApp quaternary bold title style={styles.name}>
            {item?.title}
          </TextApp>
          <View style={styles.wrapInfor}>
            <View>
              <TextApp bold quaternary style={styles.name}>
                {global.language["Duration"]}: {item?.duration}
              </TextApp>
            </View>
          </View>
        </View>
        <View style={styles.wrapPrice}>
          {!Identify.isExistValue(item?.sale_price) && (
            <TextApp quaternary bold h7 style={styles.name}>
              {item?.price}{" "}
            </TextApp>
          )}
          {Identify.isExistValue(item?.sale_price) && (
            <TextApp
              medium
              button
              quaternary
              style={{ ...styles.salePrice, ...styles.name }}
            >
              {item?.price}{" "}
            </TextApp>
          )}
          {Identify.isExistValue(item?.sale_price) && (
            <TextApp quaternary bold h7 style={styles.name}>
              {item?.sale_price}
            </TextApp>
          )}
        </View>
        {Identify.isExistValue(item?.discount_percent) && (
          <View
            style={[styles.wrapDiscount, { backgroundColor: colors.primary }]}
          >
            <TextApp h8 medium quaternary style={styles.name}>
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

const sizeItem = 300;
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
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
  },
  wrapName: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  name: {
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
    textAlign: global.isRtl ? "right" : "left",
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
});

export default React.memo(ItemTour);
