import React, { Component, PropTypes } from 'react'
import { Modal, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Onboarding from '../../components/Onboarding'
import { NavigationActions, OnboardingActions } from '../../actions/index'
import { STATUS_BAR_COLOR } from '../../constants/Colors'

class OnboardingContainer extends Component {
  constructor () {
    super()
    this.onOnboardingEnd = this.onOnboardingEnd.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(OnboardingActions.getOnboardingStatus())
  }

  componentWillUnmount () {
    this.resetStatusBar()
  }

  componentDidUpdate () {
    if (this.shouldDisplay) this.changeStatusBar()
  }

  render () {
    if (!this.shouldDisplay) return null

    return (
      <Modal animationType={'slide'} transparent visible onRequestClose={this.onOnboardingEnd}>
        <Onboarding onEnd={this.onOnboardingEnd} />
      </Modal>
    )
  }

  onOnboardingEnd () {
    this.resetStatusBar()
    this.props.dispatch(OnboardingActions.closeOnboarding())
    this.props.dispatch(NavigationActions.addFavorites())
  }

  changeStatusBar () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('default')
  }

  resetStatusBar () {
    if (Platform.OS === 'ios') StatusBar.setBarStyle(STATUS_BAR_COLOR)
  }

  get shouldDisplay () {
    const { tenant, onboarding } = this.props
    if (!tenant.isLoaded) return false
    if (onboarding.isFetching || !onboarding.show) return false
    return true
  }
}

OnboardingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onboarding: PropTypes.object.isRequired,
  tenant: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  onboarding: state.OnboardingReducer,
  tenant: state.TenantReducer
})

export default connect(mapStateToProps)(OnboardingContainer)
