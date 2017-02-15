import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Timeline from '../Timeline'
import ApolloError from '../ApolloError'
import styles from './styles'

class TimelineControl extends Component {
  constructor (props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.state = { loadingMore: false }
  }

  render () {
    const { data } = this.props
    if (data.loading) return this.renderLoading()
    if (data.error) return this.renderError()

    return (
      <Timeline
        data={data}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
      />
    )
  }

  renderError () {
    return <ApolloError data={this.props.data} />
  }

  renderLoading () {
    return (
      <View style={styles.loading}>
        {this.renderActivityIndicator()}
      </View>
    )
  }

  onEndReached () {
    if (this.state.loadingMore) return

    const storiesCount = this.props.data.timeline.reduce((sum, item) => {
      return sum + item.stories.length
    }, 0)

    const minStoriesInTheViewport = 3
    if (storiesCount < minStoriesInTheViewport) return
    // Reference: https://github.com/apollostack/react-apollo/issues/228
    this.setState({ loadingMore: true })
    this.props.data.infiniteScroll().then(() => {
      this.setState({ loadingMore: false })
    })
  }

  renderFooter () {
    if (!this.state.loadingMore) return
    return (
      <View style={styles.infiniteScrollLoadingContainer}>
        {this.renderActivityIndicator()}
      </View>
    )
  }

  renderActivityIndicator () {
    return <ActivityIndicator size='large' color='#AAA' />
  }
}

TimelineControl.propTypes = {
  data: PropTypes.shape({
    infiniteScroll: PropTypes.func.isRequired
  }).isRequired
}

export default TimelineControl
