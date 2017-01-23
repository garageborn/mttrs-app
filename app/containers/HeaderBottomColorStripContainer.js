import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderBottomColorStrip from '../components/HeaderBottomColorStrip'

const HeaderBottomColorStripContainer = ({uiReducer}) => {
  if (uiReducer.menu.isOpen) return false

  return <HeaderBottomColorStrip />
}

HeaderBottomColorStripContainer.propTypes = {
  uiReducer: PropTypes.object.isRequired
}

let mapStatesToProps = (state) => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStatesToProps)(HeaderBottomColorStripContainer)
