import React from "react";
import BaseScreen from "../base";
import { ListCategory } from "@CategoryScreenComponent";

const CategoryScreen = ({ navigation }) => {
  return (
    <BaseScreen>
      <ListCategory navigation={navigation} />
    </BaseScreen>
  );
};
export default React.memo(CategoryScreen);
