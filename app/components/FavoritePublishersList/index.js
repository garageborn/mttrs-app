import React, { PropTypes, Component } from 'react'
import { FlatList } from 'react-native'
import _isEqual from 'lodash/isEqual'
import FavoritePublishersItem from '../FavoritePublishersItem'

class FavoritePublishersList extends Component {
  constructor (props) {
    super(props)
    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !_isEqual(this.props.publishers, nextProps.publishers)
  }

  render () {
    const { publishers } = this.props

    return (
      <FlatList
        style={{flexGrow: 1, flex: 1}}
        data={publishers}
        keyExtractor={this.extractKey}
        renderItem={this.renderRow}
        shouldItemUpdate={this.shouldItemUpdate}
        removeClippedSubviews={false}
      />
    )
  }

  extractKey (item, index) {
    return `addPublisher_${index}`
  }

  renderRow (data) {
    const { index, item } = data
    const { openPublisher } = this.props
    return <FavoritePublishersItem rowID={index} publisher={item} onPress={openPublisher} />
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }
}

FavoritePublishersList.propTypes = {
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default FavoritePublishersList
