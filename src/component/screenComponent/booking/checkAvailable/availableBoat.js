import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableScale,
  TextApp,
  IndicatorComponent,
  SizedBox,
} from "@BaseComponent";
import { useTheme } from "react-native-paper";
import { getAvailableService } from "../../../../redux/detailRedux";
import {
  defaultParamsCheckAvailableBoatForDay,
  defaultParamsCheckAvailableBoatForHour,
} from "../../../../config/params/defaultParams";
import SinglePickTime from "./singlePickTime";
import SelectDayDate from "./selectDayDate";
import SelectHour from "./selectHour";
import Toast from "react-native-toast-message";
import { CommonStyle } from "@Style";
import { useSelector } from "react-redux";
import _ from "lodash";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Identify } from "@Helper";

const AvailableBoat = ({ type, id, navigation }) => {
  const [params, setParams] = useState(null);
  const refPickTime = useRef(null);
  const refSelectDayDate = useRef(null);
  const refSelectHour = useRef(null);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const dataItem = useSelector((state) => state.detail.dataItem);

  useEffect(() => {
    if (!params?.extra_price && dataItem.extra_price) {
      let newParams = { ...params };
      newParams["extra_price"] = dataItem.extra_price;
      setParams(newParams);
    }
  }, [dataItem]);

  const handleCheckAvailability = () => {
    let { dataSelected } = refPickTime?.current?.getData();
    let { boatTime } = refSelectDayDate?.current?.getData();
    let startHour = refSelectHour?.current?.getData().dataSelected;
    if (!boatTime.days && !boatTime.hours) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: global.language["PleaseSelectDayOrHourReturn"],
        visibilityTime: 3000,
      });
    }
    if (!startHour) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: global.language["PleaseSelectStartHour"],
        visibilityTime: 3000,
      });
    }
    if (!dataSelected?.start_date) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: global.language["PleaseSelectStartDate"],
        visibilityTime: 3000,
      });
    }
    let paramsPost = null;
    if (boatTime?.days) {
      paramsPost = defaultParamsCheckAvailableBoatForDay;
      paramsPost["day"] = boatTime?.days;
    }
    if (boatTime?.hours) {
      paramsPost = defaultParamsCheckAvailableBoatForHour;
      paramsPost["hour"] = boatTime?.hours;
    }

    paramsPost["start_date"] = dataSelected["start_date"];
    paramsPost["start_time"] = startHour;
    setLoading(true);
    getAvailableService(type, id, paramsPost).then((res) => {
      setLoading(false);
      if (res.status) {
        let newParams = { ...params };
        newParams["service_id"] = id;
        newParams["start_date"] = dataSelected["start_date"];
        newParams["start_time"] = startHour;
        if (boatTime.days != 0) {
          newParams["day"] = boatTime?.days;
          if (newParams.hasOwnProperty("hour")) {
            delete newParams.hour;
          }
        }
        if (boatTime.hours != 0) {
          newParams["hour"] = boatTime?.hours;
          if (newParams.hasOwnProperty("day")) {
            delete newParams.day;
          }
        }
        newParams["service_type"] = type;
        setParams(newParams);
        navigation.navigate("ConfirmBooking", {
          params: newParams,
          dataItem: dataItem,
        });
      } else {
        return Toast.show({
          type: "info",
          text1: global.language["Attention"],
          text1Style: { fontSize: 40 },
          text2: global.language["ServiceNotAvailable"],
          visibilityTime: 3000,
        });
      }
    });
  };

  const formCondition = () => {
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
      <View style={styles.wrapFormCondition}>
        <SelectDayDate ref={refSelectDayDate} />
        <SelectHour ref={refSelectHour} />
        <SinglePickTime ref={refPickTime} />
        <TextApp h8 medium style={styles.titleExtraService}>
          {global.language["ExtraPrice"]}
        </TextApp>
        {list}
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
              <TextApp quaternary bold>
                {global.language["PreviewOrder"].toUpperCase()}
              </TextApp>
            )}
          </View>
        </TouchableScale>
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
          <TextApp title>{element?.name}</TextApp>
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

  return <View style={styles.wrapAvailableBoat}>{formCondition()}</View>;
};

const styles = StyleSheet.create({
  wrapAvailableBoat: {},
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
export default React.memo(AvailableBoat);
