import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, RefreshControl, View } from 'react-native'
import TimelineList from '../TimelineList'
import ApolloError from '../ApolloError'
import styles from './styles'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
    this.refreshControl = this.refreshControl.bind(this)
  }

  render () {
    const { data, onEndReached } = this.props
    if (data.loading) return this.renderLoading()
    if (data.error) return this.renderError()

    return (
      <View style={styles.container}>
        <TimelineList
          data={data}
          onEndReached={onEndReached}
          renderFooter={this.renderFooter}
          refreshControl={this.refreshControl}
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

  refreshControl () {
    return (
      <RefreshControl
        style={styles.hideRefreshControl}
        refreshing={this.props.loadingPullToRefresh}
        onRefresh={this.props.onPullToRefresh}
        tintColor='#DDD'
        title='Refreshing...'
        titleColor='#AAA'
        progressBackgroundColor='#FFF'
      />
    )
  }

  renderFooter () {
    if (!this.props.loadingMore) return
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

Timeline.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired,
  loadingMore: PropTypes.bool.isRequired,
  loadingPullToRefresh: PropTypes.bool.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onPullToRefresh: PropTypes.func.isRequired
}

export default Timeline
