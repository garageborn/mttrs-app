import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'
import styles from '../../../styles/App'
import { AndroidBackButtonBehavior } from '@exponent/ex-navigation'

class PublisherTimeline extends Component {
  constructor (props) {
    super(props)

    this.goHome = this.goHome.bind(this)
  }
  componentWillMount () {
    this.analyticsTrack()
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  goHome () {
    return Promise.resolve(this.props.dispatch(NavigationActions.home()))
  }

  render () {
    return (
      <AndroidBackButtonBehavior
        isFocused={false}
        onBackButtonPress={this.goHome}
      >
        <View style={styles.listViewContainer}>
          <TimelineControl data={this.props.data} />
        </View>
      </AndroidBackButtonBehavior>
    )
  }
}

PublisherTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

const PublisherTimelineWithData = withQuery(PublisherTimeline)
export default connect()(PublisherTimelineWithData)
