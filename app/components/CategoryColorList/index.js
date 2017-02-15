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
    return (
      <CategoryColor
        categoriesLength={this.props.data.categories.length}
        color='#FF5607'
        isActive={this.isHome()}
      />
    )
  }

  renderCategories () {
    return this.props.data.categories.map(category => this.renderCategory(category))
  }

  renderCategory (category) {
    return (
      <CategoryColor
        categoriesLength={this.props.data.categories.length}
        key={category.id}
        color={category.color}
        isActive={this.isActive(category)}
      />
    )
  }

  isActive (currentSection) {
    const { section } = this.props.params
    if (!section.model) return false
    return currentSection.slug === section.model.slug
  }

  isHome () {
    const { section } = this.props.params
    if (!section.model) return true
    return section.model.name === 'home'
  }
}

CategoryColorList.propTypes = {
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default CategoryColorList
