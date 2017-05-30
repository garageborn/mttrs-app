import React, { PropTypes, Component } from 'react'
import { FlatList, View } from 'react-native'
import FavoritePublisherSelector from '../FavoritePublisherSelector'
import CategoryColor from '../CategoryColor'
import FavoritePublishersNavigationButtonContainer from '../../containers/FavoritePublishersNavigationButtonContainer'
import styles from './styles'

class FavoritePublishersSelector extends Component {
  constructor (props) {
    super(props)
    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    const { publishers, selectedCategory } = this.props
    if (!publishers) return null

    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={publishers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={this.extractKey}
            renderItem={this.renderRow}
            shouldItemUpdate={this.shouldItemUpdate}
            removeClippedSubviews={false}
            style={styles.listContainer}
          />
          <FavoritePublishersNavigationButtonContainer style={styles.buttonContainer} />
        </View>
        <CategoryColor category={selectedCategory} />
      </View>
    )
  }

  extractKey (item, index) {
    return `selectPublisher_${index}`
  }

  renderRow (data) {
    const { index, item } = data
    const { openPublisher } = this.props
    return <FavoritePublisherSelector rowID={index} publisher={item} onPress={openPublisher} />
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }
}

FavoritePublishersSelector.propTypes = {
  publishers: PropTypes.array,
  openPublisher: PropTypes.func.isRequired,
  selectedCategory: PropTypes.any
}

export default FavoritePublishersSelector
