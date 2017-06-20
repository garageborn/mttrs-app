import React, { PropTypes } from 'react'
import PagesWrapper from './components/PagesWrapper'
import First from './pages/01-First'
import Second from './pages/02-Second'
import Third from './pages/03-Third'
import Fourth from './pages/04-Fourth'
import Fifth from './pages/05-Fifth'

const Onboarding = ({ onEnd }) => (
  <PagesWrapper onEnd={onEnd}>
    <First />
    <Second />
    <Third />
    <Fourth />
    <Fifth onEnd={onEnd} />
  </PagesWrapper>
)

Onboarding.propTypes = {
  onEnd: PropTypes.func.isRequired
}

export default Onboarding
