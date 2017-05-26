import React, { Component, PropTypes } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import _result from 'lodash/result'
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
    this.renderTags = this.renderTags.bind(this)
  }

  render () {
    const { data } = this.props
    if (data.loading) return this.renderLoader()

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
        {this.renderDefaultTag()}
        {this.renderTags()}
      </ScrollView>
    )
  }

  renderDefaultTag () {
    const { intl, selectTag } = this.props
    return (
      <Tag active={this.isSelected()} onPress={() => selectTag()}>
        {intl.formatMessage(messages.default)}
      </Tag>
    )
  }

  renderTags () {
    const { selectTag, data } = this.props
    return data.tags.map((tag, idx) => {
      return (
        <Tag
          key={`tag_${idx}`}
          last={this.isLast(idx)}
          active={this.isSelected(tag)}
          onPress={() => selectTag(tag)}
        >
          {tag.name}
        </Tag>
      )
    })
  }

  renderLoader () {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator color='#AAA' />
      </View>
    )
  }

  isLast (idx) {
    return idx === this.props.data.tags.length - 1
  }

  isSelected (tag) {
    return _result(tag, 'id') === _result(this.props, 'active.id')
  }
}

TagsList.propTypes = {
  active: PropTypes.shape({
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
