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
      <View style={styles.container}>
        <Timeline
          data={data}
          onEndReached={this.onEndReached}
          renderFooter={this.renderFooter}
        />
      </View>
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
    const { hasMore, infiniteScroll } = this.props.data

    if (this.state.loadingMore || !hasMore) return

    this.setState({ loadingMore: true })
    infiniteScroll().then(() => {
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
    infiniteScroll: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
}

export default TimelineControl
