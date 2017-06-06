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
    this.renderHeader = this.renderHeader.bind(this)
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
        ListHeaderComponent={this.renderHeader}
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
    const { isComplete, openFavoritesTimeline } = this.props
    return <AddFavoritesFooter isComplete={isComplete} onPress={openFavoritesTimeline} />
  }

  renderHeader () {
    const { isComplete, openFavoritesTimeline } = this.props
    return <AddFavoritesHeading isComplete={isComplete} openFavoritesTimeline={openFavoritesTimeline} />
  }

  renderRow (data) {
    return <AddFavoritesItem rowID={data.index} publisher={data.item} />
  }
}

AddFavoritesList.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  openFavoritesTimeline: PropTypes.func.isRequired,
  publishers: PropTypes.array.isRequired
}

export default AddFavoritesList
