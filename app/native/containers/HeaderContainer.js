import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { getCategories } from '../../actions/CategoryActions'
import CategoryNavItem from '../components/CategoryNavItem'
import styles from '../styles/app.ios'

class HeaderContainer extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getCategories())
  }

  getCategoriesItems () {
    const { categories } = this.props
    return categories.map((category) => {
      return this.categoryItem(category)
    })
  }

  categoryItem (category) {
    return <CategoryNavItem key={category.id} category={category} />
  }

  render () {
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
  const { categories } = state.CategoriesReducers

  return {
    categories
  }
}

export default connect(mapStateToProps)(HeaderContainer)
