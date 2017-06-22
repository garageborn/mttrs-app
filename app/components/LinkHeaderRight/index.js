import React, { PropTypes } from 'react'
import HeaderRight from '../HeaderRight'
import LinkSettingsContainer from '../../containers/LinkSettingsContainer'
import HeaderSwitchLinkContainer from '../../containers/HeaderSwitchLinkContainer'

const LinkHeaderRight = (props) => {
  const { renderOptions, story } = props.navigation.state.params

  const renderSwitchLink = () => {
    if (story.links_count === 1) return null
    return <HeaderSwitchLinkContainer story={story} renderOptions={renderOptions} />
  }

  return (
    <HeaderRight>
      {renderSwitchLink()}
      <LinkSettingsContainer story={story} />
    </HeaderRight>
  )
}

LinkHeaderRight.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        story: PropTypes.shape({
          links_count: PropTypes.number
        }).isRequired,
        renderOptions: PropTypes.object
      })
    }).isRequired
  }).isRequired
}

export default LinkHeaderRight
