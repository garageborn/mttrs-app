import React, { Component, PropTypes } from 'react'
import NotificationsContainer from '../NotificationsContainer'
import OnboardingContainer from '../OnboardingContainer'
import LinkingContainer from '../LinkingContainer'
import { View } from 'react-native'

class EventsContainer extends Component {
  render () {
    return (
      <View style={{flexGrow: 1}}>
        <NotificationsContainer />
        <OnboardingContainer />
        <LinkingContainer />
        {this.props.children}
      </View>
    )
  }
}

EventsContainer.propTypes = {
  children: PropTypes.any
}

export default EventsContainer
