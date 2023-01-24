import React from "react";
import BaseScreen from "../base";
import { HeaderApp } from "@BaseComponent";
import WebView from "react-native-webview";
import { Identify } from "@Helper";

const BookingViewScreen = ({ navigation, route }) => {
  const { url, code } = route?.params;
  const token = Identify.getToken();

  const _onNavigationStateChange = (webState) => {
    if (webState.url.includes("thankyou")) {
      navigation.navigate("ThankYou");
    }
  };
  return (
    <BaseScreen
      usePadding
      header={
        <HeaderApp middleContent={global.language[`Payment`]} isPaddingTop />
      }
    >
      <WebView
        originWhitelist={["*"]}
        thirdPartyCookiesEnabled={true}
        allowsInlineMediaPlayback
        startInLoadingState={true}
        source={{
          uri: url.concat(`?token=${token}`),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
        style={{
          width: "100%",
          height: "150%",
        }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        javaScriptEnabled={true}
        onNavigationStateChange={(webState) =>
          _onNavigationStateChange(webState)
        }
      />
    </BaseScreen>
  );
};
export default React.memo(BookingViewScreen);
