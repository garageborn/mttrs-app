import React, { PropTypes } from 'react'
import PagesWrapper from './components/PagesWrapper'
import Welcome from './pages/01-Welcome'
import Highlights from './pages/02-Highlights'
import Editorial from './pages/03-Editorial'
import Publishers from './pages/04-Publishers'
import Categories from './pages/05-Categories'

const Onboarding = ({ onEnd }) => (
  <PagesWrapper onEnd={onEnd}>
    <Welcome />
    <Highlights />
    <Editorial />
    <Publishers />
    <Categories />
  </PagesWrapper>
)

Onboarding.propTypes = {
  onEnd: PropTypes.func.isRequired
}

export default Onboarding
