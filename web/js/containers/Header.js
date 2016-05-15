import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as HeaderActions from 'actions/HeaderActions'
import * as HomeActions from 'actions/HomeActions'
import * as CategoryActions from 'actions/CategoryActions'
import HeaderItem from 'components/HeaderItem'

class Header extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(HeaderActions.getCategories())
  }

  render() {
    const {categories, state, store} = this.props
    return (
      <header>
        <h1>
          <a onClick={this.openHome.bind(this)}>MTTRS</a>
          </h1>
        <ol>
          {categories.map((category) => {
            return (
              <HeaderItem
                key={category.id}
                category={category}
                onClick={this.openCategory.bind(this)}
                />
              )
          })}
        </ol>
      </header>
    )
  }

  openCategory(category) {
    const {dispatch} = this.props
    dispatch(CategoryActions.openCategory(category))
  }

  openHome() {
    const {dispatch} = this.props
    dispatch(HomeActions.openHome())
  }
}

export default connect(state => state.HeaderReducers)(Header)
