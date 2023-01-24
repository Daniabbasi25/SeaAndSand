import ConnectionAPI from '../connection';
import { getNews, getNewsDetail } from '../config/path';

// action types
export const Action = {
    LIST_NEW: 'LIST_NEW',
    TOTAL_PAGE: 'TOTAL_PAGE',
    TOTAL: 'TOTAL',
}

// default state
export const defaultState = {
    listNew: null,
    totalPage: null,
    total: null
}

// action creator
export const saveData = (type, data) => {
    return {
        type: type,
        payload: data
    }
}

export const getListNew = () => async (dispatch) => {
    try {
        const response = await ConnectionAPI({ url: getNews, method: 'GET' });
        if (response.status) {
            dispatch(saveData(Action.LIST_NEW, response?.data))
            dispatch(saveData(Action.TOTAL_PAGE, response?.total_pages))
            dispatch(saveData(Action.TOTAL, response?.total))
        }
    }
    catch (err) {
        console.log('---getListNew---', err);
    }
}


// reducer
export const reducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Action.LIST_NEW:
            return { ...state, listNew: payload };
        case Action.TOTAL_PAGE:
            return { ...state, totalPage: payload };
        case Action.TOTAL:
            return { ...state, total: payload };
        default:
            return state
    }
};