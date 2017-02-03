import React, { PropTypes } from 'react'
import { View } from 'react-native'
import PageDots from './PageDots'
import { SymbolButton, TextButton } from './Buttons'

const SkipButton = ({ ...props }) => (
  <TextButton {...props} textStyle={{color: '#DADADA', fontSize: 12}}>
    PULAR
  </TextButton>
)

const DoneButton = ({ size, ...props }) => (
  <TextButton {...props} textStyle={{color: '#FF5607', fontSize: 12}}>
    COMEÇAR
  </TextButton>
)

const BUTTON_SIZE = 40
const Paginator = ({ pages, currentPage, onEnd }) => (
  <View style={styles.container}>
    <View style={styles.buttonLeft}>
      <SkipButton size={BUTTON_SIZE} onPress={onEnd} />
    </View>
    <PageDots pages={pages} currentPage={currentPage} />
    <View style={styles.buttonRight}>
      {currentPage + 1 === pages &&
        <DoneButton size={BUTTON_SIZE} onPress={onEnd} />
      }
    </View>
  </View>
)

DoneButton.propTypes = {
  size: PropTypes.number
}

Paginator.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired
}

const styles = {
  container: {
    height: 60,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonLeft: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  buttonRight: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

export default Paginator
