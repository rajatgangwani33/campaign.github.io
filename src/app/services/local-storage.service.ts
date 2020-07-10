import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
  * Set Data in localStorage
  * @param key string
  * @param value object
  */
  setItem(key: string, value: any) {
    let parsedVal;
    // Check whether value is an object
    if (_.isObject(value) || _.isArray(value)) {
      parsedVal = _.attempt(JSON.stringify.bind(null, value));
    }
    // If value is string
    else if (_.isString(value)) {
      parsedVal = value;
    }
    localStorage.setItem(key, parsedVal);
  }

  /**
  * Get Data from localStorage
  * @param key string
  */
  getItem(key: string) {
    let retrievedVal = localStorage.getItem(key);
    if (_.isNull(retrievedVal)) {
      return null;
    }
    if (_.isError(retrievedVal) || _.isEmpty(retrievedVal)) {
      this.removeItem(key);
      return null;
    }
    let retrievedObj = _.attempt(JSON.parse.bind(null, retrievedVal));
    return retrievedObj;
  }

  /**
   * Remove specific key from localStorage
   * @param key string
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Function to clear LocalStorage
   */
  clearLocalStorage() {
    localStorage.clear();
  }

}