import React, { Component, PropTypes } from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'
import _throttle from 'lodash/throttle'
import captureError from '../../common/utils/captureError'
import Timeline from '../../components/Timeline'
import { VisitedStoriesActions } from '../../actions/index'

const minStoriesInTheViewport = 4

class TimelineContainer extends Component {
  constructor (props) {
    super(props)
    this.onEndReached = _throttle(this.onEndReached.bind(this), 3000)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)

    this.state = {
      loadingMore: false,
      loadingPullToRefresh: false
    }
  }

  componentWillMount () {
    this.props.dispatch(VisitedStoriesActions.getStories())
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.onEndReached.cancel()
    if (this.infiniteScroll) this.infiniteScroll.cancel()
  }

  componentDidUpdate () {
    this.fillTimeline()
  }

  handleAppStateChange (appState) {
    const active = appState === 'active'
    const { data } = this.props
    if (!active || !data) return
    return this.onPullToRefresh()
  }

  render () {
    const { data, renderOptions } = this.props
    return (
      <Timeline
        renderOptions={renderOptions}
        data={data}
        loadingMore={this.state.loadingMore}
        loadingPullToRefresh={this.state.loadingPullToRefresh}
        onEndReached={this.onEndReached}
        onPullToRefresh={this.onPullToRefresh}
      />
    )
  }

  onEndReached () {
    const { hasMore, infiniteScroll } = this.props.data
    if (this.isLoadingMore || !hasMore) return

    this.isLoadingMore = true

    this.infiniteScroll = infiniteScroll()
    this.infiniteScroll
      .promise
      .then(() => {
        this.isLoadingMore = false
      })
      .catch((error) => {
        this.isLoadingMore = false
        captureError(error)
      })
  }

  onPullToRefresh () {
    const { pullToRefresh } = this.props.data
    if (this.state.loadingPullToRefresh) return
    this.setState({ loadingPullToRefresh: true })
    pullToRefresh()
      .promise
      .then(() => this.setState({ loadingPullToRefresh: false }))
      .catch((error) => {
        captureError(error)
        this.setState({ loadingPullToRefresh: false })
      })
  }

  fillTimeline () {
    if (!this.props.data || this.props.data.loading) return
    const storiesCount = this.storiesCount
    if (!storiesCount) return
    if (storiesCount < minStoriesInTheViewport) this.onEndReached()
  }

  get storiesCount () {
    const { items } = this.props.data
    if (!items || items.length === 0) return 0

    return items.reduce((sum, item) => {
      let length = 0
      if (item && item.stories && item.stories.length) length = item.stories.length
      return sum + length
    }, 0)
  }

  set isLoadingMore (value) {
    if (this._isLoadingMore === value) return
    this._isLoadingMore = value
    this.setState({ ...this.state, loadingMore: value })
  }

  get isLoadingMore () {
    return this._isLoadingMore || false
  }
}

TimelineContainer.propTypes = {
  data: PropTypes.shape({
    infiniteScroll: PropTypes.func.isRequired,
    pullToRefresh: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool
  }),
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
}

export default connect()(TimelineContainer)
