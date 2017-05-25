import React, { PropTypes, Component } from 'react'
import { FlatList } from 'react-native'
import FavoritePublishersItem from '../FavoritePublishersItem'

class FavoritePublishersList extends Component {
  constructor (props) {
    super(props)
    this.shouldItemUpdate = this.shouldItemUpdate.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    const { publishers } = this.props

    return (
      <FlatList
        data={publishers}
        keyExtractor={this.extractKey}
        renderItem={this.renderRow}
        shouldItemUpdate={this.shouldItemUpdate}
      />
    )
  }

  extractKey (item, index) {
    return `addPublisher_${index}`
  }

  renderRow (data) {
    return <FavoritePublishersItem rowID={data.index} publisher={data.item} />
  }

  shouldItemUpdate (props, nextProps) {
    return props.item.id !== nextProps.item.id
  }
}

FavoritePublishersList.propTypes = {
  publishers: PropTypes.array.isRequired
}

export default FavoritePublishersList
