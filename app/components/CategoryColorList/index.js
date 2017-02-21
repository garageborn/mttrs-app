import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import CategoryColor from '../../components/CategoryColor'
import styles from './styles'

class CategoryColorList extends Component {
  render () {
    if (this.props.data.loading || this.props.data.error) return null

    return (
      <View style={styles.list}>
        {this.renderHome()}
        {this.renderCategories()}
      </View>
    )
  }

  renderHome () {
    const { lastPosition, position, subscribe } = this.props
    return (
      <CategoryColor
        index={0}
        color='#FF5607'
        isActive={false}
        lastPosition={lastPosition}
        position={position}
        subscribe={subscribe}
      />
    )
  }

  renderCategories () {
    const { data, lastPosition, position, subscribe } = this.props

    return data.categories.map((category, index) => {
      return (
        <CategoryColor
          index={index + 1}
          key={category.id}
          color={category.color}
          isActive={false}
          lastPosition={lastPosition}
          position={position}
          subscribe={subscribe}
        />
      )
    })
  }

  // isActive (currentSection) {
  //   const { section } = this.props.params
  //   if (!section.model) return false
  //   return currentSection.slug === section.model.slug
  // }

  // isHome () {
  //   const { section } = this.props.params
  //   if (!section.model) return true
  //   return section.name === 'home'
  // }
}

CategoryColorList.propTypes = {
  data: PropTypes.object.isRequired,
  lastPosition: PropTypes.number.isRequired,
  position: PropTypes.any.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default CategoryColorList
