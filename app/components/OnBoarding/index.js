import React, { PropTypes } from 'react'
import Page from './components/Page'
import PagesWrapper from './components/PagesWrapper'

const welcome = require('../../assets/onboarding/01-welcome.png')

const Onboarding = ({ onEnd }) => (
  <PagesWrapper onEnd={onEnd}>
    <Page key={1} image={welcome} title='Foo' description='Bar' />
    <Page key={2} image={welcome} title='Foo 2' description='Bar' />
    <Page key={3} image={welcome} title='Foo 3' description='Bar' />
    <Page key={4} image={welcome} title='Foo 4' description='Bar' />
    <Page key={5} image={welcome} title='Foo 5' description='Bar' />
  </PagesWrapper>
)

Onboarding.propTypes = {
  onEnd: PropTypes.func.isRequired
}

export default Onboarding
