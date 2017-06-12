import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _result from 'lodash/result'
import ScrollableTabBar from '../ScrollableTabBar'
import Tag from '../Tag'
import styles from './styles'

const messages = defineMessages({
  default: {
    id: 'tags.default'
  }
})

class TagsList extends Component {
  constructor () {
    super()
    this.renderTag = this.renderTag.bind(this)
  }

  render () {
    const { data } = this.props
    if (data.loading) return this.renderLoader()
    const tags = [{ id: null }, ...data.tags]

    return (
      <ScrollableTabBar
        style={styles.container}
        containerStyle={styles.containerStyle}
        index={this.selectedIndex}
        tabs={tags}
        renderTab={this.renderTag}
      />
    )
  }

  renderDefaultTag () {
    const { intl, selectTag } = this.props
    return (
      <Tag active={this.isSelected()} first onPress={() => selectTag()}>
        {intl.formatMessage(messages.default)}
      </Tag>
    )
  }

  renderTag (tag, index) {
    const { selectTag } = this.props

    if (!tag.id) return this.renderDefaultTag()

    return (
      <Tag
        active={this.isSelected(tag)}
        onPress={() => selectTag(tag)}
      >
        {tag.name}
      </Tag>
    )
  }

  renderLoader () {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator color='#AAA' />
      </View>
    )
  }

  isSelected (tag) {
    return _result(tag, 'id') === _result(this.props, 'selectedTag.id')
  }

  get selectedIndex () {
    const { data, selectedTag } = this.props
    if (!selectedTag) return 0
    return data.tags.indexOf(selectedTag) + 1
  }
}

TagsList.propTypes = {
  selectedTag: PropTypes.shape({
    id: PropTypes.any
  }),
  data: PropTypes.shape({
    tags: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,
  selectTag: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(TagsList)
