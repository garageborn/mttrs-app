import React, { Component, PropTypes } from 'react'
import { Modal, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Onboarding from '../../components/Onboarding'
import { StorageActions } from '../../actions/index'

class OnboardingContainer extends Component {
  constructor () {
    super()
    this.onOnboardingEnd = this.onOnboardingEnd.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(StorageActions.getOnboardingStatus())
  }

  render () {
    const { tenant, onboarding } = this.props
    if (!tenant.isLoaded) return null
    if (onboarding.isFetching || !onboarding.show) return null

    return (
      <Modal animationType={'slide'} transparent visible onRequestClose={this.onOnboardingEnd}>
        <Onboarding onEnd={this.onOnboardingEnd} />
      </Modal>
    )
  }

  onOnboardingEnd () {
    this.props.dispatch(StorageActions.closeOnboarding())
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
  onboarding: state.StorageReducer.onboarding,
  tenant: state.TenantReducer
})

export default connect(mapStateToProps)(OnboardingContainer)
