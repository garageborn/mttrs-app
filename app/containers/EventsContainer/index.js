import React, { Component, PropTypes } from 'react'
import NotificationsContainer from '../NotificationsContainer'
import OnboardingContainer from '../OnboardingContainer'
import { View } from 'react-native'

class EventsContainer extends Component {
  render () {
    return (
      <View style={{flexGrow: 1}}>
        <NotificationsContainer />
        <OnboardingContainer />
        {this.props.children}
      </View>
    )
  }
}

EventsContainer.propTypes = {
  children: PropTypes.any
}

export default EventsContainer
