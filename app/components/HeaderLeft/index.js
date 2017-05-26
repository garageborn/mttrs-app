/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import HeaderBackButton from '../HeaderBackButton'

const HeaderLeft = ({ navigation }) => (
  <HeaderBackButton onPress={() => navigation.goBack()} />
)

HeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

export default HeaderLeft
