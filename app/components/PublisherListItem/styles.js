import { StyleSheet } from 'react-native'

const leftContainer = {
  alignItems: 'center',
  flexDirection: 'row'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20
  },

  leftContainer: {
    ...leftContainer
  },

  leftContainerInactive: {
    ...leftContainer,
    opacity: 0.3
  },

  rightContainer: {
    width: 40
  },

  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666766',
    marginLeft: 10
  }
})

export default styles
