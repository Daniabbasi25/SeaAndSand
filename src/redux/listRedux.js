import ConnectionAPI from "../connection";
import {
  // search
  searchHotel,
  searchTour,
  searchSpace,
  searchCar,
  searchEvent,
  searchFlight,
  searchBoat,
  //filter
  getFilterSearchHotel,
  getFilterSearchTour,
  getFilterSearchSpace,
  getFilterSearchCar,
  getFilterSearchEvent,
  getFilterSearchBoat,
  getFilterSearchFlight,
  //location
  getLocation,
} from "../config/path";

// action types
export const Action = {
  SEARCH_DATA: "SEARCH_DATA",
  LOCATION: "LOCATION",
};

// default state
export const defaultState = {
  searchData: null,
  location: null,
};

// action creator
export const saveData = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};

const handleOtherServiceSearch = (type) => {
  return `api/${type}/search`;
};
const handleGetListURL = (type) => {
  let correctUrl = "";
  switch (type) {
    case "hotel":
      correctUrl = searchHotel;
      break;
    case "car":
      correctUrl = searchCar;
      break;
    case "tour":
      correctUrl = searchTour;
      break;
    case "space":
      correctUrl = searchSpace;
      break;
    case "event":
      correctUrl = searchEvent;
      break;
    case "flight":
      correctUrl = searchFlight;
      break;
    case "boat":
      correctUrl = searchBoat;
      break;
    default:
      correctUrl = handleOtherServiceSearch(type);
      break;
  }
  return correctUrl;
};

const handleOtherServiceFilter = (type) => {
  return `api/${type}/filters`;
};

const handleFilterURL = (type) => {
  let correctUrl = "";
  switch (type) {
    case "hotel":
      correctUrl = getFilterSearchHotel;
      break;
    case "car":
      correctUrl = getFilterSearchCar;
      break;
    case "tour":
      correctUrl = getFilterSearchTour;
      break;
    case "space":
      correctUrl = getFilterSearchSpace;
      break;
    case "event":
      correctUrl = getFilterSearchEvent;
      break;
    case "flight":
      correctUrl = getFilterSearchFlight;
      break;
    case "boat":
      correctUrl = getFilterSearchBoat;
      break;
    default:
      correctUrl = handleOtherServiceFilter(type);
      break;
  }
  return correctUrl;
};

export const getListLocation = async (params) => {
  try {
    const response = await ConnectionAPI({
      url: getLocation,
      method: "GET",
      params,
    });
    if (response?.status) {
      return response;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFilter = async (type) => {
  try {
    const response = await ConnectionAPI({
      url: handleFilterURL(type),
      method: "GET",
    });
    return response;
  } catch (err) {
    console.log("---getFilter---", err);
  }
};
export const getList = async (type, params) => {
  try {
    params = { ...params, limit: 1000, start: 0 };
    const response = await ConnectionAPI({
      url: handleGetListURL(type),
      method: "GET",
      params,
    });
    return response;
  } catch (err) {
    console.log("---getList---", err);
  }
};

// reducer
export const reducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Action.SEARCH_DATA:
      return { ...state, searchData: payload };
    case Action.LOCATION:
      return { ...state, location: payload };
    default:
      return state;
  }
};
