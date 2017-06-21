import React, { PropTypes } from 'react'
import HeaderRight from '../HeaderRight'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderSwitchLinkContainer from '../../containers/HeaderSwitchLinkContainer'

const LinkHeaderRight = (props) => {
  const renderSwitchLink = () => {
    const { renderOptions, story } = props.navigation.state.params
    if (story.links_count === 1) return null
    return <HeaderSwitchLinkContainer story={story} renderOptions={renderOptions} />
  }

  return (
    <HeaderRight>
      {renderSwitchLink()}
      <HeaderSettingsContainer />
    </HeaderRight>
  )
}

LinkHeaderRight.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        links_count: PropTypes.number
      })
    }).isRequired
  }).isRequired
}

export default LinkHeaderRight
