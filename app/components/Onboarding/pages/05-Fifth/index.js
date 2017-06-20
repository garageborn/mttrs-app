import React, { PropTypes } from 'react'
import OnboardingAddFavoritesContainer from '../../../../containers/OnboardingAddFavoritesContainer'

const Fifth = ({ onEnd }) => {
  return <OnboardingAddFavoritesContainer onComplete={onEnd} />
}

Fifth.propTypes = {
  onEnd: PropTypes.func.isRequired
}

export default Fifth
