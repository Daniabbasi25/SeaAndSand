import ConnectionAPI from '../connection';
import {
    getConfigs,
    login as loginAPI,
    getCurrentUser,
    logout as logoutAPI,
    register as registerAPI,
    changePassword as changePasswordAPI,
    updateUserInformation
} from '../config/path';
import { Identify, Storage } from '@Helper';

// action types
export const Action = {
    USER_INFORMATION: 'USER_INFORMATION'
}

// default state
export const defaultState = {
    userInformation: null,
}

// action creator
export const saveData = (type, data) => {
    return {
        type: type,
        payload: data
    }
}

export const getAppConfig = () => async (dispatch) => {
    try {
        const response = await ConnectionAPI({ url: getConfigs, method: 'GET' });
        dispatch(saveData(Action.APP_CONFIG, response));
    }
    catch (err) {
        console.log('---getAppConfig---', err);
    }
}

export const getUserInfor = async () => {
    try {
        const response = await ConnectionAPI({ url: getCurrentUser, method: 'GET' });
        return response;
    }
    catch (err) {
        console.log(err);
    }
}
export const login = (params) => async (dispatch) => {
    try {
        let temParams = { ...params };
        delete temParams['remember'];
        const response = await ConnectionAPI({ url: loginAPI, method: 'POST', params: temParams });
        if (response.status) {
            Identify.setToken(response?.access_token);
            const userInfor = await getUserInfor();
            if (userInfor?.status) {
                if (params?.remember) {
                    Storage.saveRemembermeLoginInfo(params);
                }
                Storage.saveCustomerAutoLoginInfo(temParams);
                dispatch(saveData(Action.USER_INFORMATION, userInfor?.data));
                return {
                    status: true,
                    message: 'Welcome back!'
                }
            }
            else {
                return {
                    status: false,
                    message: 'Wrong when get user information. Please try later!'
                }
            }
        }
        return {
            status: false,
            message: response.message
        }
    }
    catch (err) {
        console.log('---login---', err);
    }
}

export const register = async (params) => {
    try {
        const response = await ConnectionAPI({ url: registerAPI, method: 'POST', params });
        if (response.status) {
            let remember = {
                email: params?.email,
                password: params?.password,
                remember: true
            }
            Storage.saveRemembermeLoginInfo(remember);
        }
        return response;
    }
    catch (err) {
        console.log('---register---', err);
    }
}
export const changePassword = async (params) => {
    try {
        const response = await ConnectionAPI({ url: changePasswordAPI, method: 'POST', params });
        return response;
    }
    catch (err) {
        console.log('---changePassword---', err);
    }
}

export const updateInformation = async (params) => {
    try {
        const response = await ConnectionAPI({ url: updateUserInformation, method: 'POST', params });
        return response;
    }
    catch (err) {
        console.log('---updateInformation---', err);
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await ConnectionAPI({ url: logoutAPI, method: 'POST' });
        if (response.status) {
            Storage.removeAutologinInfo();
            dispatch(saveData(Action.USER_INFORMATION, null));
            return true
        }
        return false
    }
    catch (err) {
        console.log('---logout---', err);
    }
}

export const reNewUserInformation = () => async (dispatch) => {
    try {
        const response = await ConnectionAPI({ url: getCurrentUser, method: 'GET' });
        if(response?.status) {
            dispatch(saveData(Action.USER_INFORMATION, response?.data));
        }
        return response;
    }
    catch (err) {
        console.log('---reNewUserInformation---', err);
    }
}

// reducer
export const reducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Action.USER_INFORMATION:
            return { ...state, userInformation: payload };
        default:
            return state
    }
};