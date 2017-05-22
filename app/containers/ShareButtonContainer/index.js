import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import Touchable from '../../components/Touchable'
import { LinkActions } from '../../actions/index'

class ShareButtonContainer extends Component {
  constructor () {
    super()
    this.share = this.share.bind(this)
  }

  render () {
    return (
      <Touchable underlayColor={COLORLESS} onPress={this.share}>
        {this.props.children}
      </Touchable>
    )
  }

  share () {
    const { dispatch, link } = this.props
    dispatch(LinkActions.share(link))
  }
}

ShareButtonContainer.propTypes = {
  link: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired
}

export default connect()(ShareButtonContainer)
