/** @format */

import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableScale,
  TextApp,
  ImageApp,
  SizedBox,
  IndicatorComponent,
} from "@BaseComponent";
import { getAvailableService } from "../../../../redux/detailRedux";
import PickTime from "../../listItem/filter/pickTime";
import PickGuest from "../../listItem/filter/pickGuest";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import _ from "lodash";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Device, Identify } from "@Helper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderHTML from "react-native-render-html";

const AvailableHotel = ({ type, id, navigation }) => {
  const [listAvailable, setListAvailable] = useState(null);
  const dataItem = useSelector((state) => state.detail.dataItem);
  const [extraService, setExtraService] = useState([]);
  const [listRoomSelected, setListRoomSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const refPickTime = useRef(null);
  const refPickGuest = useRef(null);

  const elementTime = {
    title: global.language["CheckInOut"],
    field: "date",
  };

  const elementGuest = {
    title: global.language["Guests"],
    field: "guests",
    field_guests: [
      {
        id: "adults",
        title: global.language["Adults"],
      },
      {
        id: "children",
        title: global.language["Children"],
      },
    ],
  };

  const initExtraService = () => {
    let extra = dataItem?.extra_price;
    _.forEach(extra, (element, index) => {
      extra[index]["number"] = 0;
      extra[index]["enable"] = 0;
      extra[index]["price_html"] = element["price"];
      extra[index]["price_type"] = "";
    });
    setExtraService(extra);
  };

  const initDataRoomAvailable = (list) => {
    let arr = [];
    _.forEach(list, (element) => {
      arr.push({
        id: element?.id,
        number_selected: 0,
        price: element?.price,
      });
    });
    setListRoomSelected(arr);
  };

  const requestData = (params) => {
    getAvailableService(type, id, params).then((res) => {
      setLoading(false);
      setListAvailable(res?.rooms);
      if (_.size(res?.rooms) > 0) {
        initDataRoomAvailable(res?.rooms);
        initExtraService();
      }
    });
  };

  const handleCheckAvailability = () => {
    let { dataSelected } = refPickTime.current?.getData();
    let { guests } = refPickGuest.current?.getData();
    if (dataSelected && dataSelected?.start_date) {
      let params = { ...dataSelected, ...guests };
      setLoading(true);
      requestData(params);
    }
  };

  const formCondition = () => {
    return (
      <View style={styles.wrapFormCondition}>
        <PickTime ref={refPickTime} element={elementTime} />
        <PickGuest ref={refPickGuest} element={elementGuest} />
        <TouchableScale onPress={() => handleCheckAvailability()}>
          <View
            style={[
              styles.wrapButtonCheckAvaibility,
              { backgroundColor: colors.primary },
            ]}
          >
            {loading ? (
              <IndicatorComponent color={"#FFFFFF"} />
            ) : (
              <TextApp bold quaternary>
                {global.language["CheckAvailability"].toUpperCase()}
              </TextApp>
            )}
          </View>
        </TouchableScale>
      </View>
    );
  };

  const increaseRoom = (item, index) => {
    let newList = [...listRoomSelected];
    newList[index]["number_selected"] =
      parseInt(newList[index]["number_selected"]) + 1;
    setListRoomSelected(newList);
  };

  const decreaseRoom = (item, index) => {
    let newList = [...listRoomSelected];
    if (parseInt(newList[index]["number_selected"]) == 0) return;
    newList[index]["number_selected"] =
      parseInt(newList[index]["number_selected"]) - 1;
    setListRoomSelected(newList);
  };
  const itemFeature = (key, value) => {
    let icon = "";
    switch (key) {
      case "children_html":
        icon = "baby";
        break;
      case "adults_html":
        icon = "human-male";
        break;
      case "size_html":
        icon = "arrow-expand-all";
        break;
      case "beds_html":
        icon = "bed";
        break;
    }
    return (
      <View style={styles.wrapItemFeature}>
        <View style={styles.wrapIconItemFeature}>
          <MaterialCommunityIcons name={icon} size={30} />
        </View>
        <RenderHTML contentWidth={Device.width} source={{ html: value }} />
      </View>
    );
  };
  const itemRoomAvailable = (item, index) => {
    return (
      <View style={styles.wrapItemRoomAvailable}>
        <ImageApp source={{ uri: item?.image }} style={styles.image} />
        <SizedBox height={5} />
        <TextApp title medium>
          {item?.title}
        </TextApp>
        <View style={styles.wrapFeature}>
          {itemFeature("size_html", item?.size_html)}
          {itemFeature("beds_html", item?.beds_html)}
          {itemFeature("adults_html", item?.adults_html)}
          {itemFeature("children_html", item?.children_html)}
        </View>
        <View style={styles.wrapPrice}>
          <TextApp>{item?.price_text}</TextApp>
          <View style={styles.wrapPlusMinus}>
            <TouchableScale onPress={() => increaseRoom(item?.id, index)}>
              <View style={styles.wrapPlus}>
                <MaterialCommunityIcons
                  name={"plus"}
                  size={22}
                  color={colors.primary}
                />
              </View>
            </TouchableScale>
            <View style={styles.wrapNumber}>
              <TextApp primary bold>
                {listRoomSelected && listRoomSelected[index]
                  ? listRoomSelected[index]["number_selected"]
                  : ""}
              </TextApp>
            </View>
            <TouchableScale onPress={() => decreaseRoom(item?.id, index)}>
              <View style={styles.wrapPlus}>
                <MaterialCommunityIcons
                  name={"minus"}
                  size={22}
                  color={colors.primary}
                />
              </View>
            </TouchableScale>
          </View>
        </View>
      </View>
    );
  };

  const listRoomAvailable = () => {
    let listRoom = [];
    _.forEach(listAvailable, (element, index) => {
      listRoom.push(
        <View key={`item_room_available_${index}`}>
          {itemRoomAvailable(element, index)}
        </View>
      );
    });
    return <View style={styles.wrapListAvailable}>{listRoom}</View>;
  };

  const handleCheck = (index) => {
    let newExtraService = [...extraService];
    newExtraService[index]["enable"] =
      newExtraService[index]["enable"] == 0 ? 1 : 0;
    setExtraService(newExtraService);
  };

  const listExtraService = () => {
    let list = [];
    _.forEach(extraService, (element, index) => {
      list.push(
        <View
          style={styles.wrapListExtraService}
          key={`item_extra_service_${index}`}
        >
          <TouchableScale onPress={() => handleCheck(index)} scaleTo={0.7}>
            <MaterialIcons
              name={
                extraService[index]["enable"] == 1
                  ? "check-box"
                  : "check-box-outline-blank"
              }
              color={
                extraService[index]["enable"] == 1
                  ? colors.primary
                  : colors.disabled
              }
              size={34}
            />
          </TouchableScale>
          <SizedBox width={5} />
          <View
            style={{
              flexDirection: global.isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "85%",
            }}
          >
            <TextApp title>{element?.name}</TextApp>
            <TextApp title>{element?.price}</TextApp>
          </View>
        </View>
      );
    });
    return (
      <View style={styles.wrapExtraService}>
        <TextApp h8 medium style={styles.titleExtraService}>
          {global.language["ExtraPrice"]}
        </TextApp>
        {list}
      </View>
    );
  };

  const handlePreviewOrder = () => {
    let { dataSelected } = refPickTime.current?.getData();
    let { guests } = refPickGuest.current?.getData();
    let params = {
      service_id: id,
      service_type: type,
      ...dataSelected,
      extra_price: extraService,
      ...guests,
      rooms: listRoomSelected,
    };
    navigation.navigate("ConfirmBooking", {
      params: params,
      dataItem: dataItem,
    });
  };

  const previewOrder = () => {
    return (
      <View>
        <TouchableScale onPress={() => handlePreviewOrder()}>
          <View
            style={[
              styles.wrapPreviewOrder,
              { backgroundColor: colors.primary },
            ]}
          >
            <TextApp quaternary bold>
              {global.language["PreviewOrder"].toUpperCase()}
            </TextApp>
          </View>
        </TouchableScale>
      </View>
    );
  };

  return (
    <View style={styles.wrapAvailableHotel}>
      {formCondition()}
      {listAvailable && listRoomAvailable()}
      {listAvailable && listExtraService()}
      {listAvailable && previewOrder()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapAvailableHotel: {
    paddingVertical: 10,
  },
  wrapFormCondition: {
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  wrapButtonCheckAvaibility: {
    marginHorizontal: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 5,
  },
  wrapListExtraService: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  wrapListAvailable: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    padding: 10,
    marginTop: 15,
  },
  wrapExtraService: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    padding: 10,
    marginTop: 15,
  },
  titleExtraService: {
    paddingVertical: 5,
    marginLeft: global.isRtl ? undefined : 10,
    marginRight: global.isRtl ? 10 : undefined,
    textAlign: global.isRtl ? "right" : "left",
  },
  wrapItemRoomAvailable: {
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: Device.width - 60,
    height: 200,
  },
  wrapPrice: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapPlusMinus: {
    width: "60%",
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  wrapPlus: {
    padding: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#4286F9",
  },
  wrapNumber: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapFeature: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapItemFeature: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  wrapIconItemFeature: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DEDEDE",
  },
  wrapPreviewOrder: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 5,
  },
});
export default React.memo(AvailableHotel);
