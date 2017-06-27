import { StyleSheet } from 'react-native'

const leftContainer = {
  alignItems: 'center',
  flexDirection: 'row'
}

const container = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 14,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: '#DADADA'
}

const styles = StyleSheet.create({
  container: {
    ...container
  },

  containerActive: {
    ...container,
    backgroundColor: '#F1F1F1'
  },

  leftContainer: {
    ...leftContainer
  },

  leftContainerInactive: {
    ...leftContainer
  },

  rightContainer: {
    width: 40
  },

  itemDetails: {
    flexDirection: 'column',
    marginLeft: 14
  },

  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#444441'
  },

  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999'
  }
})

export default styles
