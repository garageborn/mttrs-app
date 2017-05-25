import React, { Component } from 'react'
import SummariesTimelineContainer from '../../containers/SummariesTimelineContainer'
import HeaderRight from '../../components/HeaderRight'
import headerStyles from '../../styles/Header'

class SummariesScene extends Component {
  render () {
    return <SummariesTimelineContainer />
  }
}

SummariesScene.navigationOptions = props => {
  return {
    headerTitle: props.screenProps.intl.formatMessage({id: 'header.summaries'}),
    headerRight: <HeaderRight />,
    ...headerStyles
  }
}

export default SummariesScene
