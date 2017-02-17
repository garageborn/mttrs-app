import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import CategoryTile from '../../components/CategoryTile'
import styles from './styles'

class CategoryScrollView extends Component {
  render () {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.categories}>
          {this.renderCategories()}
        </ScrollView>
      </View>
    )
  }

  renderCategories () {
    const { data, openCategory } = this.props
    if (data.loading || !data.categories || !data.categories.length) return

    return data.categories.map(category => {
      return <CategoryTile key={category.id} category={category} onPress={openCategory} />
    })
  }
}

CategoryScrollView.propTypes = {
  data: PropTypes.object.isRequired,
  openCategory: PropTypes.func.isRequired
}

export default CategoryScrollView
