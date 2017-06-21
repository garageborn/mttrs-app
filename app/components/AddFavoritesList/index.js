/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { FlatList } from 'react-native'
import AddFavoritesItem from '../AddFavoritesItem'
import AddFavoritesHeading from '../AddFavoritesHeading'
import AddFavoritesFooter from '../AddFavoritesFooter'

const AddFavoritesList = ({ isComplete, onComplete, publishers }) => {
  const extractKey = (item, index) => `addPublisher_${index}`

  const renderFooter = () => {
    return <AddFavoritesFooter isComplete={isComplete} onPress={onComplete} />
  }

  const renderHeader = () => {
    return <AddFavoritesHeading isComplete={isComplete} onComplete={onComplete} />
  }

  const renderRow = (data) => {
    return <AddFavoritesItem rowID={data.index} publisher={data.item} />
  }

  return (
    <FlatList
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
      data={publishers}
      keyExtractor={extractKey}
      renderItem={renderRow}
      numColumns={4}
    />
  )
}

AddFavoritesList.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  publishers: PropTypes.array.isRequired
}

export default AddFavoritesList
