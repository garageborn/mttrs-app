import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CategoryTile from '../components/CategoryTile'
import styles from '../styles/Menu'
import { CategoryActions, NavigationActions, MenuActions } from '../actions/index'

class CategoryMenuContainer extends Component {
  static fetchData({ dispatch }) {
    return dispatch(CategoryActions.getCategories())
  }

  constructor(props) {
    super(props)
    this.openHome = this.openHome.bind(this)
    this.openCategory = this.openCategory.bind(this)
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  render() {
    return (
      <View>
        <View style={styles.topStoriesContainer}>
          <TouchableHighlight underlayColor={'rgba(0,0,0,.1)'} onPress={this.openHome}>
            <View style={styles.topStories} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={.5} elevation={1}>
              <Image style={styles.topStoriesIcon} source={require('../assets/icons/icon-top-stories.png')} />
              <Text style={styles.topStoriesTitle}>Top Stories</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.categories}>
          { this.renderCategories() }
        </View>
      </View>
    )
  }

  renderCategories() {
    const { categories, params } = this.props
    if (!categories.length) return
    return categories.map((category) => {
      let isActive = false
      if (params.section != null && typeof params.section.model !== 'undefined')
        isActive = category.slug === params.section.model.slug

      return (
        <CategoryTile key={category.id} category={category} onPress={this.openCategory} isActive={isActive}/>
      )
    }, this)
  }

  openHome() {
    this.props.dispatch(NavigationActions.home())
    this.props.dispatch(MenuActions.closeMenu())

  }

  openCategory(category) {
    this.props.dispatch(NavigationActions.selectCategory(category))
    this.props.dispatch(MenuActions.closeMenu())
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories
  }
}
export default connect(mapStateToProps)(CategoryMenuContainer)
