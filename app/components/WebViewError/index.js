import React, { PropTypes } from 'react'
import Error from '../Error'

const WebViewError = ({ onPressReload }) => (
  <Error onPressReload={onPressReload} />
)

WebViewError.propTypes = {
  onPressReload: PropTypes.func.isRequired
}

export default WebViewError
