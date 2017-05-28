import React, { Component } from 'react'
import Settings from '../../components/Settings'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

class SettingsScene extends Component {
  render () {
    return <Settings />
  }
}

SettingsScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.settings'}),
    ...headerStyles
  }
}

export default SettingsScene
