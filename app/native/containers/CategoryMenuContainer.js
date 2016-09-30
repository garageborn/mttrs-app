import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CategoryTile from '../components/CategoryTile'
import styles from '../styles/Menu'
import { CategoryActions } from '../actions/index'

import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class CategoryMenuContainer extends Component {
  static fetchData({ dispatch }) {
    return dispatch(CategoryActions.getCategories())
  }

  constructor(props) {
    super(props)
    this.openCategory = this.openCategory.bind(this)
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => console.log(123)}>
          <View style={styles.topStories} shadowOffset={{width: 1, height: 1}} shadowColor={'rgba(0, 0, 0, .1)'} shadowOpacity={1.0} elevation={5}>
            <Image style={styles.topStoriesIcon} source={require('../assets/icons/icon-top-stories.png')} />
            <Text style={styles.topStoriesTitle}>Top Stories</Text>
            <Image style={styles.selectedMarker} source={require('../assets/icons/icon-selected.png')} />
          </View>
        </TouchableHighlight>

        <View style={styles.categories}>
          { this.renderCategories() }
        </View>
      </View>
    )
  }

  renderCategories() {
    if (!this.props.categories.length) return
    return this.props.categories.map((category) => {
      return (
        <CategoryTile key={category.id} category={category} onPress={this.openCategory}/>
      )
    })
  }

  openCategory(category) {
    const { dispatch, navigation, params } = this.props
    let menuParams = params ? params.menu : {}
    menuParams.open = false
    let sectionParams = { name: 'category', model: category }
    let newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

// CategoryMenuContainer.propTypes = {
//   params: PropTypes.object.isRequired
// }

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories,
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(CategoryMenuContainer)
