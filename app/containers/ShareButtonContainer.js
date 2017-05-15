import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import url from 'url'
import Share from 'react-native-share'
import { COLORLESS } from '../constants/TouchUnderlayColors'
import { SHARE_LINK } from '../constants/Analytics'
import captureError from '../common/utils/captureError'
import Touchable from '../components/Touchable'
import { AnalyticsActions } from '../actions/index'

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

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      subject: link.title, // for email
      url: this.shareUrl
    }

    return Share.open(shareOptions).then((info) => {
      dispatch(AnalyticsActions.trackEvent(SHARE_LINK, link.slug))
    }).catch((error) => {
      captureError(error)
    })
  }

  get shareUrl () {
    const { tenant, link } = this.props
    const { host, protocol } = tenant
    let pathname = `/link/${link.slug}`
    let query = { utm_source: 'app', utm_medium: 'share' }

    return url.format({ protocol, host, pathname, query })
  }
}

ShareButtonContainer.propTypes = {
  link: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired,
  tenant: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    tenant: state.TenantReducer.current
  }
}

export default connect(mapStateToProps)(ShareButtonContainer)
