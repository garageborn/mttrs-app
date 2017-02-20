import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import { AnalyticsActions, NavigationActions } from '../../actions/index'
import Timeline from '../Timeline'
import styles from '../../styles/App'
import BackButtonBehaviour from '../../common/utils/BackButtonBehaviour'

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
      <BackButtonBehaviour isFocused={this.isFocused} onBackButtonPress={this.goHome}>
        <View style={styles.listViewContainer}>
          <Timeline data={this.props.data} />
        </View>
      </BackButtonBehaviour>
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
