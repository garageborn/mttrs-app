import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import TopStoriesCategory from '../TopStoriesCategory'
import CategoryScrollView from '../CategoryScrollView'
import styles from './styles'

class CategoryMenu extends Component {
  render () {
    const { data, openHome, openCategory } = this.props
    return (
      <View style={styles.container}>
        <TopStoriesCategory openHome={openHome} />
        <CategoryScrollView data={data} openCategory={openCategory} />
      </View>
    )
  }
}

CategoryMenu.propTypes = {
  data: PropTypes.object.isRequired,
  openHome: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired
}

export default CategoryMenu
