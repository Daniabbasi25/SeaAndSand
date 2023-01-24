import ConnectionAPI from '../connection';
import {
    getDetailHotel,
    getDetailTour,
    getDetailSpace,
    getDetailCar,
    getDetailEvent,
    getDetailBoat,
    getDetailFlight,
    checkAvailbleHotel,
    checkAvailbleTour,
    checkAvailbleSpace,
    checkAvailbleCar,
    checkAvailbleEvent,
    checkAvailbleBoat,
    checkAvailbleFlight,
    addToCart as addToCartAPI,
    addToWishlist,
    writeReviewHotel,
    writeReviewTour,
    writeReviewSpace,
    writeReviewEvent,
    writeReviewCar,
    writeReviewBoat,
    writeReviewFlight,
} from '../config/path';

// action types
export const Action = {
    DATA_ITEM: 'DATA_ITEM',
    LIST_SERVICE_AVAILABLE: 'LIST_SERVICE_AVAILABLE'
}

// default state
export const defaultState = {
    dataItem: null,
    listServiceAvailable: null
}

// action creator
export const saveData = (type, data) => {
    return {
        type: type,
        payload: data
    }
}

const handleURL = (type, id) => {
    let correctUrl = "";
    switch (type) {
        case 'hotel':
            correctUrl = getDetailHotel;
            break;
        case 'car':
            correctUrl = getDetailCar;
            break;
        case 'tour':
            correctUrl = getDetailTour;
            break;
        case 'space':
            correctUrl = getDetailSpace;
            break;
        case 'event':
            correctUrl = getDetailEvent;
            break;
        case 'boat':
            correctUrl = getDetailBoat;
            break;
        case 'flight':
            correctUrl = getDetailFlight;
            break;
    }
    return correctUrl += id;
}

const handleAvailabelURL = (type, id) => {
    let correctUrl = "";
    switch (type) {
        case 'hotel':
            correctUrl = checkAvailbleHotel;
            break;
        case 'car':
            correctUrl = checkAvailbleCar;
            break;
        case 'tour':
            correctUrl = checkAvailbleTour;
            break;
        case 'space':
            correctUrl = checkAvailbleSpace;
            break;
        case 'event':
            correctUrl = checkAvailbleEvent;
            break;
        case 'boat':
            correctUrl = checkAvailbleBoat;
            break;
        case 'flight':
            correctUrl = checkAvailbleFlight;
            break;
    }
    return correctUrl += id;
}

export const getDataItem = (type, id) => async (dispatch, getState) => {
    try {
        if (getState().detail.dataItem) {
            dispatch(saveData(Action.DATA_ITEM, null));
        }
        const response = await ConnectionAPI({ url: handleURL(type, id), method: 'GET' });
        dispatch(saveData(Action.DATA_ITEM, response.data));
        return response.data;
    }
    catch (err) {
        console.log('---getDataItem---', err);
    }
}

export const getDataItemToReturn = async (type, id) => {
    try {
        const response = await ConnectionAPI({ url: handleURL(type, id), method: 'GET' });
        return response.data;
    }
    catch (err) {
        console.log('---getDataItemToReturn---', err);
    }
}

export const getAvailableService = async (type, id, params) => {
    try {
        const response = await ConnectionAPI({ url: handleAvailabelURL(type, id), method: 'GET', params });
        return response;
    }
    catch (err) {
        console.log('---getAvailableService---', err);
    }
}

export const addToCart = async (params) => {
    try {
        const response = await ConnectionAPI({ url: addToCartAPI, method: 'POST', params });
        return response;
    }
    catch (err) {
        console.log('---addToCart---', err);
    }
}
export const handleAddToWishlist = async (params) => {
    try {
        const response = await ConnectionAPI({ url: addToWishlist, method: 'POST', params });
        return response;
    }
    catch (err) {
        console.log('--handleAddToWishlist--', err);
    }
}

const handleUrlReview = (type, id) => {
    switch (type) {
        case 'hotel':
            return writeReviewHotel + id;
        case 'tour':
            return writeReviewTour + id;
        case 'space':
            return writeReviewSpace + id;
        case 'event':
            return writeReviewEvent + id;
        case 'car':
            return writeReviewCar + id;
        case 'boat':
            return writeReviewBoat + id;
        case 'flight':
            return writeReviewFlight + id;
    }
}
export const addReview = async (type, id, params) => {
    try {
        const response = await ConnectionAPI({ url: handleUrlReview(type, id), method: 'POST', params });
        return response;
    }
    catch (err) {
        console.log('--wishList--', err);
    }
}

// reducer
export const reducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Action.DATA_ITEM:
            return { ...state, dataItem: payload };
        case Action.LIST_SERVICE_AVAILABLE:
            return { ...state, listServiceAvailable: payload };
        default:
            return state
    }
};