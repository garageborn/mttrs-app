import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../../actions/index'
import TimelineControl from '../../../components/TimelineControl'
import styles from '../../../styles/App'
import BackButtonBehaviour from '../../../common/utils/BackButtonBehaviour'

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
      <BackButtonBehaviour isFocused onBackButtonPress={this.goHome} name={this.props.model.slug}>
        <View style={styles.listViewContainer}>
          <TimelineControl data={this.props.data} />
        </View>
      </BackButtonBehaviour>
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
