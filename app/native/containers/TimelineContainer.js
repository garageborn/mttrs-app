import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TimelineActions from '../../actions/TimelineActions'
import Timeline from '../components/Timeline'

class TimelineContainer extends Component {
  constructor() {
    super()

    this.state = {
      isRefreshing: false
    }
  }

  static fetchData({dispatch, currentCategory}) {
    let options = {
      category_slug: currentCategory.slug
    }
    return dispatch(TimelineActions.getTimeline(options))
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let categoryChanged = nextProps.currentCategory.id !== this.props.currentCategory.id
    if (categoryChanged)
      this.constructor.fetchData(nextProps)
  }

  onPullToRefresh() {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.constructor.fetchData(this.props)
      this.setState({
        isRefreshing: false
      })
    }, 1000)
  }

  render() {
    const { items, isFetching } = this.props
    return (
      <Timeline
        items={items}
        isFetching={isFetching}
        isRefreshing={this.state.isRefreshing}
        onRefresh={this.onPullToRefresh.bind(this)} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    items: state.TimelineReducers.items,
    isFetching: state.TimelineReducers.isFetching,
    currentCategory: state.CurrentCategoryReducer.category
  }
}

export default connect(mapStateToProps)(TimelineContainer)
