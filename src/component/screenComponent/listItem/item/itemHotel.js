import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import { Device, Identify } from "@Helper";

const ItemHotel = ({ navigation, item }) => {
  const openDetail = () => {
    navigation.navigate("DetailItem", {
      type: item?.object_model,
      id: item?.id,
    });
  };

  const aboveContent = () => (
    <View style={styles.wrapAboveContent}>
      <ImageApp
        source={{ uri: item?.image }}
        style={styles.imageAboveContent}
      />
      <View style={styles.markerLocation}>
        <MaterialCommunityIcons
          name={"map-marker-radius"}
          size={18}
          color={"#FFFFFF"}
        />
        <SizedBox width={5} />
        <TextApp bold quaternary>
          {item?.location?.name}
        </TextApp>
      </View>
      <View style={styles.rating}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={Number(item?.review_score?.score_total)}
          fullStarColor={"#FDCC0D"}
          starSize={18}
        />
      </View>
    </View>
  );
  const bellowContent = () => (
    <View style={styles.wrapBellowContent}>
      <TextApp bold body numberOfLines={2} style={styles.transformText}>
        {item?.title}
      </TextApp>
      <SizedBox height={5} />
      <View style={styles.priceAndRate}>
        <TextApp caption style={styles.transformText}>
          {item?.review_score?.total_review > 1
            ? `${item?.review_score?.total_review} Reviews`
            : `${item?.review_score?.total_review} Review`}
        </TextApp>
        <TextApp
          medium
          caption
          primary
          style={styles.transformText}
        >{`${item?.review_score?.score_total}/5 ${item?.review_score?.review_text}`}</TextApp>
      </View>
      <SizedBox height={5} />
      <TextApp button style={styles.transformText}>
        {global.language["From"]}{" "}
        <TextApp bold style={styles.transformText}>
          {item?.price}
        </TextApp>
        /{global.language["Night"]}
      </TextApp>
    </View>
  );
  return (
    <TouchableScale onPress={() => openDetail()}>
      <View style={styles.wrapItemHotel}>
        {aboveContent()}
        {bellowContent()}
      </View>
    </TouchableScale>
  );
};
const sizeItem = Device.width - 30;
const styles = StyleSheet.create({
  wrapItemHotel: {
    width: sizeItem,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    marginVertical: 7,
  },
  wrapAboveContent: {
    width: sizeItem,
    height: 150,
    overflow: "hidden",
  },
  wrapBellowContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageAboveContent: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  markerLocation: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#FA8548",
    position: "absolute",
    left: global.isRtl ? undefined : 0,
    right: global.isRtl ? 0 : undefined,
    borderBottomRightRadius: global.isRtl ? undefined : 10,
    borderTopLeftRadius: global.isRtl ? undefined : 10,
    borderBottomLeftRadius: global.isRtl ? 10 : undefined,
    textAlign: global.isRtl ? "right" : "left",
  },
  rating: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "transparent",
  },
  priceAndRate: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rate: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
  },
  transformText: {
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(ItemHotel);
