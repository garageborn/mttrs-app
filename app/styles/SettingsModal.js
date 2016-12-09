import { StyleSheet, Dimensions, Platform } from 'react-native'
import { DARK_COLOR } from '../constants/Colors'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 90 : 110
const widthOffeset = 16

const centerXY = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: DARK_COLOR
  },

  modalContainer: {
    backgroundColor: DARK_COLOR,
    width: width - widthOffeset,
    height: height - heightOffset,
    marginHorizontal: widthOffeset / 2,
    marginTop: 20
  },

  modalHeader: {
    ...centerXY,
    marginVertical: 15
  },

  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginHorizontal: 10,
  },

  modalFooter: {
    ...centerXY
  },

  modalFooterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginHorizontal: 10
  },

  options: {
    flex: 1
  },

  optionsSubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginHorizontal: 20,
    marginVertical: 10
  },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  }
})

export default styles
