import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as HeaderActions from 'actions/HeaderActions'
import * as HomeActions from 'actions/HomeActions'
import * as CategoryActions from 'actions/CategoryActions'
import NavItem from 'components/NavItem'

class Header extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(HeaderActions.getCategories())
  }

  render() {
    return (
      <header>
        <div className="container">
          <h1>
            <a onClick={this.openHome.bind(this)}>Mttrs - Read What Matters</a>
          </h1>

          <nav>
            <ul>
              {this.defaultItem}
              {this.categoriesItems}
            </ul>
          </nav>
        </div>
      </header>
    )
  }

  get defaultItem() {
    return (
      <NavItem
        category={{name: 'All'}}
        isSelected={!this.props.currentCategory}
        onClick={this.openHome.bind(this)}
        />
      )
  }

  get categoriesItems() {
    return this.props.categories.map((category) => {
      return this.categoryItem(category)
    })
  }

  categoryItem(category) {
    return (
      <NavItem
        key={category.id}
        category={category}
        isSelected={this.isSelected(category)}
        onClick={this.openCategory.bind(this)}
        />
      )
  }

  openCategory(category) {
    this.props.dispatch(CategoryActions.openCategory(category))
  }

  openHome() {
    this.props.dispatch(HomeActions.openHome())
  }

  isSelected(category) {
    if (!this.props.currentCategory) return false
    return category.slug === this.props.currentCategory.slug
  }
}

Header.propTypes = {
  currentCategory: PropTypes.any
}

export default connect(state => state.HeaderReducers)(Header)
