import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import _result from 'lodash/result'
import CategoryHeaderContainer from './CategoryHeaderContainer'
import PublisherHeaderContainer from './PublisherHeaderContainer'
import styles from './styles'

class TimelineHeaderContainer extends Component {
  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
      </View>
    )
  }

  renderHeader () {
    const section = _result(this.props.params, 'section')

    if (!section) return this.renderHome()
    if (section.name === 'publisher') return this.renderPublisher()

    return this.renderCategory()
  }

  renderHome () {
    let params = { section: { name: 'home' } }
    return <CategoryHeaderContainer params={params} />
  }

  renderPublisher () {
    return <PublisherHeaderContainer publisher={this.props.params.section.model} />
  }

  renderCategory () {
    return <CategoryHeaderContainer category={this.props.params.section.model} />
  }
}

TimelineHeaderContainer.propTypes = {
  params: PropTypes.object.isRequired
}

export default TimelineHeaderContainer
