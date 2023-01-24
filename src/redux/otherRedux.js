import ConnectionAPI from '../connection';
import { bookingHistory, getWishlist } from '../config/path';

// action types
export const Action = {
    DATA_HOME: 'DATA_HOME'
}

// default state
export const defaultState = {
    dataHome: null,
}

// action creator
export const saveData = (type, data) => {
    return {
        type: type,
        payload: data
    }
}

export const getListWishlist = async () => {
    try {
        const response = await ConnectionAPI({ url: getWishlist, method: 'GET' });
        return response;
    }
    catch (err) {
        console.log('---getListWishlist---', err);
    }
}

export const getListBookingHistory = async () => {
    try {
        const response = await ConnectionAPI({ url: bookingHistory, method: 'GET' });
        return response;
    }
    catch (err) {
        console.log('---getListBookingHistory---', err);
    }
}


// reducer
export const reducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Action.DATA_HOME:
            return { ...state, dataHome: payload };
        default:
            return state
    }
};