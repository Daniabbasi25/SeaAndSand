import ConnectionAPI from '../connection';
import { searchAllService } from '../config/path';

// action types
export const Action = {
    SEARCH_DATA: 'SEARCH_DATA'
}

// default state
export const defaultState = {
    searchData: null,
}

// action creator
export const saveData = (type, data) => {
    return {
        type: type,
        payload: data
    }
}

export const searchAll = async (params) => {
    try {
        const response = await ConnectionAPI({ url: searchAllService, method: 'GET', ...params });
        return response;
    }
    catch (err) {
        console.log('---searchAll---', err);
    }
}


// reducer
export const reducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Action.SEARCH_DATA:
            return { ...state, searchData: payload };
        default:
            return state
    }
};