import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ModalContainer extends Component {
  render () {
    const { isOpen, content } = this.props.modal
    if (!isOpen) return null
    return content
  }
}

ModalContainer.propTypes = {
  modal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.node
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    modal: state.UIReducer.modal
  }
}

export default connect(mapStateToProps)(ModalContainer)
