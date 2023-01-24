/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableScale, TextApp, ImageApp } from "@BaseComponent";
import { useDispatch, useSelector } from "react-redux";
import { Identify } from "@Helper";
import { CommonStyle } from "@Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { logout } from "../../../redux/userRedux";
import Toast from "react-native-toast-message";
// import ImagePicker from 'react-native-image-picker';

const ListItemAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      if (res) {
        Toast.show({
          type: "success",
          text1: `${global.language["Hey"]}!`,
          text1Style: { fontSize: 40 },
          text2: global.language["SeeYouAgain"],
          visibilityTime: 3000,
          position: "bottom",
          bottomOffset: 60,
        });
        navigation.navigate("Home");
      }
    });
  };
  const handleUploadAvatar = () => {
    // ImagePicker?.showImagePicker(options, (response) => {
    //     if (response.didCancel) {
    //     } else if (response.error) {
    //     } else if (response.customButton) {
    //     } else {
    //         let type = response.type;
    //         if (Platform.OS === 'android') {
    //             RNFetchBlob.fs.stat(response.uri)
    //                 .then(stats => {
    //                     let re = /(?:\.([^.]+))?$/,
    //                         ext = re.exec(stats.filename)[1];
    //                     type = 'image/' + ext;
    //                 });
    //         } else {
    //         }
    //     }
    // });
  };

  const topAccount = () => {
    return (
      <View style={styles.wrapTopAccount}>
        <View style={styles.wrapAvatar}>
          <TouchableScale onPress={() => handleUploadAvatar()}>
            <View style={styles.coverAvatar}>
              <ImageApp
                source={{
                  uri: Identify.generateImageUrl(userInformation?.avatar),
                }}
                style={styles.avatar}
              />
            </View>
          </TouchableScale>
        </View>
        <View style={styles.wrapInfor}>
          <TextApp title medium>
            {userInformation?.name}
          </TextApp>
          <TextApp>{userInformation?.phone}</TextApp>
          <TextApp>{userInformation?.email}</TextApp>
        </View>
      </View>
    );
  };

  const handleItemRowAccount = (type) => {
    switch (type) {
      case "logout":
        return handleLogout();
      case "profile":
        navigation.navigate("MyProfile");
        break;
      case "changePassword":
        navigation.navigate("ChangePassWord");
        break;
      case "history":
        navigation.navigate("History");
        break;
      case "wishlist":
        navigation.navigate("Wishlist");
        break;
      case "verification":
        navigation.navigate("Verification");
        break;
      case "setting":
        navigation.navigate("Setting");
        break;
      default:
        Toast.show({
          type: "info",
          text1: `${global.language["Hey"]}!`,
          text1Style: { fontSize: 40 },
          text2: global.language["ComingSoon"],
          visibilityTime: 3000,
          position: "bottom",
          bottomOffset: 60,
        });
        return;
    }
  };

  const itemRowAccount = (type, label, canOpen) => {
    return (
      <TouchableScale onPress={() => handleItemRowAccount(type)}>
        <View
          style={[
            styles.wrapItemRowAccount,
            canOpen ? styles.borderBottom : {},
          ]}
        >
          <TextApp>{label}</TextApp>
          {canOpen && <MaterialIcons name={"chevron-right"} size={24} />}
        </View>
      </TouchableScale>
    );
  };
  const contentAccount = () => {
    return (
      <View style={styles.wrapContentAccount}>
        {itemRowAccount("profile", global.language["MyProfile"], true)}
        {itemRowAccount("history", global.language["BookingHistory"], true)}
        {itemRowAccount("wishlist", global.language["Wishlist"], true)}
        {/* {itemRowAccount('verification', 'Verification', true)} */}
        {itemRowAccount(
          "changePassword",
          global.language["ChangePassword"],
          true
        )}
        {itemRowAccount("setting", global.language["Settings"], true)}
        {itemRowAccount("logout", global.language["Logout"], false)}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {topAccount()}
      {contentAccount()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  wrapTopAccount: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  wrapInfor: {
    width: "65%",
    alignItems: "center",
  },
  wrapAvatar: {
    width: "35%",
    alignItems: "center",
  },
  coverAvatar: {
    height: 110,
    width: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    ...CommonStyle.dropShadow,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  wrapItemRowAccount: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  wrapContentAccount: {
    marginVertical: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    ...CommonStyle.dropShadow,
    borderRadius: 10,
  },
  borderBottom: {
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderBottomColor: "#DEDEDE",
  },
});
export default React.memo(ListItemAccount);
