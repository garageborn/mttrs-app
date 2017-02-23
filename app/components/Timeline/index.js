import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, RefreshControl, View } from 'react-native'
import TimelineList from '../TimelineList'
import ApolloError from '../ApolloError'
import styles from './styles'
import _isEqual from 'lodash/isEqual'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
    this.refreshControl = this.refreshControl.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    let hasMoreChanged = this.props.data.hasMore !== nextProps.data.hasMore
    if (loadingChanged || hasMoreChanged) return true
    return !_isEqual(this.props.data.items, nextProps.data.items)
  }

  render () {
    const { data, onEndReached } = this.props
    if (data.loading) return this.renderLoading()
    if (data.error) return this.renderError()

    return (

        <TimelineList
          data={data}
          onEndReached={onEndReached}
          renderFooter={this.renderFooter}
          refreshControl={this.refreshControl}
        />

    )
  }

  renderError () {
    return <ApolloError data={this.props.data} />
  }

  renderLoading () {
    return (
      <View style={styles.loading}>
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
    items: PropTypes.array.isRequired,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  loadingMore: PropTypes.bool.isRequired,
  loadingPullToRefresh: PropTypes.bool.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onPullToRefresh: PropTypes.func.isRequired
}

export default Timeline
