/** @format */

import React from "react";
import {
  HeaderHome,
  SearchHome,
  CategoryHome,
  DynamicBlockHome,
} from "@HomeScreenComponent";
import { useSelector } from "react-redux";
import _ from "lodash";

const dynamicLayout = (navigation) => {
  const dataHome = useSelector((state) => state.home.dataHome);
  if (_.isEmpty(dataHome)) return <></>;

  let layout = [];
  // load dynamic block from configs
  _.forEach(dataHome?.data, (element, index) => {
    switch (element?.type) {
      // case "form_search_all_service":
      //   layout.push(
      //     <SearchHome
      //       navigation={navigation}
      //       key={`home_block_number_${index}`}
      //       data={element}
      //     />
      //   );
      //   break;
      // case 'offer_block':
      //     layout.push(<DynamicBlockHome navigation={navigation} key={`home_block_number_${index}`} data={element} />);
      //     break;
      case "list_hotel":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      case "list_locations":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      case "list_tours":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      case "list_space":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      case "list_car":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      case "list_event":
        element &&
          !_.isEmpty(element?.model?.data) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
      // case 'list_news':
      //     layout.push(<DynamicBlockHome navigation={navigation} key={`home_block_number_${index}`} data={element} />);
      //     break;
      // case 'call_to_action':
      //     layout.push(<DynamicBlockHome navigation={navigation} key={`home_block_number_${index}`} data={element} />);
      //     break;
      case "testimonial":
        element &&
          !_.isEmpty(element?.model?.list_item) &&
          layout.push(
            <DynamicBlockHome
              navigation={navigation}
              key={`home_block_number_${index}`}
              data={element}
            />
          );
        break;
    }
  });
  //insert custom or static block
  // layout.splice(0, 0, <HeaderHome dataHome={dataHome} key={`home_block_name_header}`} navigation={navigation} />);
  // layout.splice(2, 0, <CategoryHome dataHome={dataHome} navigation={navigation} key={`home_block_name_category`} />);
  return <>{layout}</>;
};
export { dynamicLayout };
