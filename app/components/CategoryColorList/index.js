import React, { PropTypes } from 'react'
import { View } from 'react-native'
import CategoryColor from '../../components/CategoryColor'
import styles from './styles'

const CategoryColorList = ({ data, params, type }) => {
  let isActive = (currentSection) => {
    if (data.loading) return
    return currentSection.slug === params.section.model.slug
  }

  let categories = () => {
    if (data.loading) return
    return data.categories.map(category => {
      return <CategoryColor key={category.id} color={category.color} isActive={isActive(category)} />
    })
  }

  const listStyle = type !== 'link' ? styles.list : styles.linkList

  return (
    <View style={listStyle}>
      <CategoryColor color='#FF5607' isActive={isActive('home')} />
      {categories()}
    </View>
  )
}

CategoryColorList.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default CategoryColorList
