import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import _isEqual from 'lodash/isEqual'
import CategoryTile from '../../components/CategoryTile'
import styles from './styles'

class CategoryScrollView extends Component {
  shouldComponentUpdate (nextProps) {
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    if (loadingChanged) return true
    return !_isEqual(this.props.data.categories, nextProps.data.categories)
  }

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
