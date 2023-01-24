import { Platform, Dimensions } from 'react-native'


export default class Device {
    static width = Dimensions.get('screen').width;
    static height = Dimensions.get('screen').height;
    static platform = null;
    static deviceName = '';


    static isIphoneX() {
        if (!this.platform) {
            this.platform = Platform.OS;
        }
        const isX = this.platform === 'ios' && (Dimensions.get("window").height > 800 || Dimensions.get("window").width > 800) ? true : false
        return isX;
    }

    static getDeviceName() {
        return this.deviceName;
    }

    static setDeviceName(device) {
        this.deviceName = device;
    }
}