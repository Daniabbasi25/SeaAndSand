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
import { defaultParamsCheckAvailableSpace } from "../../../../config/params/defaultParams";
import Toast from "react-native-toast-message";
import { CommonStyle } from "@Style";
import { useSelector } from "react-redux";
import _ from "lodash";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PickTime from "../../listItem/filter/pickTime";
import PickGuest from "../../listItem/filter/pickGuest";
import { Identify } from "@Helper";

const AvailableSpace = ({ type, id, navigation }) => {
  const [params, setParams] = useState(null);
  const refPickTime = useRef(null);
  const refPickGuest = useRef(null);
  const { colors } = useTheme();
  const dataItem = useSelector((state) => state.detail.dataItem);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!params?.extra_price && dataItem.extra_price) {
      let newParams = { ...params };
      newParams["extra_price"] = dataItem.extra_price;
      setParams(newParams);
    }
  }, [dataItem]);

  const elementTime = {
    title: global.language["SelectDate"],
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

  const handleCheckAvailability = () => {
    let { guests } = refPickGuest.current?.getData();
    if (
      guests &&
      Number(guests?.adults) + Number(guests?.children) >
        Number(dataItem?.max_guests)
    ) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: `${dataItem?.max_guests} ${global.language["GuestsInMaximum"]}`,
        visibilityTime: 3000,
      });
    }
    let { dataSelected } = refPickTime?.current?.getData();
    if (!dataSelected?.start_date || !dataSelected?.end_date) {
      return Toast.show({
        type: "info",
        text1: global.language["Attention"],
        text1Style: { fontSize: 40 },
        text2: global.language["PleaseSelectStartDate"],
        visibilityTime: 3000,
      });
    }
    let paramsPost = {
      id: id,
      start: dataSelected?.start_date,
      end: dataSelected?.end_date,
      for_single: 1,
    };
    setLoading(true);
    getAvailableService(type, id, paramsPost).then((res) => {
      setLoading(false);
      if (res && _.size(res) > 0) {
        let listUnAvailable = [];
        _.forEach(res, (e) => {
          if (!e.active) {
            listUnAvailable.push(e?.start);
          }
        });
        if (_.isEmpty(listUnAvailable)) {
          let newParams = { ...params };
          newParams["extra_price"] = dataItem["extra_price"];
          newParams["start_date"] = dataSelected?.start_date;
          newParams["end_date"] = dataSelected?.end_date;
          newParams["service_id"] = id;
          newParams["service_type"] = type;
          setParams(newParams);
          newParams = { ...newParams, ...guests };
          navigation.navigate("ConfirmBooking", {
            params: newParams,
            dataItem: dataItem,
          });
        } else {
          return Toast.show({
            type: "info",
            text1: global.language["Attention"],
            text1Style: { fontSize: 40 },
            text2:
              global.language["ServiceUnAvailableOn"] +
              " " +
              listUnAvailable.join(", ").toString(),
            visibilityTime: 3000,
          });
        }
        return;
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
        <PickTime ref={refPickTime} element={elementTime} />
        <PickGuest ref={refPickGuest} element={elementGuest} />
        <TextApp textSecondary mediumItalic style={{ paddingLeft: 10 }}>
          <TextApp error mediumItalic>
            (*){" "}
          </TextApp>
          {dataItem?.max_guests} {global.language["GuestsInMaximum"]}
        </TextApp>
        <SizedBox height={15} />
        <TextApp h8 medium style={styles.titleExtraService}>
          {global.language["ExtraPrice"]}*
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

  return <View style={styles.wrapAvailableSpace}>{formCondition()}</View>;
};

const styles = StyleSheet.create({
  wrapAvailableSpace: {},
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
export default React.memo(AvailableSpace);
