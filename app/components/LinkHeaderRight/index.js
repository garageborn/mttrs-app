import React, { PropTypes } from 'react'
import HeaderRight from '../HeaderRight'
import LinkSettingsContainer from '../../containers/LinkSettingsContainer'
import HeaderSwitchLinkContainer from '../../containers/HeaderSwitchLinkContainer'

const LinkHeaderRight = (props) => {
  const { renderOptions, slug } = props.navigation.state.params

  return (
    <HeaderRight>
      <HeaderSwitchLinkContainer slug={slug} renderOptions={renderOptions} />
      <LinkSettingsContainer slug={slug} />
    </HeaderRight>
  )
}

LinkHeaderRight.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
}

export default LinkHeaderRight
