import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableScale,
  TextApp,
  IndicatorComponent,
  SizedBox,
} from "@BaseComponent";
import { useTheme } from "react-native-paper";
import { getAvailableService } from "../../../../redux/detailRedux";
import { defaultParamsCheckAvailableTour } from "../../../../config/params/defaultParams";
import SinglePickTime from "./singlePickTime";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonStyle } from "@Style";
import { useSelector } from "react-redux";
import _ from "lodash";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Identify } from "@Helper";

const AvailableTour = ({ type, id, navigation }) => {
  const [params, setParams] = useState(defaultParamsCheckAvailableTour);
  const [listAvailable, setListAvailable] = useState(null);
  const refPickTime = useRef(null);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [needShowPreOrder, setNeedShowPreOrder] = useState(false);
  const dataItem = useSelector((state) => state.detail.dataItem);

  const onChangeValue = () => {
    setNeedShowPreOrder(false);
  };

  const handleCheckAvailability = () => {
    let { dataSelected } = refPickTime?.current?.getData();
    if (!dataSelected?.start_date) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: global.language["PleaseSelectStartDate"],
        visibilityTime: 3000,
      });
    }
    setLoading(true);
    let paramsPost = {
      id: id,
      start: dataSelected?.start_date,
      end: dataSelected?.start_date,
      for_single: 1,
    };
    getAvailableService(type, id, paramsPost).then((res) => {
      setLoading(false);
      if (res && _.size(res) > 0) {
        setListAvailable(res);
        setNeedShowPreOrder(true);
        let newParams = { ...params };
        newParams["person_types"] = res[0]["person_types"];
        newParams["extra_price"] = dataItem["extra_price"];
        newParams["start_date"] = dataSelected?.start_date;
        newParams["service_id"] = id;
        setParams(newParams);
      }
    });
  };

  const formCondition = () => {
    return (
      <View style={styles.wrapFormCondition}>
        <SinglePickTime ref={refPickTime} trigger={() => onChangeValue()} />
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

  const handlePlus = (index) => {
    let newParams = { ...params };
    let itemOption = newParams?.person_types[index];
    let newNumber = Number(itemOption?.number) + 1;
    if (newNumber > Number(itemOption?.max)) return;
    itemOption["number"] = newNumber.toString();
    newParams["person_types"][index] = itemOption;
    setParams(newParams);
  };

  const handleMinus = (index) => {
    let newParams = { ...params };
    let itemOption = newParams?.person_types[index];
    let newNumber = Number(itemOption?.number) - 1;
    if (newNumber < Number(itemOption?.min)) return;
    itemOption["number"] = newNumber.toString();
    newParams["person_types"][index] = itemOption;
    setParams(newParams);
  };

  const itemPick = (element, index) => {
    return (
      <View key={`item_pick_${index}`} style={styles.wrapItemPick}>
        <View style={styles.wrapName}>
          <TextApp bold primary title>
            {element?.name}
          </TextApp>
          <TextApp medium button textSecondary>
            {element?.desc}
          </TextApp>
          <TextApp medium button textSecondary>
            {element?.display_price} {global.language["PerPerson"]}
          </TextApp>
        </View>
        <View style={styles.wrapPlusMinus}>
          <TouchableScale onPress={() => handlePlus(index)}>
            <View style={styles.wrapPlus}>
              <MaterialCommunityIcons name={"plus"} size={26} />
            </View>
          </TouchableScale>
          <View style={styles.wrapNumber}>
            <TextApp primary bold>
              {params?.person_types &&
                _.size(params?.person_types) &&
                params?.person_types[index]["number"]}
            </TextApp>
          </View>
          <TouchableScale onPress={() => handleMinus(index)}>
            <View style={styles.wrapPlus}>
              <MaterialCommunityIcons name={"minus"} size={26} />
            </View>
          </TouchableScale>
        </View>
      </View>
    );
  };
  const handleCheck = (index) => {
    let newParams = { ...params };
    let itemOption = newParams?.extra_price[index];
    if (!itemOption?.number || itemOption?.number == "0") {
      itemOption["number"] = "1";
      itemOption["enable"] = "1";
      itemOption["price_html"] = `$100`;
      itemOption["price_type"] = "";
    } else {
      itemOption["number"] = "0";
      itemOption["enable"] = "0";
      itemOption["price_html"] = `$100`;
      itemOption["price_type"] = "";
    }
    newParams["extra_price"][index] = itemOption;
    setParams(newParams);
  };
  const listExtraService = () => {
    let list = [];
    _.forEach(params?.extra_price, (element, index) => {
      list.push(
        <View
          style={styles.wrapListExtraService}
          key={`item_extra_service_${index}`}
        >
          <TouchableScale onPress={() => handleCheck(index)} scaleTo={0.7}>
            <MaterialIcons
              name={
                params?.extra_price[index]["number"] == "1"
                  ? "check-box"
                  : "check-box-outline-blank"
              }
              color={
                params?.extra_price[index]["number"] == "1"
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
          {global.language["ExtraPrice"]}*
        </TextApp>
        {list}
      </View>
    );
  };

  const listOptionAvailable = () => {
    let listPick = [];
    listAvailable &&
      _.size(listAvailable) > 0 &&
      _.forEach(listAvailable[0]?.person_types, (element, index) => {
        listPick.push(itemPick(element, index));
      });
    return (
      <View style={styles.wrapListAvailable}>
        <View style={styles.wrapLocation}>{listPick}</View>
      </View>
    );
  };
  const handlePreviewOrder = () => {
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
    <View style={styles.wrapAvailableTour}>
      {formCondition()}
      {listAvailable && listOptionAvailable()}
      {params &&
        params?.extra_price &&
        _.size(params?.extra_price) > 0 &&
        listExtraService()}
      {listAvailable && needShowPreOrder && previewOrder()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapAvailableTour: {},
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
  wrapListAvailable: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    padding: 10,
    marginTop: 15,
  },
  wrapLocation: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    ...CommonStyle.dropShadow,
  },
  wrapItemPick: {
    paddingVertical: 10,
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapName: {},
  wrapPlusMinus: {
    width: "50%",
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  wrapPlus: {
    padding: 5,
    backgroundColor: "#DEDEDE",
    borderRadius: 5,
  },
  wrapNumber: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: global.isRtl ? undefined : 10,
    marginRight: global.isRtl ? 10 : undefined,
    textAlign: global.isRtl ? "right" : "left",
    paddingVertical: 5,
  },
  wrapPreviewOrder: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 5,
  },
});
export default React.memo(AvailableTour);
