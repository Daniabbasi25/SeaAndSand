import ConnectionAPI from '../connection';
import { getDataHomePage } from '../config/path';

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

export const getDataHome = () => async (dispatch, getState) => {
    try {
        const response = await ConnectionAPI({ url: getDataHomePage, method: 'GET' });
        dispatch(saveData(Action.DATA_HOME, response));
        return response;
    }
    catch (err) {
        console.log('---getDataHome---', err);
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