import React, { PropTypes } from 'react'
import { View } from 'react-native'
import CategoryColor from '../../components/CategoryColor'
import styles from './styles'

const CategoryColorList = ({data}) => {
  let categories = () => {
    if (data.loading) return
    return data.categories.map(category => {
      return <CategoryColor key={category.id} color={category.color} />
    })
  }

  return (
    <View style={styles.list}>
      <CategoryColor color='#FF5607' />
      {categories()}
    </View>
  )
}

CategoryColorList.propTypes = {
  data: PropTypes.object.isRequired
}

export default CategoryColorList
