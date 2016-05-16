import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as FilterActions from 'actions/FilterActions'

class Filters extends Component {
  render() {
    console.log('render filters', this.props)
    return (
      <div>
        <h2>Filters</h2>
        {this.sorting} {this.currentCategory}
      </div>
    )
  }

  get sorting() {
    return (
      <select value={this.props.name} onChange={(e) => this.onSortingChange(e)}>
        <option value='today'>Today</option>
        <option value='yesterday'>Yesterday</option>
        <option value='last_week'>Last Week</option>
        <option value='last_month'>Last Month</option>
      </select>
    )
  }

  get currentCategory() {
    if (!this.props.currentCategory) return <span>All Topics</span>
    return (<span>{this.props.currentCategory.name}</span>)
  }

  onSortingChange(option) {
    let filter = option.target.value
    this.props.dispatch(FilterActions.setFilter(filter))
  }
}

Filters.propTypes = {
  currentCategory: PropTypes.any
}

export default connect(state => state.FilterReducers)(Filters)
