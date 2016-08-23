import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { getCategories } from '../../actions/CategoryActions'
import NavItem from '../components/NavItem'
import styles from '../styles/app.ios'

class HeaderContainer extends Component {
  getCategoriesItems() {
    const { categories } = this.props
    return categories.map((category) => {
      return this.categoryItem(category)
    })
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

  openCategory(category) {
    console.log('open category', category)
    Actions.category({ categorySlug: category.slug })
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducers.categories
  }
}

export default connect(mapStateToProps)(HeaderContainer)
