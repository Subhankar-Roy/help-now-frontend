import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorBagServiceService {

  constructor() { }

  /**
   * access dynamic key for error objects
   * @param obj
   * @param key
   * @constructor
   */
  ObjectToKey<T, K extends keyof T>(obj: T, key: K) {
    return Object.keys(obj).map(e => ({type: e, value: obj[e]}));
  }
}
