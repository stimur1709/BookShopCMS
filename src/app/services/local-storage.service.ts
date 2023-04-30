import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public static getLocalStorageItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '')
  }

  public static setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static removeLocalStorageItem(key: string) {
    return localStorage.removeItem(key)
  }

}
