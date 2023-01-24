import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp, SizedBox } from "@BaseComponent";
import { Device, Identify } from "@Helper";
import { CommonStyle } from "@Style";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailFlight from "../detail/detailFlight";
import { getDataItemToReturn } from "../../../../redux/detailRedux";
import { IndicatorComponent } from "@BaseComponent";

const ItemFlight = ({ item, navigation }) => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();
  const [dataItem, setDataItem] = useState(null);
  const [loading, setLoading] = useState(null);
  const type = "flight";

  const openModal = () => {
    setLoading(true);
    getDataItemToReturn(type, item?.id).then((res) => {
      setLoading(false);
      setDataItem(res);
      setVisible(true);
    });
  };

  const closeModal = () => setVisible(false);

  const topImage = () => {
    return <ImageApp source={{ uri: item?.image }} style={styles.image} />;
  };
  const nameAndPrice = () => {
    return (
      <View style={styles.wrapNameAndPrice}>
        <TextApp bold title>
          {item?.airport_form?.name}
        </TextApp>
        <View style={styles.wrapPrice}>
          <View style={styles.price}>
            {!Identify.isExistValue(item?.sale_price) && (
              <TextApp bold title style={styles.transformText}>
                {item?.price}
              </TextApp>
            )}
            {Identify.isExistValue(item?.sale_price) && (
              <TextApp
                bold
                style={{ ...styles.salePrice, ...styles.transformText }}
              >
                {item?.price}
              </TextApp>
            )}
            {Identify.isExistValue(item?.sale_price) && (
              <TextApp bold title style={styles.transformText}>
                {item?.sale_price}
              </TextApp>
            )}
          </View>
          <TextApp
            button
          >{`${global.language["Avg"]}/${global.language["Person"]}`}</TextApp>
        </View>
      </View>
    );
  };
  const timeFlight = (title, value, isDepartureTime) => {
    return (
      <View style={styles.wrapTimeFlight}>
        <View style={styles.leftContent}>
          <MaterialCommunityIcons
            name={"airplane"}
            style={isDepartureTime ? styles.iconLeft : styles.iconLeftTransform}
            size={40}
          />
        </View>
        <View style={styles.rightContent}>
          <TextApp bold title>
            {title}
          </TextApp>
          <SizedBox height={5} />
          <TextApp>{new Date(value).toUTCString()}</TextApp>
        </View>
      </View>
    );
  };

  const buttonChooseFlight = () => {
    return (
      <TouchableScale onPress={() => openModal()}>
        <View
          style={[
            styles.buttonChooseFlight,
            { backgroundColor: colors.primary },
          ]}
        >
          {loading ? (
            <IndicatorComponent color={"#FFFFFF"} size={30} />
          ) : (
            <TextApp bold quaternary>
              {global.language["Choose"]}
            </TextApp>
          )}
        </View>
      </TouchableScale>
    );
  };
  return (
    <View style={styles.wrapItem}>
      {topImage()}
      {nameAndPrice()}
      {timeFlight(global.language["TakeOff"], item?.departure_time, true)}
      {timeFlight(global.language["Landing"], item?.arrival_time, false)}
      {buttonChooseFlight()}
      <SizedBox height={10} />
      <DetailFlight
        visible={visible}
        closeModal={() => closeModal()}
        item={dataItem}
        rootItem={item}
        navigation={navigation}
      />
    </View>
  );
};
const sizeItem = Device.width - 30;
const styles = StyleSheet.create({
  wrapItem: {
    width: sizeItem,
    height: 520,
    margin: 10,
    padding: 10,
    paddingTop: 15,
    alignItems: "center",
    ...CommonStyle.dropShadow,
  },
  image: {
    width: "95%",
    height: 200,
    borderRadius: 5,
  },
  wrapNameAndPrice: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "95%",
    marginVertical: 10,
  },
  wrapPrice: {
    alignItems: "flex-end",
  },
  price: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  transformText: {
    textAlign: global.isRtl ? "right" : "left",
  },
  salePrice: {
    marginRight: 5,
    textDecorationLine: "line-through",
  },
  wrapDiscount: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  wrapTimeFlight: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    width: "95%",
    alignItems: "center",
    marginVertical: 5,
    paddingBottom: 10,
    borderColor: "#FFFFFF",
    borderBottomColor: "#DEDEDE",
    borderWidth: 1,
  },
  leftContent: {
    width: "20%",
  },
  rightContent: {
    width: "80%",
  },
  iconLeftTransform: {
    position: "absolute",
    top: -10,
    right: 0,
    left: 0,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  buttonChooseFlight: {
    width: sizeItem * 0.9,
    height: 50,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 15,
  },
});

export default React.memo(ItemFlight);
