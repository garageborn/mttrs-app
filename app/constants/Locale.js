import { NativeModules, Platform } from 'react-native'
import moment from 'moment-timezone'

export const DEFAULT_LANGUAGE = 'en'
export const AVAILABLE_LANGUAGES = ['pt', 'en']
export const DEVICE_LOCALE = Platform.select({
  ios: () => NativeModules.SettingsManager.settings.AppleLocale,
  android: () => NativeModules.I18nManager.localeIdentifier
})()
export const DEVICE_LANGUAGE = DEVICE_LOCALE.substr(0, 2)
export const TIMEZONE = moment.tz.guess()
