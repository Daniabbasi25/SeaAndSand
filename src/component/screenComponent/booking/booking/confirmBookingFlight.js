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
import { Identify, Device } from "@Helper";
import Toast from "react-native-toast-message";
import { addToCart } from "../../../../config/path";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BASE_DOMAIN } from "react-native-dotenv";

const ConfirmBookingFlight = ({ navigation, params, dataItem }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

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
    _.forEach(params?.flight_seat, (e, i) => {
      if (e?.number) {
        list.push(
          <View key={`index_option_${i}`}>
            {oneRow(
              e?.seat_type?.name +
                ": " +
                e?.number +
                " x " +
                Identify.handleCurrency(e?.price),
              Identify.handleCurrency(Number(e?.number * e?.price))
            )}
          </View>
        );
      }
    });
    return list;
  };

  const itemTime = (title, value, isDepartureTime) => {
    return (
      <View style={styles.wrapItemTimeFlight}>
        <MaterialCommunityIcons
          name={"airplane"}
          style={isDepartureTime ? styles.iconLeft : styles.iconLeftTransform}
          size={28}
        />
        <View style={styles.rightContent}>
          <TextApp title center>
            {" "}
            {value} ---{" "}
          </TextApp>
          <SizedBox height={5} />
          <TextApp title bold numberOfLines={1}>
            {title}
          </TextApp>
        </View>
      </View>
    );
  };

  const listTime = () => {
    return (
      <View style={styles.wrapListTime}>
        {itemTime(
          dataItem?.airport_from?.name,
          dataItem?.arrival_time_html,
          true
        )}
        {itemTime(
          dataItem?.airport_to?.name,
          dataItem?.departure_time_html,
          false
        )}
      </View>
    );
  };

  const detailOrder = () => {
    let list = [];
    let list_booking_fee = [];
    params?.extra_price &&
      _.forEach(params?.extra_price, (e, i) => {
        if (e?.number && Number(e?.number) == 1) {
          list.push(
            <View key={`item_price_${i}`}>{oneRow(e?.name, e?.price)}</View>
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
        {oneRow(
          global.language["StartDate"],
          dataItem?.arrival_date_html,
          true
        )}
        {oneRow(global.language["From"], dataItem?.airport_from?.name, true)}
        {oneRow(global.language["At"], dataItem?.arrival_time_html, true)}
        {oneRow(global.language["To"], dataItem?.airport_to?.name, true)}
        {oneRow(global.language["At"], dataItem?.departure_time_html, true)}
        {handleListOption()}
        {oneRow(
          global.language["Duration"],
          dataItem?.duration > 1
            ? dataItem?.duration + " " + global.language["Hours"]
            : dataItem?.duration + " " + global.language["Hour"],
          true
        )}
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
            {dataItem?.total_price}
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
  wrapListTime: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wrapItemTimeFlight: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    marginVertical: 5,
    width: Device.width / 2 - 40,
    paddingBottom: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  rightContent: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
  },
  iconLeftTransform: {
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
});
export default React.memo(ConfirmBookingFlight);
