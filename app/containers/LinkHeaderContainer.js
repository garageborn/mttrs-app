import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Share from 'react-native-share'
import url from 'url'
import HeaderWebview from '../components/HeaderWebView'
import * as cloudinary from '../common/utils/Cloudinary'
import { NavigationActions } from '../actions/index'
import captureError from '../common/utils/captureError'
import { withAnalytics } from '../config/AnalyticsProvider'

class LinkHeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.share = this.share.bind(this)
  }

  share () {
    const { link } = this.props

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      subject: link.title, // for email
      url: this.shareUrl
    }

    return Share.open(shareOptions).then((info) => {
      this.context.analytics.trackEvent('link', 'share', { slug: link.slug })
    }).catch((error) => {
      captureError(error)
    });
  }

  close () {
    this.props.dispatch(NavigationActions.back())
  }

  get shareUrl () {
    const { tenant, link } = this.props
    const { host, protocol } = tenant
    let pathname = `/link/${link.slug}`
    let query = { utm_source: 'app', utm_medium: 'share' }

    return url.format({ protocol, host, pathname, query })
  }

  get publisherLogo () {
    const { publisher } = this.props.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  render () {
    const { link } = this.props
    return (
      <HeaderWebview
        link={link}
        share={this.share}
        close={this.close}
        publisherLogo={this.publisherLogo}
      />
    )
  }
}

LinkHeaderContainer.propTypes = {
  link: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    publisher: PropTypes.shape({
      icon_id: PropTypes.string
    }).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
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

const LinkHeaderWithAnalytics = withAnalytics(LinkHeaderContainer)
export default connect(mapStateToProps)(LinkHeaderWithAnalytics)
