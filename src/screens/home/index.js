/** @format */
import SearchHome from "../../component/screenComponent/home/searchHome";
import React, { useEffect, useState } from "react";
import BaseScreen from "../base";
import { dynamicLayout } from "./dynamicLayout";
import RNBootSplash from "react-native-bootsplash";
import { registerDeviceToPushNotification } from "../../redux/appRedux";
import DeviceInfo from "react-native-device-info";
import { Device, Identify } from "@Helper";
import { useSelector } from "react-redux";
import OneSignal from "react-native-onesignal";
import Feather from "react-native-vector-icons/Feather";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import { ListCategory } from "@CategoryScreenComponent";

const { width, height } = Dimensions.get("window");
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      style={[styles.item1]}
      imageStyle={{ borderRadius: 10 }}
      source={item.img}
    >
      <Text style={[styles.title1, textColor]}>{item.title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const listCategory = useSelector(
    (state) => state.app.appConfig?.booking_types
  );
  // console.log("my obj", Object.keys(listCategory));

  const userInformation = useSelector((state) => state.user.userInformation);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      RNBootSplash.hide({ fade: true });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (userInformation && !Identify.registeredDevice) {
      getDeviceState();
    }
  }, [userInformation]);

  const getDeviceState = async () => {
    const deviceState = await OneSignal.getDeviceState();
    const deviceInfo = await DeviceInfo.getDeviceName();
    if (deviceInfo) {
      Device.setDeviceName(deviceInfo);
    }
    console.log({
      sub_id: deviceState.userId,
      device: deviceInfo,
    });
    if (deviceState && deviceState.hasOwnProperty("userId")) {
      registerDeviceToPushNotification({
        sub_id: deviceState.userId,
        device: deviceInfo,
      });
    }
  };
  const images = [
    {
      source: require("../../assets/image/Air/bungee-jumping.jpeg"),
      title: "Bungee Jumping",
    },
    {
      source: require("../../assets/image/Air/bungeejumping2.jpg"),
      title: "Bungee Jumping",
    },
    {
      source: require("../../assets/image/Air/hang-gliding.jpg"),
      title: "Hang Gliding",
    },
    {
      source: require("../../assets/image/Air/hang-gliding3.jpg"),
      title: "Hang Gliding",
    },
    {
      source: require("../../assets/image/Air/hangglide.jpg"),
      title: "Hangglide",
    },
    {
      source: require("../../assets/image/Air/Helicopter-Tours.jpg"),
      title: "Helicopter",
    },
    {
      source: require("../../assets/image/Air/helicopter.jpg"),
      title: "Helicopter",
    },
    {
      source: require("../../assets/image/Air/helicopter2.jpg"),
      title: "Helicopter",
    },
    {
      source: require("../../assets/image/Air/hot-air-balloon.jpg"),
      title: "Balloon",
    },
    {
      source: require("../../assets/image/Air/hot-air-balloon2.jpg"),
      title: "Balloon",
    },
    {
      source: require("../../assets/image/Air/indoorskydive.jpg"),
      title: "Indoor Skydive",
    },
    {
      source: require("../../assets/image/Air/indoorskydive2.jpg"),
      title: "Indoor Skydive",
    },
    {
      source: require("../../assets/image/Air/paragliding.jpg"),
      title: "Paragliding",
    },
    {
      source: require("../../assets/image/Air/scenic-flight2.jpg"),
      title: "Scenic",
    },
    {
      source: require("../../assets/image/Air/skydiving.jpg"),
      title: "Skydiving",
    },
    {
      source: require("../../assets/image/Air/skydiving2.jpg"),
      title: "Skydiving",
    },
  ];

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Desert Chalets",
      img: require("../../../docs/img/deserchalet.webp"),
      keynav: "space",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Sea Chalet",
      img: require("../../../docs/img/Seachalet.jpg"),
      keynav: "hotel",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Desert Activities",
      img: require("../../../docs/img/DesertActivities.jpg"),
      keynav: "tour",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Sea Activities",
      img: require("../../../docs/img/SeaActivities.jpg"),
      keynav: "boat",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",

      title: "Sea Equipment",
      img: require("../../../docs/img/seaequipment.jpg"),
      keynav: "boat",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Desert Equipment",
      img: require("../../../docs/img/Desertequipment.jpeg.jpg"),
      keynav: "space",
    },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "white";
    const text =
      item.id === selectedId
        ? { fontSize: 15, fontWeight: "bold" }
        : { fontSize: 15, fontWeight: "bold" };
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("ListItem", { name: item.keynav })}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        textStyle={{ text }}
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.searchView}>
        <SearchHome navigation={navigation} />
      </View>

      <View
        style={{
          alignSelf: "center",
          width: "100%",

          top: hp("1.5%"),
        }}
      >
        <Carousel
          layout="default"
          autoplay
          autoplayDelay={3000}
          shadowColor="#051934"
          loop
          data={images}
          renderItem={({ item }) => (
            <View>
              <Image
                source={item.source}
                style={{
                  height: 150,
                  width: 240,
                  borderRadius: 16,
                }}
              />
              <View
                style={{
                  backgroundColor: "#F2F2F2",
                  borderRadius: 10,
                  width: wp("50%"),
                  height: hp("5%"),
                  bottom: "30%",
                  left: wp("5%"),
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 15,
                    padding: 10,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          )}
          sliderWidth={400}
          height={190}
          alignItems={"center"}
          alignSelf={"center"}
          itemWidth={240}
        />
      </View>

      {/* category and flatlist */}
      <View
        style={{
          flexDirection: "row",
          width: wp("95%"),
          justifyContent: "space-between",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "#017fed",
            fontWeight: "bold",
            padding: "2%",
            left: "2%",
          }}
        >
          Categories
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#edb95e",
            fontWeight: "900",
            right: wp("2%"),
            top: hp("2%"),
          }}
        >
          View All
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          height: hp("62%"),
          top: hp("2%"),
        }}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns={2}
        />
        {/* <ListCategory navigation={navigation} /> */}
      </View>
      <View
        style={{
          bottom: hp("1%"),
          width: wp("95%"),
          alignSelf: "center",
          paddingTop: hp("5%"),
          paddingBottom: hp("10%"),
        }}
      >
        {/* <BaseScreen scroll usePadding> */}
        {dynamicLayout(navigation)}
        {/* </BaseScreen> */}
      </View>
    </ScrollView>
  );
};
export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: 30,
    backgroundColor: "#ffff",
  },
  item: {
    width: 160,
    height: 160,
    top: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 16,
  },
  image: {
    resizeMode: "cover",
  },
  searchView: {
    width: "95%",
    top: "3%",
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
  },
  textInputStyle: {
    width: "85%",
    left: "15%",
    fontSize: 15,
    fontWeight: "900",
  },

  item1: {
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    width: width / 2.2,
    height: height / 5.5,
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: "bold",
    fontSize: 20,
  },
  title1: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: 30,
  },
});
/*
 {
          
          bottom: hp("75%"),
          width: "95%",
          alignSelf: "center",
          paddingBottom: hp("10%"),
        }
*/
