import React, { PropTypes, Component } from 'react'
import { FlatList } from 'react-native'
import FavoritePublisherSelector from '../FavoritePublisherSelector'

class FavoritePublishersSelector extends Component {
  constructor (props) {
    super(props)
    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    const { publishers } = this.props
    if (!publishers) return null

    return (
      <FlatList
        data={publishers}
        horizontal
        keyExtractor={this.extractKey}
        renderItem={this.renderRow}
        shouldItemUpdate={this.shouldItemUpdate}
      />
    )
  }

  extractKey (item, index) {
    return `selectPublisher_${index}`
  }

  renderRow (data) {
    const { index, item } = data
    const { openPublisher } = this.props
    return (
      <FavoritePublisherSelector
        rowID={index}
        publisher={item}
        onPress={openPublisher}
        />
    )
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }
}

FavoritePublishersSelector.propTypes = {
  publishers: PropTypes.array,
  openPublisher: PropTypes.func.isRequired
}

export default FavoritePublishersSelector
