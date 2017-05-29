import { StyleSheet, Platform } from 'react-native'

export const thumbTintActive = '#EB5510'
export const thumbTintColor = '#B6B6B6'
export const tintColor = Platform.select({
  android: '#797979',
  ios: '#DDD'
})
export const smallTextColor = '#999'
export const onTintColor = 'rgba(255, 86, 7, .5)'

const styles = StyleSheet.create({
  options: {
    flex: 1
  },

  disclaimerContainer: {
    marginHorizontal: 16,
    marginVertical: 10
  },

  disclaimerText: {
    fontSize: 12,
    color: '#FFF'
  },

  headingContainer: {
    marginVertical: 10,
    marginHorizontal: 16
  },

  itemsContainer: {
    marginBottom: 10
  },

  item: {
    backgroundColor: '#F7F7F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10
  },

  itemTitle: {
    fontSize: 16,
    color: '#666766'
  }
})

export default styles
