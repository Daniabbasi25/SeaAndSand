/** @format */

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TextApp, SizedBox } from "@BaseComponent";
import {
  ItemHotel,
  ItemLocation,
  ItemTour,
  ItemSpace,
  ItemCar,
  ItemEvent,
  ItemTestimonial,
} from "./itemBlock";
import _ from "lodash";

const DynamicBlockHome = ({ navigation, data }) => {
  const checkData = () => {
    if (data?.model?.data) {
      return data?.model?.data;
    } else if (data?.model?.list_item) {
      return data?.model?.list_item;
    } else {
      return [];
    }
  };
  const handleItemBlock = (item) => {
    switch (data?.type) {
      case "list_hotel":
        return <ItemHotel navigation={navigation} item={item} />;
      case "list_locations":
        return <ItemLocation navigation={navigation} item={item} />;
      case "list_tours":
        return <ItemTour navigation={navigation} item={item} />;
      case "list_space":
        return <ItemSpace navigation={navigation} item={item} />;
      case "list_car":
        return <ItemCar navigation={navigation} item={item} />;
      case "list_event":
        return <ItemEvent navigation={navigation} item={item} />;
      case "testimonial":
        return <ItemTestimonial navigation={navigation} item={item} />;
    }
  };
  const listData = checkData();
  return (
    <View style={styles.wrapDynamicBlockHome}>
      {!_.isEmpty(data?.model?.title) && (
        <TextApp bold h7 primary style={styles.wrapTitle}>
          {data?.model?.title}
          {/* Top */}
        </TextApp>
      )}

      <SizedBox height={2} />
      {!_.isEmpty(data?.model?.desc) && (
        <TextApp bold caption textSecondary style={styles.wrapTitle}>
          {data?.model?.desc}
        </TextApp>
      )}
      <FlatList
        horizontal
        data={listData}
        renderItem={({ item, index }) => handleItemBlock(item)}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <SizedBox width={15} />}
        keyExtractor={(item, index) =>
          `item_block_index_${item?.type}_${index}`
        }
        contentContainerStyle={styles.flatList}
        style={{ transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapDynamicBlockHome: {
    marginVertical: 10,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  flatList: {
    paddingVertical: 25,
    paddingHorizontal: 3,
  },
  wrapTitle: {
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(DynamicBlockHome);
