import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as FilterActions from 'actions/FilterActions'
import {push} from 'react-router-redux'
import {storiesPath} from 'utils/RoutesHelper'

class Filters extends Component {
  render() {
    return (
      <h2>
        <div className='dropdown'>
          {this.sorting}
        </div>

        <i>in</i> {this.currentCategory}
      </h2>
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
    console.log(this.props)
    if (this.props.category) {
      // this.props.dispatch(FilterActions.setFilter(filter))
    } else {
      let path = storiesPath(filter)
      console.log('---------path', path)
      this.props.dispatch(push(path))
    }
  }
}

Filters.propTypes = {
  currentCategory: PropTypes.any
}

let mapStateToProps = (state) => {
  return {
    filter: state.FilterReducers.filter,
    category: state.CategoriesReducers.category
  }
}

export default connect(mapStateToProps)(Filters)
