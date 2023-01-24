/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { TextApp, SizedBox } from "@BaseComponent";
import StarRating from "react-native-star-rating";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const NameItem = ({ title, address, star_rate, review_score, data }) => {
  const handleFeature = (icon, label) => {
    return (
      <View style={styles.itemHandleFeature}>
        <Fontisto name={icon} size={20} />
        <TextApp button style={{ marginTop: 5 }}>
          {label}
        </TextApp>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <View style={styles.leftContent}>
          {star_rate && (
            <StarRating
              disabled={true}
              maxStars={5}
              rating={Number(star_rate)}
              fullStarColor={"#FDCC0D"}
              starSize={16}
              containerStyle={styles.star}
            />
          )}
          <SizedBox height={5} />
          <TextApp bold h8 primary>
            {title}
          </TextApp>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.labelReview}>
            <TextApp h8 quaternary bold>
              {review_score?.score_total}
              <TextApp medium quaternary>
                /5
              </TextApp>
            </TextApp>
          </View>
          <TextApp bold title primary>
            {review_score?.score_text}
          </TextApp>
          {global.isRtl ? (
            <TextApp caption>
              {" "}
              {review_score?.total_review < 1
                ? global.language["Review"]
                : global.language["Reviews"]}
              <TextApp primary bold>
                {" "}
                {`${review_score?.total_review}`}
              </TextApp>{" "}
              {global.language["From"]}
            </TextApp>
          ) : (
            <TextApp caption>
              {global.language["From"]}{" "}
              <TextApp primary bold>{`${review_score?.total_review}`}</TextApp>{" "}
              {review_score?.total_review < 1
                ? global.language["Review"]
                : global.language["Reviews"]}
            </TextApp>
          )}
        </View>
      </View>

      <View style={styles.information}>
        <View style={styles.location}>
          <EvilIcons name={"location"} size={20} />
          <TextApp button>{address}</TextApp>
        </View>
      </View>
      {data && data?.object_model == "boat" && (
        <View style={styles.configuration}>
          {data?.cabin && handleFeature("sait-boat", data?.cabin)}
          {data?.max_guest && handleFeature("persons", data?.max_guest)}
          {data?.length && handleFeature("sait-boat", data?.length)}
          {data?.speed && handleFeature("clock", data?.speed)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 10,
  },
  information: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  location: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "70%",
    paddingHorizontal: 2,
  },
  star: {
    width: 110,
  },
  wrapTitle: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
  },
  leftContent: {
    width: "70%",
    alignItems: global.isRtl ? "flex-end" : "flex-start",
  },
  rightContent: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 5,
  },
  labelReview: {
    backgroundColor: "#4386F9",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 3,
  },
  configuration: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
    marginTop: 5,
  },
  itemHandleFeature: {
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default React.memo(NameItem);
