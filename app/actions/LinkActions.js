import Share from 'react-native-share'
import url from 'url'
import { SHARE_LINK } from '../constants/Analytics'
import captureError from '../common/utils/captureError'
import { AnalyticsActions } from './index'

export function share (link) {
  return (dispatch, getState) => {
    const shareUrl = getShareUrl(getState, link)

    let shareOptions = {
      title: link.title,
      message: link.description || link.title,
      subject: link.title, // for email
      url: shareUrl
    }

    return Share.open(shareOptions).then((info) => {
      dispatch(AnalyticsActions.trackEvent(SHARE_LINK, link.slug))
    }).catch((error) => {
      captureError(error)
    })
  }
}

function getShareUrl (getState, link) {
  const tenant = getState().TenantReducer.current
  const { host, protocol } = tenant
  let pathname = `/link/${link.slug}`
  let query = { utm_source: 'app', utm_medium: 'share' }

  return url.format({ protocol, host, pathname, query })
}
