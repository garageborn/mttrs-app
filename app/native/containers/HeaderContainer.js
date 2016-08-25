import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import * as CurrentCategoryActions from '../../actions/CurrentCategoryActions'
import * as CategoryActions from '../../actions/CategoryActions'
import NavItem from '../components/NavItem'
import styles from '../styles/app.ios'

class HeaderContainer extends Component {
  static fetchData({dispatch, categorySlug}) {
    return dispatch(CategoryActions.getCategories())
  }

  componentDidMount() {
    this.constructor.fetchData(this.props)
  }

  openCategory(category) {
    this.props.dispatch(CurrentCategoryActions.getCategory(category.slug))
  }

  categoryItem(category) {
    return (
      <NavItem
        key={category.id}
        category={category}
        onPress={this.openCategory.bind(this)}
        />
      )
  }

  getCategoriesItems() {
    const { categories } = this.props
    return categories.map((category) => {
      return this.categoryItem(category)
    })
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <ScrollView style={styles.nav}
          contentContainerStyle={styles.navContainer}
          showsHorizontalScrollIndicator={false} horizontal>
          {this.getCategoriesItems()}
        </ScrollView>
      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories,
    currentCategory: state.CurrentCategoryReducer.category
  }
}

export default connect(mapStateToProps)(HeaderContainer)
