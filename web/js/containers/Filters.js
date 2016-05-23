import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {categoryPath, storiesPath} from 'utils/RoutesHelper'

class Filters extends Component {
  render() {
    return (
      <main>
        <h2>
          <div className='dropdown'>
            {this.sorting}
          </div>

          <i>in</i> {this.currentCategory}
        </h2>
      </main>
    )
  }

  get sorting() {
    return (
      <select value={this.props.currentFilter} onChange={(e) => this.onSortingChange(e)}>
        <option value='today'>Today</option>
        <option value='yesterday'>Yesterday</option>
        <option value='last_week'>Last Week</option>
        <option value='last_month'>Last Month</option>
      </select>
    )
  }

  get currentCategory() {
    if (!this.props.currentCategory) return (<span>All Topics</span>)
    return (<span>{this.props.currentCategory.name}</span>)
  }

  onSortingChange(option) {
    let filter = option.target.value
    if (this.props.currentCategory) {
      let path = categoryPath(this.props.currentCategory.slug, filter)
      this.props.dispatch(push(path))
    } else {
      let path = storiesPath(filter)
      this.props.dispatch(push(path))
    }
  }
}

Filters.propTypes = {
  currentCategory: PropTypes.any
}

export default connect()(Filters)
