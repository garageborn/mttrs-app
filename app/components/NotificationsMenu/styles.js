import { StyleSheet } from 'react-native'

export const thumbTintActive = '#EB5510'
export const thumbTintColor = '#B6B6B6'
export const tintColor = '#797979'
export const onTintColor = '#975333'

const styles = StyleSheet.create({
  options: {
    flex: 1
  },

  disclaimerContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },

  disclaimerText: {
    fontSize: 12,
    color: '#FFF'
  },

  title: {
    fontSize: 12,
    color: '#FFF',
    marginHorizontal: 20,
    marginVertical: 10
  },

  item: {
    backgroundColor: '#434341',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: '#2D2D2B',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white'
  }
})

export default styles
