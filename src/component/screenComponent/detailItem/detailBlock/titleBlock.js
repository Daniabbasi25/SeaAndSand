/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { TextApp } from "@BaseComponent";

const TitleBlock = ({ title, style = {} }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <TextApp bold body primary style={styles.transformText}>
        {title}
      </TextApp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  transformText: {
    textAlign: global.isRtl ? "right" : "left",
  },
});

export default React.memo(TitleBlock);
