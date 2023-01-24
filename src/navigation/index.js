/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signUp";
import SplashScreen from "../screens/splash";
import HomeScreen from "../screens/home";
import ListItemScreen from "../screens/listItem";
import CategoryScreen from "../screens/category";
import ForgotPasswordScreen from "../screens/forgotPassword";
import NewScreen from "../screens/new";
import ListNewScreen from "../screens/new/listNew";
import AccountScreen from "../screens/account";
import DetailItemScreen from "../screens/detailItem";
import MyProfileScreen from "../screens/myProfile";
import CheckAvailableScreen from "../screens/checkAvailable";
import SearchAllScreen from "../screens/searchAll";
import OptionScreen from "../screens/optionScreen";
import WrongScreen from "../screens/wrongScreen";
import ConfirmBookingScreen from "../screens/confirmBooking";
import BookingViewScreen from "../screens/bookingView";
import WebViewScreen from "../screens/webview";
import ThankYouScreen from "../screens/thankyou";
import ChangePassWordScreen from "../screens/changePassword";
import HistoryScreen from "../screens/history";
import WishlistScreen from "../screens/wishlist";
import VerificationScreen from "../screens/verification";
import WelcomeScreen from "../screens/welcome";
import SettingScreen from "../screens/setting";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Device } from "@Helper";
import MyMap from "../screens/MyMap";
import History from "../screens/history/index";
const Boot = createNativeStackNavigator();
function BootStack() {
  return (
    <Boot.Navigator initialRouteName="Splash">
      <Boot.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Boot.Screen
        name="Wrong"
        component={WrongScreen}
        options={{ headerShown: false }}
      />
    </Boot.Navigator>
  );
}

const MainApp = createBottomTabNavigator();
function MainAppStack() {
  const userInformation = useSelector((state) => state.user.userInformation);
  const { colors } = useTheme();

  return (
    <MainApp.Navigator
      initialRouteName="Home"
      keyboardHidesTabBar={true}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...styles.shadow,
          ...{
            transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          },
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "New") {
            iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
          } else if (route.name === "Category") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          } else if (route.name === "History") {
            iconName = focused ? "md-grid-sharp" : "md-grid-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          //       else {
          //     iconName = focused ? "android-messages" : "android-messages";
          //   }
          return (
            <>
              {focused ? (
                <>
                  <View
                    style={{
                      backgroundColor: "#017fed",
                      position: "absolute",
                      //   padding: 20,
                      paddingTop: 15,
                      borderTopEndRadius: 60,
                      borderTopStartRadius: 60,
                      paddingBottom: 50,
                      //   paddingHorizontal: 30,
                      width: 100,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name={iconName}
                      size={40}
                      color={focused ? "#f3bb71" : colors.disabled}
                    />
                  </View>
                </>
              ) : (
                <View style={[styles.viewIconTabs]}>
                  <Ionicons
                    name={iconName}
                    size={26}
                    color={focused ? colors.primary : colors.disabled}
                  />
                </View>
              )}
            </>
          );
        },
        tabBarActiveBackgroundColor: "#017fed",
        tabBarInactiveBackgroundColor: "#017fed",
      })}
    >
      <MainApp.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <MainApp.Screen
        name="Category"
        component={MyMap}
        options={{ headerShown: false }}
      />

      <MainApp.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainApp.Screen
        name="New"
        component={NewScreen}
        options={{ headerShown: false }}
      />

      {userInformation ? (
        <MainApp.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <RootApp.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </MainApp.Navigator>
  );
}

const RootApp = createNativeStackNavigator();
function RootAppStack() {
  return (
    <RootApp.Navigator
      initialRouteName={"MainApp"}
      screenOptions={{ headerShown: false }}
    >
      <RootApp.Screen name="MainApp" component={MainAppStack} />
      <RootApp.Screen name="Welcome" component={WelcomeScreen} />
      <RootApp.Screen name="DetailItem" component={DetailItemScreen} />
      <RootApp.Screen name="CheckAvailable" component={CheckAvailableScreen} />
      <RootApp.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <RootApp.Screen name="SignUp" component={SignUpScreen} />
      <RootApp.Screen name="ListNew" component={ListNewScreen} />
      <RootApp.Screen name="SearchAll" component={SearchAllScreen} />
      <RootApp.Screen name="ListItem" component={ListItemScreen} />
      <RootApp.Screen name="Option" component={OptionScreen} />
      <RootApp.Screen name="Wrong" component={WrongScreen} />
      <RootApp.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
      <RootApp.Screen name="BookingView" component={BookingViewScreen} />
      <RootApp.Screen name="ThankYou" component={ThankYouScreen} />
      <RootApp.Screen name="MyProfile" component={MyProfileScreen} />
      <RootApp.Screen name="ChangePassWord" component={ChangePassWordScreen} />
      <RootApp.Screen name="History" component={HistoryScreen} />
      <RootApp.Screen name="Wishlist" component={WishlistScreen} />
      <RootApp.Screen name="Verification" component={VerificationScreen} />
      <RootApp.Screen name="Setting" component={SettingScreen} />
      <RootApp.Screen name="WebView" component={WebViewScreen} />
    </RootApp.Navigator>
  );
}
const WelcomeApp = createNativeStackNavigator();
function WelcomeAppStack() {
  return (
    <WelcomeApp.Navigator
      initialRouteName={"MainApp"}
      screenOptions={{ headerShown: false }}
    >
      <WelcomeApp.Screen name="Welcome" component={WelcomeScreen} />
    </WelcomeApp.Navigator>
  );
}

export default function Navigation() {
  const showSplash = useSelector((state) => state.app.showSplash);
  const openedApp = useSelector((state) => state.app.openedApp);
  return (
    <NavigationContainer>
      {showSplash
        ? BootStack()
        : !openedApp
        ? RootAppStack()
        : WelcomeAppStack()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    // bottom: 10,
    // left: 10,
    // right: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: Device.isIphoneX() ? 70 : 50,
    borderTopColor: "#FFFFFF",
    paddingTop: Device.isIphoneX() ? 10 : 0,
  },
  shadow: {
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewIconTabs: {
    alignItems: "center",
    marginTop: 4,
  },
  dotCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});
