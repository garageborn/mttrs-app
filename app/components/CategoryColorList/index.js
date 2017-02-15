import React, { PropTypes } from 'react'
import { View } from 'react-native'
import CategoryColor from '../../components/CategoryColor'
import styles from './styles'

const CategoryColorList = ({ data, params }) => {
  let isActive = (currentSection) => {
    if (currentSection === 'home' && params.section.model.name === 'home') return true
    return currentSection.slug === params.section.model.slug
  }

  let categories = () => {
    let categories = data.categories.map(category => {
      return (
        <CategoryColor
          categoriesLength={data.categories.length}
          key={category.id}
          color={category.color}
          isActive={isActive(category)}
        />
      )
    })

    return categories
  }

  if (data.loading) return null

  return (
    <View style={styles.list}>
      <CategoryColor categoriesLength={data.categories.length} color='#FF5607' isActive={isActive('home')} />
      {categories()}
    </View>
  )
}

CategoryColorList.propTypes = {
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default CategoryColorList
