import React, { PropTypes } from 'react'
import { SectionList } from 'react-native'
import PublisherSelectorListItem from '../PublisherSelectorListItem'
import PublisherSelectorSectionHeader from '../PublisherSelectorSectionHeader'
import styles from './styles'

const PublisherSelectorList = ({ publishers, openPublisher }) => {
  const extractKey = (item, index) => `publisher_${index}`

  const renderSectionHeader = (sectionData) => {
    return <PublisherSelectorSectionHeader section={sectionData.section.key} />
  }

  const renderRow = (publisher) => {
    return (
      <PublisherSelectorListItem
        key={publisher.item.id}
        publisher={publisher.item}
        onPress={openPublisher}
      />
    )
  }

  const getSection = (publisher) => publisher.slug.substring(0, 1).toUpperCase()

  const sections = () => {
    let rows = {}

    publishers.map(publisher => {
      let letter = getSection(publisher)
      if (!rows[letter]) rows[letter] = []
      rows[letter].push(publisher)
    })

    return Object.keys(rows).map((key) => {
      return { 'key': key, 'data': rows[key] }
    })
  }

  if (!publishers || !publishers.length) return null

  return (
    <SectionList
      style={styles.container}
      keyExtractor={extractKey}
      sections={sections()}
      renderItem={renderRow}
      renderSectionHeader={renderSectionHeader}
    />
  )
}

PublisherSelectorList.propTypes = {
  publishers: PropTypes.array.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default PublisherSelectorList
