import React, { PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import CategoryTile from '../../components/CategoryTile'
import styles from './styles'

const CategoryScrollView = ({data, openCategory}) => {
  let renderCategories = () => {
    if (data.loading) return

    return data.categories.map(category => {
      return (
        <CategoryTile
          key={category.id}
          category={category}
          onPress={openCategory}
        />
      )
    })
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.categories}>
        {renderCategories()}
      </ScrollView>
    </View>
  )
}

CategoryScrollView.propTypes = {
  data: PropTypes.object.isRequired,
  openCategory: PropTypes.func.isRequired
}

export default CategoryScrollView
