import { NativeModules, Platform } from 'react-native'
import moment from 'moment-timezone'
import DeviceInfo from 'react-native-device-info'

export const DEFAULT_LANGUAGE = 'en'
export const AVAILABLE_LANGUAGES = ['pt', 'en', 'es']
export const DEVICE_LOCALE = Platform.select({
  ios: () => NativeModules.SettingsManager.settings.AppleLocale,
  android: () => NativeModules.I18nManager.localeIdentifier
})()
export const DEVICE_LANGUAGE = DEVICE_LOCALE.substr(0, 2)
const country = DeviceInfo.getDeviceCountry() || DEVICE_LOCALE.substr(3, 5)
export const DEVICE_COUNTRY = country.toUpperCase()
export const TIMEZONE = moment.tz.guess()
