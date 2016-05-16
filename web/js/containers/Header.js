import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as HeaderActions from 'actions/HeaderActions'
import * as HomeActions from 'actions/HomeActions'
import * as CategoryActions from 'actions/CategoryActions'
import HeaderItem from 'components/HeaderItem'
import Filters from 'containers/Filters'

class Header extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(HeaderActions.getCategories())
  }

  render() {
    console.log('render header', this.props)
    return (
      <header>
        <h1>
          <a onClick={this.openHome.bind(this)}>MTTRS</a>
        </h1>
        <ol>
          {this.defaultItem}
          {this.categoriesItems}
        </ol>
      <Filters currentCategory={this.props.currentCategory}/>
      </header>
    )
  }

  get defaultItem() {
    return (
      <HeaderItem
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
      <HeaderItem
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
