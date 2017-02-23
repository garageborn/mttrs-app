import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TimelineComponent from '../../components/Timeline'
import { StorageActions } from '../../actions/index'

const minStoriesInTheViewport = 4

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
    this.state = {
      loadingMore: false,
      loadingPullToRefresh: false
    }
  }

  componentWillMount () {
    this.props.dispatch(StorageActions.getVisitedStories())
  }

  componentDidUpdate () {
    this.fillTimeline()
  }

  render () {
    const { data } = this.props
    return (
      <TimelineComponent
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

    if (this.state.loadingMore || !hasMore) return

    this.setState({ loadingMore: true })
    infiniteScroll().then(() => this.setState({ loadingMore: false }))
  }

  onPullToRefresh () {
    const { pullToRefresh } = this.props.data
    if (this.state.loadingPullToRefresh) return
    this.setState({ loadingPullToRefresh: true })
    pullToRefresh().then(() => this.setState({ loadingPullToRefresh: false }))
  }

  fillTimeline () {
    const storiesCount = this.storiesCount
    if (this.props.data.loading || !storiesCount) return
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
}

Timeline.propTypes = {
  data: PropTypes.shape({
    infiniteScroll: PropTypes.func.isRequired,
    pullToRefresh: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool
  }).isRequired
}

export default connect()(Timeline)
