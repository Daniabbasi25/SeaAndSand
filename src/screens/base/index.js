/** @format */

import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useTheme } from "react-native-paper";

const BaseScreen = ({ ...props }) => {
  const { spacingLayout } = useTheme();
  if (props?.scroll) {
    if (props?.notSafe) {
      return (
        <>
          <StatusBar translucent backgroundColor="transparent" />
          <ScrollView
            style={[
              styles.scrollScreen,
              {
                paddingHorizontal: props?.usePadding
                  ? spacingLayout.horizontal
                  : 0,
              },
            ]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentScroll}
          >
            {props.children}
          </ScrollView>
          {props?.fixedContent}
        </>
      );
    }
    return (
      <>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <SafeAreaView
          style={[
            styles.wrapScreen,
            {
              backgroundColor: props?.backgroundColor
                ? props?.backgroundColor
                : styles.scrollScreen.backgroundColor,
            },
          ]}
        >
          {props?.header ? props.header : <></>}
          <ScrollView
            style={[
              styles.scrollScreen,
              {
                paddingHorizontal: props?.usePadding
                  ? spacingLayout.horizontal
                  : 0,
              },
            ]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentScroll}
          >
            {props.children}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <SafeAreaView
          style={[
            styles.wrapScreen,
            {
              backgroundColor: props?.backgroundColor
                ? props?.backgroundColor
                : styles.viewScreen.backgroundColor,
            },
          ]}
        >
          {props?.header ? props.header : <></>}
          <View
            style={[
              styles.viewScreen,
              {
                paddingHorizontal: props?.usePadding
                  ? spacingLayout.horizontal
                  : 0,
              },
            ]}
          >
            {props.children}
          </View>
        </SafeAreaView>
      </>
    );
  }
};
const styles = StyleSheet.create({
  wrapScreen: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },

  scrollScreen: {
    flex: 1,
    // bottom: "48%",
  },
  contentScroll: {
    paddingBottom: 70,
  },
  viewScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default React.memo(BaseScreen);
