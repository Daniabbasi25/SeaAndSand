import RNFetchBlob from "rn-fetch-blob";
import { Identify } from '@Helper'
import { BASE_DOMAIN, IS_DEBUG } from 'react-native-dotenv';

const ConnectionAPI = ({ url, method = 'GET', params }) => {

    const setHeader = () => {
        let _headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            credentials: 'include'
        };
        if (Identify.getToken()) {
            _headers['Authorization'] = "Bearer " + Identify.getToken();
        }

        return _headers;
    }

    const initURL = () => {
        let _fullUrl = BASE_DOMAIN;
        if (_fullUrl.lastIndexOf('/') !== _fullUrl.length - 1) {
            _fullUrl += '/'
        }

        _fullUrl += url;
        if (method === 'GET' && params) {
            let getParams = Object.keys(params).map((key) => {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(params[key]);
            }).join('&');
            _fullUrl += "?" + getParams;
        }
        if (_fullUrl.includes('?')) {
            _fullUrl += "&lang=" + Identify.languageSelected;
        }
        else {
            _fullUrl += "?lang=" + Identify.languageSelected;
        }

        if (IS_DEBUG) {
            console.log(_fullUrl)
        }
        return _fullUrl;
    }

    let bodyFormData = [];

    if (method === 'POST' && params) {
        Object.keys(params).forEach(key => {
            if (params[key]) {
                bodyFormData.push({ name: key, data: params[key].toString() });
            }
        });
    }
    return RNFetchBlob
        .config({
            trusty: true
        })
        .fetch(
            method,
            initURL(),
            setHeader(),
            bodyFormData.length > 0 ? bodyFormData : null
        )
        .then((res) => {
            let data = null
            try {
                data = JSON.parse(res.text());
                if (IS_DEBUG) {
                    console.log(data)
                }
            }
            catch (err) {
                console.log(err)
                console.log(res)
                data = {
                    data: {
                        success: false
                    }
                }
            }
            return data
        })
        .catch((err) => {
            console.log(err)

        });
}
export default ConnectionAPI