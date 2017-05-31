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
    if (!this.props.data || !nextProps.data) return false
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    let hasMoreChanged = this.props.data.hasMore !== nextProps.data.hasMore
    let loadingMoreChanged = this.props.loadingMore !== nextProps.loadingMore
    let loadingPullToRefresh = this.props.loadingPullToRefresh !== nextProps.loadingPullToRefresh
    if (loadingChanged || hasMoreChanged || loadingMoreChanged || loadingPullToRefresh) return true
    return !_isEqual(this.props.data.items, nextProps.data.items)
  }

  render () {
    const { data, onEndReached, renderOptions } = this.props
    if (!data || data.loading) return this.renderLoading()
    if (data.error) return this.renderError()

    return (
      <View style={styles.container}>
        <TimelineList
          renderOptions={renderOptions}
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
      <View style={styles.container}>
        <View style={styles.loading}>
          {this.renderActivityIndicator()}
        </View>
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
    if (!this.props.loadingMore) return null
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
    items: PropTypes.array,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool
  }),
  loadingMore: PropTypes.bool.isRequired,
  loadingPullToRefresh: PropTypes.bool.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onPullToRefresh: PropTypes.func.isRequired,
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  })
}

export default Timeline
