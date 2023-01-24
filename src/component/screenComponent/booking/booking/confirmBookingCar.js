import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
import {
  TouchableScale,
  TextApp,
  IndicatorComponent,
  SizedBox,
} from "@BaseComponent";
import { useTheme } from "react-native-paper";
import { CommonStyle } from "@Style";
import Dash from "react-native-dash";
import { Identify } from "@Helper";
import Toast from "react-native-toast-message";
import { addToCart } from "../../../../config/path";
import { BASE_DOMAIN } from "react-native-dotenv";

const ConfirmBookingCar = ({ navigation, params, dataItem }) => {
  const { colors } = useTheme();
  const [totalPrice, setTotalPrice] = useState({});
  const [loading, setLoading] = useState(false);

  const caculateTotalPrice = () => {
    let total = {};
    total["totalPrice"] = 0;
    if (params?.extra_price && !_.isEmpty(params?.extra_price)) {
      total["extra_price"] = _.sumBy(params?.extra_price, function (ex) {
        if (ex?.number == "1") {
          return Number(ex?.price) * Number(params?.number);
        }
      });
      if (!total["extra_price"]) total["extra_price"] = 0;
      total["totalPrice"] += total["extra_price"];
    }
    if (params?.start_date && params?.end_date) {
      const days = getNumberOfDays(params?.start_date, params?.end_date);
      if (dataItem?.sale_price && Number(dataItem?.sale_price)) {
        total["rental"] = days * Number(dataItem?.sale_price) * params?.number;
        total["totalPrice"] +=
          days * Number(dataItem?.sale_price) * params?.number;
      } else {
        total["rental"] = days * Number(dataItem?.price) * params?.number;
        total["totalPrice"] += days * Number(dataItem?.price) * params?.number;
      }
    }
    if (dataItem?.booking_fee) {
      let tempTotalPrice = total["totalPrice"];
      _.forEach(dataItem?.booking_fee, (e) => {
        if ((e?.unit && e?.unit == "fixed") || !e?.unit) {
          tempTotalPrice += Number(e?.price);
        } else if (e?.unit && e?.unit == "percent") {
          tempTotalPrice += total["totalPrice"] * (Number(e?.price) / 100);
        }
      });
      total["totalPrice"] = tempTotalPrice;
      total["booking_fee"] = total["totalPrice"];
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    caculateTotalPrice();
  }, []);

  const headerOrder = () => {
    return (
      <View style={styles.wrapHeaderOrder}>
        <TextApp bold title>
          {global.language["YourOrder"]}
        </TextApp>
      </View>
    );
  };

  const oneRow = (label, value, notUseMoney = false) => {
    return (
      <View style={styles.wrapOneRow}>
        <View style={styles.leftRow}>
          <TextApp>{label}</TextApp>
        </View>
        <View style={styles.rightRow}>
          <TextApp>{notUseMoney ? value : value}</TextApp>
        </View>
      </View>
    );
  };

  const handleListOption = () => {
    let list = [];
    _.forEach(params?.person_types, (e, i) => {
      list.push(
        <View key={`index_option_${i}`}>
          {oneRow(e?.name, totalPrice[e?.name])}
        </View>
      );
    });
    return list;
  };
  const getNumberOfDays = (start, end) => {
    if (!start || !end) return;
    const date1 = new Date(start);
    const date2 = new Date(end);

    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays + 1;
  };

  const detailOrder = () => {
    let list = [];
    let list_booking_fee = [];
    params?.extra_price &&
      _.forEach(params?.extra_price, (e, i) => {
        if (e?.number && Number(e?.number) == 1) {
          list.push(
            <View key={`item_price_${i}`}>
              {oneRow(
                e?.name,
                Identify.handleCurrency(
                  Number(e?.price) * Number(params?.number)
                )
              )}
            </View>
          );
        }
      });
    dataItem?.booking_fee &&
      _.forEach(dataItem?.booking_fee, (ex, ix) => {
        list_booking_fee.push(
          <View key={`item_fee_${ix}`}>
            {oneRow(
              ex?.name,
              Identify.handleShowPercent(ex?.unit, ex?.price),
              ex?.unit && ex?.unit != "fixed"
            )}
          </View>
        );
      });
    return (
      <View>
        {oneRow(global.language["StartDate"], params?.start_date, true)}
        {oneRow(global.language["EndDate"], params?.end_date, true)}
        {oneRow(
          global.language["Days"],
          getNumberOfDays(params?.start_date, params?.end_date),
          true
        )}
        {oneRow(global.language["Number"], params?.number, true)}
        {oneRow(global.language["RentalPrice"], totalPrice?.rental)}
        {handleListOption()}
        {dash()}
        <TextApp bold>{global.language["ExtraPrice"]}</TextApp>
        <SizedBox height={5} />
        {list}
        {dash()}
        <TextApp bold>{global.language["BookingFee"]}</TextApp>
        <SizedBox height={5} />
        {list_booking_fee}
      </View>
    );
  };

  const handleBooking = async () => {
    setLoading(true);
    const response = await fetch(
      Identify.checkBaseDomain(BASE_DOMAIN) + addToCart,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Identify.getToken(),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(params), // body data type must match "Content-Type" header
      }
    );
    let data = await response.text();
    data = JSON.parse(data);
    setLoading(false);
    if (!data?.status) {
      Toast.show({
        type: "error",
        text1: global.language["Oops"],
        text1Style: { fontSize: 40 },
        text2: data?.message,
        visibilityTime: 3000,
      });
    } else {
      navigation.navigate("BookingView", {
        url: data?.url,
        code: data?.booking_code,
      });
    }
  };

  const booking = () => {
    return (
      <TouchableScale onPress={() => handleBooking()}>
        <View style={[styles.wrapBooking, { backgroundColor: colors.primary }]}>
          {loading ? (
            <IndicatorComponent color={"#FFFFFF"} />
          ) : (
            <TextApp bold quaternary>
              {global.language["Booking"].toUpperCase()}
            </TextApp>
          )}
        </View>
      </TouchableScale>
    );
  };

  const dash = () => {
    return (
      <View style={styles.wrapDash}>
        <Dash
          style={styles.dash}
          dashColor={"#DEDEDE"}
          dashGap={5}
          dashLength={10}
          dashThickness={1}
        />
      </View>
    );
  };
  const totalRow = () => {
    return (
      <View style={[styles.wrapOneRow, { paddingVertical: 10 }]}>
        <View style={styles.leftRow}>
          <TextApp bold title>
            {global.language["Total"]}
          </TextApp>
        </View>
        <View style={styles.rightRow}>
          <TextApp bold title primary>
            {totalPrice?.totalPrice}
          </TextApp>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {headerOrder()}
      {dash()}
      {detailOrder()}
      {dash()}
      {totalRow()}
      <SizedBox height={5} />
      {booking()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginVertical: 5,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    ...CommonStyle.dropShadow,
  },
  wrapHeaderOrder: {
    justifyContent: "center",
    alignItems: "center",
  },
  dash: {
    width: "100%",
    height: 1,
    flexDirection: global.isRtl ? "row-reverse" : "row",
  },
  wrapOneRow: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  leftRow: {
    width: "60%",
    alignItems: global.isRtl ? "flex-end" : "flex-start",
  },
  rightRow: {
    width: "40%",
    alignItems: !global.isRtl ? "flex-end" : "flex-start",
  },
  wrapDash: {
    marginVertical: 10,
  },
  wrapBooking: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
  },
});
export default React.memo(ConfirmBookingCar);
