import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, SizedBox } from "@BaseComponent";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import { Identify, Device } from "@Helper";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Swiper from "react-native-swiper";

const BookingAction = ({ data, navigation }) => {
  const { colors } = useTheme();
  const userInformation = useSelector((state) => state.user.userInformation);
  const appConfig = useSelector((state) => state.app.appConfig);
  const isEnableGuestCheckout = appConfig?.is_enable_guest_checkout;

  const handleBooking = () => {
    if (!isEnableGuestCheckout && !userInformation) {
      Toast.show({
        type: "info",
        text1: global.language["Wait"],
        text1Style: { fontSize: 40 },
        text2: global.language["RequireLogin"],
        visibilityTime: 3000,
      });
    } else {
      let type = data?.object_model;
      let id = data?.id;
      navigation.navigate("CheckAvailable", { type: type, id: id });
    }
  };

  return (
    <Animatable.View
      style={styles.container}
      duration={1000}
      animation="slideInUp"
    >
      {data && data?.object_model != "boat" && (
        <View style={styles.leftBooking}>
          <TextApp bold title>
            {global.language["Price"]}
          </TextApp>
          <SizedBox height={3} />
          {!Identify.isExistValue(data?.sale_price) && (
            <TextApp bold title primary>
              {data?.price}
            </TextApp>
          )}
          {Identify.isExistValue(data?.sale_price) && (
            <View style={styles.withSalePrice}>
              <TextApp button style={styles.salePrice}>
                {data?.price}
              </TextApp>
              <SizedBox width={5} />
              <TextApp bold title primary>
                {data?.sale_price}
              </TextApp>
            </View>
          )}
        </View>
      )}
      {data &&
        data?.object_model == "boat" &&
        data?.price_per_hour &&
        data?.price_per_day && (
          <View style={styles.leftBooking}>
            <TextApp bold title>
              {global.language["Price"]}
            </TextApp>
            <SizedBox height={3} />
            {data?.price_per_hour && data?.price_per_day && (
              <Swiper
                // autoplayTimeout={4}
                autoplay={true}
                showsPagination={false}
                horizontal={false}
                index={0}
              >
                <AnimatedPrice price={data?.price_per_hour} isDay={false} />
                <AnimatedPrice price={data?.price_per_day} isDay={true} />
              </Swiper>
            )}
            {data?.price_per_hour && !data?.price_per_day && (
              <AnimatedPrice price={data?.price_per_hour} isDay={false} />
            )}
            {!data?.price_per_day && data?.price_per_day && (
              <AnimatedPrice price={data?.price_per_day} isDay={true} />
            )}
          </View>
        )}
      <View style={styles.rightBooking}>
        <TouchableScale
          onPress={() => handleBooking()}
          style={[styles.itemBooking, { backgroundColor: colors.primary }]}
        >
          <TextApp bold quaternary>
            {global.language["BookingNow"]}
          </TextApp>
        </TouchableScale>
      </View>
    </Animatable.View>
  );
};
const AnimatedPrice = ({ price, isDay }) => {
  return (
    <TextApp bold title primary>
      {price}/
      <TextApp bold button primary>
        {isDay ? global.language["PerDay"] : global.language["PerHour"]}
      </TextApp>
    </TextApp>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 99999,
    backgroundColor: "#FFFFFF",
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Device.isIphoneX() ? 80 : 70,
    paddingHorizontal: 20,
    paddingBottom: Device.isIphoneX() ? 10 : 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  leftBooking: {
    width: "60%",
    alignItems: global.isRtl ? "flex-end" : "flex-start",
    paddingTop: 5,
  },
  rightBooking: {
    width: "40%",
  },
  itemBooking: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 15,
  },
  withSalePrice: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
  },
  salePrice: {
    textDecorationLine: "line-through",
  },
});

export default React.memo(BookingAction);
