import React, { useState } from "react";
import BaseScreen from "../base";
import { CommonList } from "@ListItemScreenComponent";
import { HeaderApp, TouchableScale } from "@BaseComponent";
import { Identify } from "@Helper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";

const ListItemScreen = ({ route, navigation }) => {
  const { name } = route?.params;
  const { colors } = useTheme();
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const filter = () => {
    return (
      <TouchableScale onPress={() => handleShowFilter()} scaleTo={0.8}>
        <MaterialIcons name={"tune"} size={28} color={colors.primary} />
      </TouchableScale>
    );
  };
  return (
    <BaseScreen
      usePadding
      header={
        <HeaderApp
          middleContent={Identify.upperCaseFirstCharacter(name)}
          rightContent={filter()}
        />
      }
    >
      <CommonList
        type={name}
        navigation={navigation}
        showFilter={showFilter}
        handleCloseFilter={() => handleCloseFilter()}
      />
    </BaseScreen>
  );
};
export default React.memo(ListItemScreen);
