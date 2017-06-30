import { Platform } from 'react-native'

export const thumbTintActive = '#EB5510'
export const thumbTintColor = '#B6B6B6'
export const tintColor = Platform.select({
  android: '#797979',
  ios: '#DDD'
})
export const smallTextColor = '#999'
export const onTintColor = 'rgba(255, 86, 7, .5)'
