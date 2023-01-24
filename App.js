/** @format */

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import store from "./src/redux/store";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { theme } from "./src/config/theme";
import Orientation from "react-native-orientation-locker";
import Toast, { BaseToast } from "react-native-toast-message";
import { Device } from "@Helper";
import { VersionUpdate } from "@BaseComponent";
import OneSignal from "react-native-onesignal";
import { PUSH_NOTIFICATION_KEY } from "react-native-dotenv";

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (PUSH_NOTIFICATION_KEY) {
      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId(PUSH_NOTIFICATION_KEY);
    }
  }, []);

  const useLightTheme = true;
  let colorToast = useLightTheme
    ? theme.colors.light.primary
    : theme.colors.dark.primary;
  const widthToast = Device.width - 20;
  const toastConfig = {
    success: ({ text1, text2, props, ...rest }) => {
      const marginTop = rest?.position == "top" && Device.isIphoneX() ? 20 : 0;
      const marginBottom =
        rest?.position == "bottom" && Device.isIphoneX() ? 20 : 0;
      return (
        <BaseToast
          {...rest}
          style={{
            borderLeftColor: colorToast,
            marginTop: marginTop,
            marginBottom: marginBottom,
            width: widthToast,
          }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          text1Style={{
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "Montserrat",
          }}
          text2Style={{
            fontSize: 14,
            fontFamily: "Montserrat",
          }}
          text1={text1}
          text2={text2}
        />
      );
    },
    error: ({ text1, text2, props, ...rest }) => {
      const marginTop = rest?.position == "top" && Device.isIphoneX() ? 20 : 0;
      const marginBottom =
        rest?.position == "bottom" && Device.isIphoneX() ? 20 : 0;
      return (
        <BaseToast
          {...rest}
          style={{
            borderLeftColor: "red",
            marginTop: marginTop,
            marginBottom: marginBottom,
            width: widthToast,
          }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          text1Style={{
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "Montserrat",
          }}
          text2Style={{
            fontSize: 14,
            fontFamily: "Montserrat",
          }}
          text1={text1}
          text2={text2}
        />
      );
    },
    info: ({ text1, text2, props, ...rest }) => {
      const marginTop = rest?.position == "top" && Device.isIphoneX() ? 20 : 0;
      const marginBottom =
        rest?.position == "bottom" && Device.isIphoneX() ? 20 : 0;
      return (
        <BaseToast
          {...rest}
          style={{
            borderLeftColor: "#edb95e",
            marginTop: marginTop,
            marginBottom: marginBottom,
            width: widthToast,
          }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          text1Style={{
            fontSize: 18,
            fontWeight: "400",
            fontFamily: "Montserrat",
          }}
          text2Style={{
            fontSize: 14,
            fontFamily: "Montserrat",
          }}
          text1={text1}
          text2={text2}
        />
      );
    },
    /* 
      or create a completely new type - `my_custom_type`,
      building the layout from scratch
    */
    my_custom_type: ({ text1, props, ...rest }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    ),
  };
  return (
    <Provider store={store}>
      <PaperProvider
        theme={
          useLightTheme
            ? {
                ...DefaultTheme,
                ...theme,
                colors: theme.colors.light,
                fonts: configureFonts(theme.fontConfig),
              }
            : {
                ...DefaultTheme,
                ...theme,
                colors: theme.colors.dark,
                fonts: configureFonts(theme.fontConfig),
              }
        }
      >
        <Navigation />
        <VersionUpdate />
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    </Provider>
  );
};
export default App;
