import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import { AnalyticsActions } from '../../actions/index'
import Timeline from '../Timeline'
import styles from '../../styles/App'

class PublisherTimeline extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.analyticsTrack()
  }

  analyticsTrack () {
    const { dispatch, model } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${model.slug}`))
  }

  render () {
    return (
      <View style={styles.listViewContainer}>
        <Timeline data={this.props.data} />
      </View>
    )
  }

  get isFocused () {
    return this.props.isActiveRoute
  }
}

PublisherTimeline.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const currentRoute = ownProps.navigator.getCurrentRoute()
  return {
    isActiveRoute: currentRoute.routeName === 'timeline'
  }
}

const PublisherTimelineWithData = withQuery(PublisherTimeline)
const PublisherTimelineWithRedux = connect(mapStateToProps)(PublisherTimelineWithData)
export default withNavigation(PublisherTimelineWithRedux)
