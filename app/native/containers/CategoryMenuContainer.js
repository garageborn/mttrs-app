import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CategoryTile from '../components/CategoryTile'
import styles from '../styles/Menu'
import { CategoryActions, NavigationActions } from '../actions/index'

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
    this.props.dispatch(NavigationActions.category(category))
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories
  }
}
export default connect(mapStateToProps)(CategoryMenuContainer)
