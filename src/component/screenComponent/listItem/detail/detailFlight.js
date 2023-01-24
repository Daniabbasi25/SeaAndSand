import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Device, Identify } from "@Helper";
import { useTheme } from "react-native-paper";
import _ from "lodash";
import { CommonStyle } from "@Style";
import { defaultParamsCheckAvailableFlight } from "../../../../config/params/defaultParams";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const DetailFlight = ({ visible, closeModal, item, rootItem, navigation }) => {
  const { colors } = useTheme();
  const [flightSeat, setFlightSeat] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const userInformation = useSelector((state) => state.user?.userInformation);
  const enable_guest_booking = useSelector(
    (state) => state.app?.appConfig?.is_enable_guest_checkout
  );

  useEffect(() => {
    if (!flightSeat && item?.flight_seat) {
      setFlightSeat(item?.flight_seat);
    }
  }, [item]);

  const headerModal = () => {
    return (
      <View style={styles.wrapHeaderModal}>
        <TouchableScale onPress={() => closeModal()}>
          <FontAwesome name={"close"} size={30} />
        </TouchableScale>
      </View>
    );
  };

  const nameImageAndCodeFlight = () => {
    return (
      <View style={styles.wrapNameImageAndCodeFlight}>
        <View style={styles.leftNameImageAndCodeFlight}>
          <ImageApp source={{ uri: rootItem?.image }} style={styles.image} />
        </View>
        <View style={styles.wrapNameCode}>
          <TextApp title bold numberOfLines={2}>
            {rootItem?.title}
          </TextApp>
          <TextApp title>{rootItem?.code}</TextApp>
        </View>
      </View>
    );
  };

  const itemTimeFlight = (title, value, isDepartureTime) => {
    return (
      <View style={styles.wrapItemTimeFlight}>
        <MaterialCommunityIcons
          name={"airplane"}
          style={isDepartureTime ? styles.iconLeft : styles.iconLeftTransform}
          size={36}
        />
        <View style={styles.rightContent}>
          <TextApp bold title center>
            {title}
          </TextApp>
          <SizedBox height={5} />
          <TextApp button center>
            {new Date(value).toUTCString()}
          </TextApp>
        </View>
      </View>
    );
  };

  const rowSeat = (title, value) => (
    <View style={styles.wrapRowSeat}>
      <View style={styles.leftRowSeat}>
        <TextApp>{title}</TextApp>
      </View>
      <View style={styles.rightRowSeat}>
        <TextApp>{value}</TextApp>
      </View>
    </View>
  );

  const increaseRoom = (i) => {
    let newFlightSeat = { ...flightSeat };
    if (newFlightSeat[i].number < newFlightSeat[i].max_passengers) {
      newFlightSeat[i].number += 1;
      let newPrice = totalPrice;
      newPrice += Number(flightSeat[i].price);
      setFlightSeat(newFlightSeat);
      setTotalPrice(newPrice);
    }
  };

  const decreaseRoom = (i) => {
    let newFlightSeat = { ...flightSeat };
    if (newFlightSeat[i].number > 0) {
      newFlightSeat[i].number -= 1;
      let newPrice = totalPrice;
      newPrice -= Number(flightSeat[i].price);
      setFlightSeat(newFlightSeat);
      setTotalPrice(newPrice);
    }
  };

  const handleBooking = () => {
    closeModal();
    if (!enable_guest_booking && !userInformation) {
      Toast.show({
        type: "error",
        text1: global.language["Oops"],
        text1Style: { fontSize: 40 },
        text2: global.language["RequireLogin"],
        visibilityTime: 3000,
      });
      return;
    }
    let newParams = defaultParamsCheckAvailableFlight;
    newParams["service_id"] = item?.id;
    newParams["flight_seat"] = flightSeat;
    let newItem = { ...item };
    newItem["object_model"] = "flight";
    newItem["total_price"] = totalPrice;
    navigation.navigate("ConfirmBooking", {
      params: newParams,
      dataItem: newItem,
    });
  };

  const increaseDecreaseNumber = (e, i) => {
    let price = Number(flightSeat[i].number) * Number(flightSeat[i].price);
    return (
      <View style={styles.wrapIncreaseDecreaseNumber}>
        <View style={styles.leftIncreaseDecreaseNumber}>
          <TextApp title bold>
            {price}
          </TextApp>
        </View>
        <View style={styles.rightIncreaseDecreaseNumber}>
          <TouchableScale onPress={() => increaseRoom(i)}>
            <View style={styles.wrapPlus}>
              <MaterialCommunityIcons
                name={"plus"}
                size={20}
                color={colors.primary}
              />
            </View>
          </TouchableScale>
          <View style={styles.wrapNumber}>
            <TextApp primary bold>
              {flightSeat[i].number}
            </TextApp>
          </View>
          <TouchableScale onPress={() => decreaseRoom(i)}>
            <View style={styles.wrapPlus}>
              <MaterialCommunityIcons
                name={"minus"}
                size={20}
                color={colors.primary}
              />
            </View>
          </TouchableScale>
        </View>
      </View>
    );
  };
  const itemSeat = (e, i) => {
    return (
      <View style={styles.wrapItemSeat}>
        {rowSeat("Seat type", e?.seat_type?.name)}
        {rowSeat("Baggage", Identify.upperCaseFirstCharacter(e?.person))}
        {rowSeat("Check-in", e?.baggage_check_in + global.language["Kg"])}
        {rowSeat("Cabin", e?.baggage_cabin + global.language["Kg"])}
        {rowSeat("Price", e?.price)}
        {increaseDecreaseNumber(e, i)}
      </View>
    );
  };
  const listSeat = () => {
    let list = [];
    _.forEach(flightSeat, (e, i) => {
      list.push(<View key={`seat_${i}`}>{itemSeat(e, i)}</View>);
    });
    return <View>{list}</View>;
  };

  const timeFlight = () => {
    return (
      <View style={styles.wrapTimeFlight}>
        {itemTimeFlight(
          global.language["TakeOff"],
          rootItem?.departure_time,
          true
        )}
        <TextApp bold title>
          {rootItem?.duration}hrs
        </TextApp>
        {itemTimeFlight(
          global.language["Landing"],
          rootItem?.arrival_time,
          false
        )}
      </View>
    );
  };

  const bookingAction = () => {
    return (
      <View style={styles.wrapBookingAction}>
        <View style={styles.leftBookingAction}>
          <TextApp bold>{global.language["PayAmount"]}</TextApp>
          <TextApp bold title primary>
            {totalPrice}
          </TextApp>
        </View>
        <View style={styles.rightBookingAction}>
          <TouchableScale onPress={() => handleBooking()}>
            <View
              style={[
                styles.buttonBooking,
                { backgroundColor: colors.primary },
              ]}
            >
              <TextApp quaternary bold>
                {global.language["BookingNow"]}
              </TextApp>
            </View>
          </TouchableScale>
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.wrapModal}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.contentModal}>
        {headerModal()}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {nameImageAndCodeFlight()}
          {timeFlight()}
          {flightSeat && listSeat()}
        </ScrollView>
        {totalPrice != 0 && bookingAction()}
      </View>
    </Modal>
  );
};
const sizeImage = Device.width / 3;

const styles = StyleSheet.create({
  wrapModal: {
    margin: 0,
    marginHorizontal: 10,
  },
  contentModal: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  wrapHeaderModal: {
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  scrollView: {
    height: Device.height * 0.7,
  },
  image: {
    width: sizeImage,
    height: sizeImage / 1.5,
  },
  wrapNameImageAndCodeFlight: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#FFFFFF",
    borderBottomColor: "#DEDEDE",
    borderWidth: 1,
    paddingBottom: 15,
  },
  wrapNameCode: {
    justifyContent: "center",
    width: "55%",
  },
  wrapItemTimeFlight: {
    // flexDirection: global.isRtl ? 'row-reverse' : 'row',
    width: Device.width * 0.35,
    alignItems: "center",
    marginVertical: 5,
    paddingBottom: 10,
    justifyContent: "center",
  },
  rightContent: {
    marginTop: 5,
  },
  iconLeftTransform: {
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  wrapTimeFlight: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderColor: "#FFFFFF",
    borderBottomColor: "#DEDEDE",
    borderWidth: 1,
    paddingBottom: 5,
  },
  leftNameImageAndCodeFlight: {
    width: "40%",
  },
  wrapBookingAction: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  leftBookingAction: {
    width: "60%",
  },
  rightBookingAction: {
    width: "40%",
  },
  buttonBooking: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  wrapRowSeat: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  wrapItemSeat: {
    marginHorizontal: 5,
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    ...CommonStyle.dropShadow,
  },
  wrapIncreaseDecreaseNumber: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#FFFFFF",
    borderTopColor: "#DEDEDE",
    borderWidth: 1,
    marginTop: 5,
  },
  rightIncreaseDecreaseNumber: {
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
});

export default React.memo(DetailFlight);
