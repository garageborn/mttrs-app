import React, { PropTypes } from 'react'
import { FlatList } from 'react-native'
import FavoritePublishersItem from '../FavoritePublishersItem'

const FavoritePublishersList = ({ publishers, openPublisher }) => {
  const extractKey = (item, index) => `addPublisher_${index}`

  const renderRow = (data) => {
    const { index, item } = data
    return <FavoritePublishersItem rowID={index} publisher={item} onPress={openPublisher} />
  }

  return (
    <FlatList
      style={{flexGrow: 1, flex: 1}}
      data={publishers}
      keyExtractor={extractKey}
      renderItem={renderRow}
      removeClippedSubviews={false}
    />
  )
}

FavoritePublishersList.propTypes = {
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default FavoritePublishersList
