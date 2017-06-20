/* eslint-disable react/jsx-no-bind */
import React, { PropTypes, Component } from 'react'
import { FlatList } from 'react-native'
import _isEqual from 'lodash/isEqual'
import AddFavoritesItem from '../AddFavoritesItem'
import AddFavoritesHeading from '../AddFavoritesHeading'
import AddFavoritesFooter from '../AddFavoritesFooter'

class AddFavoritesList extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    const publishersChanged = !_isEqual(this.props.publishers, nextProps.publishers)
    const isCompleteChanged = this.props.isComplete !== nextProps.isComplete
    return publishersChanged || isCompleteChanged
  }

  render () {
    const { publishers } = this.props

    return (
      <FlatList
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.renderHeader.bind(this)} // https://github.com/facebook/react-native/issues/13602#issuecomment-300608431
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

  renderFooter () {
    const { isComplete, onComplete } = this.props
    return <AddFavoritesFooter isComplete={isComplete} onPress={onComplete} />
  }

  renderHeader () {
    const { isComplete, onComplete } = this.props
    return <AddFavoritesHeading isComplete={isComplete} onComplete={onComplete} />
  }

  renderRow (data) {
    return <AddFavoritesItem rowID={data.index} publisher={data.item} />
  }
}

AddFavoritesList.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  publishers: PropTypes.array.isRequired
}

export default AddFavoritesList
