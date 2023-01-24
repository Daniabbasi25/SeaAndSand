import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import _ from "lodash";
import { CommonStyle } from "@Style";
import { Identify } from "@Helper";
import StarRating from "react-native-star-rating";

const IteamSearch = ({ navigation, item }) => {
  const handleOpenDetail = () => {
    navigation.navigate("DetailItem", {
      type: item?.object_model,
      id: item?.id,
    });
  };

  return (
    <TouchableScale onPress={() => handleOpenDetail()}>
      <View style={styles.wrapItemSearch}>
        <ImageApp source={{ uri: item?.image }} style={styles.image} />
        <View style={styles.wrapRight}>
          <View style={styles.tag}>
            <TextApp bold button quaternary>
              {Identify.upperCaseFirstCharacter(item?.object_model)}
            </TextApp>
          </View>
          <TextApp medium numberOfLines={2}>
            {item?.title}
          </TextApp>
          <View style={styles.moreInfo}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={Number(item?.review_score?.score_total)}
              fullStarColor={"#FDCC0D"}
              starSize={18}
            />
            <View>
              {Number(item?.sale_price) == 0 && (
                <TextApp>{item?.price}</TextApp>
              )}
              {Number(item?.sale_price) > 0 && (
                <TextApp button style={styles.textSale}>
                  ${item?.price}
                </TextApp>
              )}
              {Number(item?.sale_price) > 0 && (
                <TextApp bold primary title>
                  ${item?.sale_price}
                </TextApp>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  wrapItemSearch: {
    padding: 0.5,
    backgroundColor: "#FFF",
    ...CommonStyle.dropShadow,
    flexDirection: global.isRtl ? "row-reverse" : "row",
    borderRadius: 10,
    height: 115,
  },
  image: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  wrapRight: {
    alignItems: "flex-start",
    paddingVertical: 5,
    width: "70%",
    paddingHorizontal: 10,
  },
  tag: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: "#FA8548",
    borderRadius: 5,
    marginBottom: 5,
  },
  moreInfo: {
    width: "100%",
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 10,
  },
  textSale: {
    textDecorationLine: "line-through",
  },
});
export default React.memo(IteamSearch);
