import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
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
    const { onboarding } = this.props

    if (onboarding.isFetching || !onboarding.show) return null

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible
        onRequestClose={this.onOnboardingEnd}
      >
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
  onboarding: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  onboarding: state.StorageReducer.onboarding
})

export default connect(mapStateToProps)(OnboardingContainer)
