import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import TitleBlock from "./titleBlock";
import { CommonStyle } from "@Style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StarRating from "react-native-star-rating";
import { Identify } from "@Helper";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

const Related = ({ data }) => {
  return (
    <>
      <TitleBlock
        title={global.language["Related"].toUpperCase()}
        style={styles.paddingTitle}
      />
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <ItemRelated item={item} />}
        keyExtractor={(item) => `item_related_${item?.id}`}
        ItemSeparatorComponent={() => <SizedBox width={15} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={{ transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }] }}
      />
    </>
  );
};

const ItemRelated = ({ item }) => {
  const navigation = useNavigation();
  const handleOpenItem = () => {
    navigation.dispatch(
      StackActions.replace("DetailItem", {
        type: item?.object_model,
        id: item?.id,
      })
    );
  };

  return (
    <TouchableScale onPress={() => handleOpenItem()}>
      <View style={styles.wrapItemRelated}>
        <ImageApp
          source={{ uri: item?.image }}
          style={styles.imageItemRelated}
        />
        <View style={styles.markerLocation}>
          <MaterialCommunityIcons
            name={"map-marker-radius"}
            size={18}
            color={"#FFFFFF"}
          />
          <SizedBox width={5} />
          <TextApp bold quaternary style={styles.transformText}>
            {item?.location?.name}
          </TextApp>
        </View>
        <View style={styles.wrapInformation}>
          <TextApp medium numberOfLines={1} style={styles.transformText}>
            {item?.title}
          </TextApp>
          <View style={styles.wrapScore}>
            <TextApp caption style={styles.transformText}>
              {item?.review_score?.review_text}
            </TextApp>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={Number(item?.review_score?.score_total)}
              fullStarColor={"#FDCC0D"}
              starSize={12}
              containerStyle={{ marginHorizontal: 3 }}
            />
          </View>
          {Identify.isExistValue(item?.sale_price) && (
            <TextApp
              primary
              bold
              style={{ textAlign: "right", ...styles.transformText }}
            >
              <TextApp
                caption
                style={{ ...styles.sale_price, ...styles.transformText }}
              >
                {item?.price}{" "}
              </TextApp>
              {item?.sale_price}
            </TextApp>
          )}
          {!Identify.isExistValue(item?.sale_price) && (
            <TextApp
              primary
              bold
              style={{ textAlign: "right", ...styles.transformText }}
            >
              {item?.price}
            </TextApp>
          )}
        </View>
      </View>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  paddingTitle: {
    paddingVertical: 15,
  },
  wrapItemRelated: {
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    height: 230,
    width: 300,
    ...CommonStyle.dropShadow,
  },
  imageItemRelated: {
    width: 300,
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  contentContainerStyle: {
    padding: 3,
    paddingBottom: 5,
  },
  wrapInformation: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 220,
    alignItems: "flex-start",
  },
  markerLocation: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#FA8548",
    position: "absolute",
    left: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  wrapScore: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "flex-start",
    paddingVertical: 3,
  },
  sale_price: {
    textDecorationLine: "line-through",
  },
  transformText: {
    transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(Related);
