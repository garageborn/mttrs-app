import React, { PropTypes } from 'react'
import RNOnboarding from 'react-native-simple-onboarding'
import data from './data'

const OnBoarding = ({done}) => {
  let pages = data.map(page => page)

  return (
    <RNOnboarding
      pages={pages}
      showSkip={false}
      showNext={false}
      onEnd={done}
    />
  )
}

OnBoarding.propTypes = {
  done: PropTypes.func.isRequired
}

export default OnBoarding
