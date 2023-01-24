import _ from "lodash";
import { APP_NAME, BASE_DOMAIN } from "react-native-dotenv";

export default class Identify {
  static _token = null;
  static _isDebug = false;
  static languageSelected = "en";
  static language = null;
  static isRtl = false;
  static currency = {
    title: "Dollar",
    code: "USD",
    symbol: "$",
  };
  static registeredDevice = false;

  static isDev() {
    return this._isDebug;
  }

  static getToken() {
    return this._token;
  }

  static getAppName() {
    return APP_NAME;
  }
  static setToken(token) {
    if (!token) return;
    this._token = token;
  }

  static getCurrentTime() {
    let date = new Date();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();
    return `${hour}:${minutes} ${getDay}-${getMonth}-${getYear}`;
  }

  static isWhiteSpace(s) {
    return /\s/g.test(s);
  }
  static upperCaseFirstCharacter(string) {
    if (!string) {
      return null;
    }
    let word = string.split(" ");
    let StringAfter = [];
    word.forEach((w) => {
      StringAfter.push(w.charAt(0).toUpperCase() + w.slice(1));
    });
    return StringAfter.join(" ");
  }

  static isExistValue(value) {
    if (!value) return false;
    else if (value == 0) return false;
    else return true;
  }
  static generateImageUrl(name) {
    if (name) {
      return this.checkBaseDomain(BASE_DOMAIN) + "images/" + name;
    } else {
      return null;
    }
  }
  static handleErrorMessage = (message) => {
    if (_.isString(message)) {
      return message;
    }
    let msg = null;
    if (_.isObject(message)) {
      _.forEach(Object.values(message), (e) => {
        if (e && _.size(e) > 0 && !msg) {
          msg = e[0];
        }
      });
    }
    return msg ? msg : "Something went wrongs!";
  };
  static formatCurrency = (currency) => {
    if (currency) return currency?.toLocaleString("it-IT");
    return "";
  };

  static handleCurrency = (currency) => {
    if (currency) {
      let newCurrency = currency.toString();
      if (newCurrency.includes(global.currency.symbol)) {
        newCurrency = newCurrency.replace(global.currency.symbol, "");
      }
      if (newCurrency.includes(global.currency.currency_decimal)) {
        newCurrency = newCurrency.replace(global.currency.currency_decimal, "");
      }
      let lengthCurrency = newCurrency.length;
      let lastCharacter = newCurrency.substring(
        lengthCurrency - 3,
        lengthCurrency
      );
      if (lastCharacter === ".00") {
        newCurrency = newCurrency.substring(0, lengthCurrency - 3);
      }
      newCurrency = Number(newCurrency);
      if (global.currency.currency_format == "left") {
        return global.currency.symbol + newCurrency.toLocaleString();
      } else {
        return newCurrency.toLocaleString() + global.currency.symbol;
      }
    }
    return "";
  };

  static handleShowPercent = (unit, price) => {
    if (!unit) {
      return price;
    } else if (unit == "fixed") {
      return price;
    } else if (unit == "percent") {
      if (global.isRtl) return "%" + this.formatCurrency(price);
      else return this.formatCurrency(price) + "%";
    }
  };

  static checkBaseDomain = (domain) => {
    let _domain = domain;
    if (_domain.lastIndexOf("/") !== _domain.length - 1) {
      _domain += "/";
    }
    return _domain;
  };
}
