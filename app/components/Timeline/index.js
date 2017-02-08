import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListView, View, RefreshControl, ActivityIndicator } from 'react-native'
import withQuery from './index.gql'
import StoryContainer from '../../containers/StoryContainer'
import TimelineError from '../TimelineError'
import ListViewHeader from '../ListViewHeader'
import ParseDate from '../../common/utils/ParseDate'
import apolloClient from '../../config/apolloClient'
import styles from './styles'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.scrollToY = this.scrollToY.bind(this)
    this.reloadTimeline = this.reloadTimeline.bind(this)
    this.state = {
      loadingMore: false
    }
  }

  componentWillMount () {
    this.trackHome()
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.type === 'publisher') return true
    if (this.props.data.loading !== nextProps.data.loading) return true
    return this.getActiveTimeline(nextProps)
  }

  getActiveTimeline (nextProps) {
    let currentRouteOnArray = nextProps.navigationState.routes.find(
      (item) => item.filter === this.props.filter
    )
    return JSON.parse(currentRouteOnArray.key) === nextProps.navigationState.index
  }

  componentWillReceiveProps (nextProps) {
    const renderCategory = nextProps.type === 'category'
    const renderPublisher = nextProps.type === 'publisher'
    if (renderCategory || renderPublisher) return this.trackSection(nextProps.filter)
  }

  trackHome () {
    this.props.trackScreen('/')
  }

  trackSection (filter) {
    this.props.trackScreen(`/${filter.slug}`)
  }

  renderSectionHeader (sectionData, date) {
    return <ListViewHeader date={ParseDate(date)} />
  }

  dataSource () {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2
    })

    let { rows, sections } = this.rowsAndSections()
    return ds.cloneWithRowsAndSections(rows, sections)
  }

  rowsAndSections () {
    let rows = {}
    let sections = []
    const { timeline } = this.props.data

    timeline.forEach(item => {
      if (item.stories.length) {
        let section = item.date
        sections.push(section)
        rows[section] = item.stories
      }
    })

    return {rows, sections}
  }

  refreshControl () {
    const { loading, pullToRefresh } = this.props.data
    return (
      <RefreshControl
        style={styles.hideRefreshControl}
        refreshing={loading}
        onRefresh={pullToRefresh}
        tintColor='#DDD'
        title='Refreshing...'
        titleColor='#AAA'
        progressBackgroundColor='#FFF'
      />
    )
  }

  renderError () {
    return <TimelineError reloadTimeline={this.reloadTimeline} />
  }

  reloadTimeline () {
    return apolloClient.resetStore()
  }

  render () {
    if (this.props.data.loading) return this.renderLoading()

    if (this.props.data.error) return this.renderError()

    return (
      <ListView
        ref={'timeline'}
        removeClippedSubviews={false}
        initialListSize={4}
        style={styles.listView}
        dataSource={this.dataSource()}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        refreshControl={this.refreshControl()}
        renderFooter={() => this.renderFooter()}
        onEndReached={() => this.onEndReached()}
      />
    )
  }

  onEndReached () {
    if (this.state.loadingMore) return
    const storiesArray = this.props.data.timeline.filter((item) => item.stories.length)
    const minStoriesInTheViewport = 3
    if (storiesArray.length < minStoriesInTheViewport) return
    // Reference: https://github.com/apollostack/react-apollo/issues/228
    this.setState({ loadingMore: true })
    this.props.data.infiniteScroll().then((data) => {
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

  renderLoading () {
    return (
      <View style={styles.loading}>
        {this.renderActivityIndicator()}
      </View>
    )
  }

  renderActivityIndicator () {
    return <ActivityIndicator size='large' color='#AAA' />
  }

  renderRow (story) {
    let section = {
      type: this.props.type,
      model: this.props.filter
    }
    return (
      <StoryContainer
        key={story.id}
        story={story}
        section={section}
        scrollToY={this.scrollToY}
      />
    )
  }

  scrollToY (y) {
    return this.refs.timeline.scrollTo({x: 0, y, animated: true})
  }
}

Timeline.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired,
  filter: PropTypes.any
}

let mapStateToProps = (state, ownProps) => {
  return {
    uiReducer: state.uiReducer
  }
}

const TimelineWithRedux = connect(mapStateToProps)(Timeline)
export default withQuery(TimelineWithRedux)
