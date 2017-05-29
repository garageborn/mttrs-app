import React from 'react'
import Settings from '../../components/Settings'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const SettingsScene = () => (
  <Settings />
)

SettingsScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.settings'}),
    ...headerStyles
  }
}

export default SettingsScene
