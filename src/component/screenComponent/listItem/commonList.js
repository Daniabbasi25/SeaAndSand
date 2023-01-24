import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  TouchableScale,
  TextApp,
  Indicator,
  EmptyData,
  SizedBox,
} from "@BaseComponent";
import { getFilter, getList } from "../../../redux/listRedux";
import ItemCar from "./item/itemCar";
import ItemEvent from "./item/itemEvent";
import ItemHotel from "./item/itemHotel";
import ItemSpace from "./item/itemSpace";
import ItemTour from "./item/itemTour";
import ItemBoat from "./item/itemBoat";
import ItemFlight from "./item/itemFlight";
import Modal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import PickLocation from "./filter/pickLocation";
import PickTime from "./filter/pickTime";
import PickSeat from "./filter/pickSeat";
import PickRangePrice from "./filter/pickRangePrice";
import PickScore from "./filter/pickScore";
import PickTerms from "./filter/pickTerms";
import PickGuest from "./filter/pickGuest";
import { useTheme } from "react-native-paper";
import _ from "lodash";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";

const CommonList = ({ type, navigation, showFilter, handleCloseFilter }) => {
  const [data, setData] = useState(null);
  const [params, setParams] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    requestData();
  }, [params]);

  const requestData = () => {
    setData(null);
    if (type) {
      getList(type, params).then((res) => {
        setData(res?.data);
        setTotal(res?.total);
      });
    }
  };
  if (data == null) {
    return <Indicator />;
  }

  const resetParams = () => {
    setParams({});
    setData(null);
  };

  const handleTypeItem = (item, navigation) => {
    switch (type) {
      case "car":
        return <ItemCar item={item} navigation={navigation} />;
      case "event":
        return <ItemEvent item={item} navigation={navigation} />;
      case "hotel":
        return <ItemHotel item={item} navigation={navigation} />;
      case "space":
        return <ItemSpace item={item} navigation={navigation} />;
      case "tour":
        return <ItemTour item={item} navigation={navigation} />;
      case "boat":
        return <ItemBoat item={item} navigation={navigation} />;
      case "flight":
        return <ItemFlight item={item} navigation={navigation} />;
    }
  };

  const headerListResult = () => {
    if (_.isEmpty(params)) return null;
    if (data && _.isEmpty(data)) return null;
    return (
      <View style={styles.wrapHeaderListResult}>
        <TextApp>
          {_.size(data)}{" "}
          {data && _.size(data) > 1
            ? global.language["ResultsForCondition"]
            : global.language["ResultForCondition"]}
        </TextApp>
        <SizedBox width={5} />
        <TouchableScale>
          <Ionicons
            name={"close-circle-outline"}
            onPress={() => resetParams()}
            size={22}
          />
        </TouchableScale>
      </View>
    );
  };

  return (
    <View>
      <ModalFilter
        showFilter={showFilter}
        handleCloseFilter={() => handleCloseFilter()}
        params={params}
        setParams={(params) => setParams(params)}
        type={type}
      />
      <FlatList
        data={data}
        ListHeaderComponent={() => headerListResult()}
        renderItem={({ item }) => handleTypeItem(item, navigation)}
        keyExtractor={(item) => `key_${item?.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentFlatList}
        ListEmptyComponent={() => (
          <EmptyData
            message={
              global.language["NoResultsContainingYourSearchConditionWereFound"]
            }
            action={() => resetParams()}
          />
        )}
      />
    </View>
  );
};

const ModalFilter = ({
  showFilter,
  handleCloseFilter,
  setParams,
  type,
  params,
}) => {
  const refPickLocation = useRef(null);
  const refPickSourceLocation = useRef(null);
  const refPickDestinationLocation = useRef(null);
  const refPickTime = useRef(null);
  const refPickGuest = useRef(null);
  const refPickRangePrice = useRef(null);
  const refPickReviewScore = useRef(null);
  const refPickStarRate = useRef(null);
  const refPickTerms = useRef(null);

  const appConfig = useSelector((state) => state.app.appConfig);
  const [listFilter, setListFilter] = useState(null);
  const [canShowContent, setShowContent] = useState(false);

  const { colors } = useTheme();

  const closeModal = () => {
    return handleCloseFilter();
  };

  const requestData = () => {
    if (!listFilter) {
      getFilter(type).then((res) => {
        setListFilter(res.data);
        setShowContent(true);
      });
    } else {
      setShowContent(true);
    }
  };

  const getDataFromRef = () => {
    let dataSearch = {};
    refPickLocation.current?.getData()?.location_id &&
      (dataSearch = { ...dataSearch, ...refPickLocation.current.getData() });
    refPickSourceLocation.current?.getData() &&
      (dataSearch = {
        ...dataSearch,
        ...refPickSourceLocation.current.getData(),
      });
    refPickDestinationLocation.current?.getData() &&
      (dataSearch = {
        ...dataSearch,
        ...refPickDestinationLocation.current.getData(),
      });
    refPickGuest.current?.getData() &&
      (dataSearch = {
        ...dataSearch,
        ...refPickGuest.current.getData()?.guests,
      });
    refPickRangePrice.current?.getData() &&
      (dataSearch = { ...dataSearch, ...refPickRangePrice.current.getData() });
    refPickStarRate.current?.getData() &&
      (dataSearch = { ...dataSearch, ...refPickStarRate.current.getData() });
    refPickReviewScore.current?.getData() &&
      !_.isEmpty(refPickReviewScore.current?.getData()?.review_score) &&
      (dataSearch = { ...dataSearch, ...refPickReviewScore.current.getData() });
    refPickTerms.current?.getData() &&
      !_.isEmpty(refPickTerms.current?.getData()?.terms) &&
      (dataSearch = { ...dataSearch, ...refPickTerms.current.getData() });
    // dataSearch = { ...dataSearch, service_name: type };

    if (_.isEmpty(dataSearch)) {
      alert("Error get data");
    } else {
      setParams(dataSearch);
      closeModal();
    }
  };

  const topModal = () => (
    <View style={styles.wrapTopModal}>
      <TextApp primary h7 bold>
        {global.language[`Search`]}
      </TextApp>
      <TouchableScale onPress={() => closeModal()}>
        <MaterialIcons name={"close"} size={30} />
      </TouchableScale>
    </View>
  );

  const handleTypeSearch = () => {
    if (!appConfig) return null;
    let config = appConfig["service_search_forms"][type];
    config = _.concat(config, listFilter);
    let conditionSearch = [];
    _.forEach(Object.values(config), (element, index) => {
      switch (element.field) {
        case "location":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickLocation ref={refPickLocation} element={element} />
            </View>
          );
        case "from_where":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickLocation ref={refPickSourceLocation} element={element} />
            </View>
          );
        case "to_where":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickLocation
                ref={refPickDestinationLocation}
                element={element}
              />
            </View>
          );
        case "date":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickTime ref={refPickTime} element={element} />
            </View>
          );
        case "guests":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickGuest ref={refPickGuest} element={element} />
            </View>
          );
        case "seat_type":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickSeat ref={refPickGuest} element={element} />
            </View>
          );
        case "price_range":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickRangePrice ref={refPickRangePrice} element={element} />
            </View>
          );
        case "review_score":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickScore ref={refPickReviewScore} element={element} />
            </View>
          );
        case "star_rate":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickScore ref={refPickStarRate} element={element} />
            </View>
          );
        case "terms":
          return conditionSearch.push(
            <View key={`condition_${index}`}>
              <PickTerms ref={refPickTerms} element={element} />
            </View>
          );
      }
    });
    return conditionSearch;
  };

  const middleModal = () => {
    return <View style={styles.wrapMiddleModal}>{handleTypeSearch()}</View>;
  };

  const applyCondition = () => {
    return (
      <View style={styles.wrapApplyCondition}>
        <TouchableScale
          onPress={() => getDataFromRef()}
          style={[
            styles.touchableApplyCondition,
            { backgroundColor: colors.primary },
          ]}
        >
          <TextApp bold quaternary>
            {global.language["Search"].toUpperCase()}
          </TextApp>
        </TouchableScale>
      </View>
    );
  };
  return (
    <Modal
      isVisible={showFilter}
      backdropTransitionOutTiming={0}
      style={styles.modal}
      onModalShow={() => requestData()}
      onModalWillHide={() => setShowContent(false)}
    >
      <SafeAreaView style={styles.safeView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {canShowContent && listFilter ? (
            <Animatable.View
              delay={50}
              animation={"fadeIn"}
              style={styles.wrapContentModal}
            >
              {topModal()}
              {middleModal()}
            </Animatable.View>
          ) : (
            <View style={styles.wrapContentModal}>
              <Indicator />
            </View>
          )}
        </ScrollView>
        {applyCondition()}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    margin: 0,
    backgroundColor: "#FFFFFF",
  },
  safeView: {
    flex: 1,
  },
  wrapContentModal: {
    flex: 1,
  },
  wrapTopModal: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  wrapMiddleModal: {},
  wrapApplyCondition: {
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  touchableApplyCondition: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  contentContainerStyle: {
    paddingVertical: 10,
    // alignItems: 'center'
  },
  contentFlatList: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignItems: "center",
  },
  wrapHeaderListResult: {
    flexDirection: global.isRtl ? "row-reverse" : "row",
    alignItems: "center",
  },
});
export default React.memo(CommonList);
