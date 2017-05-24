import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CategoryTimelineContainer from '../../containers/CategoryTimelineContainer'
import TagsListContainer from '../../containers/TagsListContainer'
import { AnalyticsActions } from './../../actions/index'

class CategoryTimelineScene extends Component {
  constructor () {
    super()
    this.state = { activeTag: null }
    this.handleTag = this.handleTag.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.resetActiveTag(nextProps)
  }

  render () {
    const { activeTag } = this.state

    return (
      <View>
        <TagsListContainer
          active={activeTag}
          categorySlug={this.categorySlug}
          handleTag={this.handleTag}
          />
        <CategoryTimelineContainer categorySlug={this.categorySlug} activeTag={activeTag} />
      </View>
    )
  }

  handleTag (tag) {
    const { dispatch } = this.props
    dispatch(AnalyticsActions.trackScreen(`/${this.categorySlug}/${tag}`))
    this.setState({ activeTag: tag })
  }

  resetActiveTag (nextProps) {
    // if (this.props.params.section === nextProps.params.section) return
    // this.setState({ activeTag: null })
  }

  get categorySlug () {
    return this.props.navigation.state.routeName
  }
}

export default connect()(CategoryTimelineScene)
