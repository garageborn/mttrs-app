/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import HeaderButton from '../HeaderButton'

const HeaderLeft = ({ navigation }) => (
  <HeaderButton type='back' onPress={() => navigation.goBack()} />
)

HeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

export default HeaderLeft
