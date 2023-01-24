/** @format */

import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TouchableScale, SizedBox, TextApp } from "@BaseComponent";
import { Images } from "@Assets";
import { Card, useTheme } from "react-native-paper";
import { Device } from "@Helper";

const ListCategory = ({ navigation }) => {
  const listCategory = useSelector(
    (state) => state.app.appConfig?.booking_types
  );
  const headerList = () => {
    return (
      <View style={styles.header}>
        <TextApp primary bold h6>
          {global.language["Category"]}
        </TextApp>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.keys(listCategory)}
      renderItem={({ item }) => (
        <ItemCategory
          item={item}
          listCategory={listCategory}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => `item_category_${item?.name}_${index}`}
      ItemSeparatorComponent={() => <SizedBox height={15} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatList}
      ListHeaderComponent={() => headerList()}
    />
  );
};

const ItemCategory = ({ item, listCategory, navigation }) => {
  const { deviceSize } = useTheme();
  const handleStaticImage = (key) => {
    switch (key) {
      case "hotel":
        return Images.hotelCategoryImage;
      case "car":
        return Images.carCategoryImage;
      case "event":
        return Images.eventCategoryImage;
      case "space":
        return Images.spaceCategoryImage;
      case "tour":
        return Images.tourCategoryImage;
      case "boat":
        return Images.boatCategoryImage;
      case "flight":
        return Images.flightCategoryImage;
      default:
        return Images.hotelCategoryImage;
    }
  };
  const handleNavigation = () => {
    navigation.navigate("ListItem", { name: item });
  };

  return (
    <TouchableScale scaleTo={0.96} onPress={() => handleNavigation()}>
      <Card
        elevation={5}
        style={{ width: deviceSize.width * 0.95, borderRadius: 15 }}
      >
        <View style={styles.viewItem}>
          <View style={styles.overlay} />
          <Image
            source={handleStaticImage(item)}
            style={[styles.image, { width: deviceSize.width * 0.95 }]}
            resizeMode={"cover"}
          />
          <TextApp bold tertiary h6 style={styles.nameItem}>
            {listCategory[item].name}
          </TextApp>
        </View>
      </Card>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 70,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  touchable: {},
  viewItem: {
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 9,
    width: Device.width * 0.95,
  },
  image: {
    height: 140,
  },
  nameItem: {
    position: "absolute",
    left: global.isRtl ? undefined : 10,
    right: global.isRtl ? 10 : undefined,
    bottom: 15,
    color: "#FFFFFF",
    zIndex: 999,
  },
  header: {
    paddingBottom: 10,
    marginTop: 5,
    alignItems: global.isRtl ? "flex-end" : "flex-start",
  },
  transformText: {
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
    textAlign: global.isRtl ? "right" : "left",
  },
});
export default React.memo(ListCategory);
