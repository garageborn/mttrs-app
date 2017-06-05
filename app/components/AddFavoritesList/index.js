import React, { PropTypes, Component } from 'react'
import { FlatList } from 'react-native'
import _isEqual from 'lodash/isEqual'
import AddFavoritesItem from '../AddFavoritesItem'

class AddFavoritesList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !_isEqual(this.props.publishers, nextProps.publishers)
  }

  render () {
    const { publishers } = this.props

    return (
      <FlatList
        data={publishers}
        keyExtractor={this.extractKey}
        renderItem={this.renderRow}
        numColumns={4}
      />
    )
  }

  extractKey (item, index) {
    return `addPublisher_${index}`
  }

  renderRow (data) {
    return <AddFavoritesItem rowID={data.index} publisher={data.item} />
  }
}

AddFavoritesList.propTypes = {
  publishers: PropTypes.array.isRequired
}

export default AddFavoritesList
