import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import CategoriesSwiper from '../CategoriesSwiper'
import TagsListContainer from '../TagsListContainer'

class CategoriesTimelineContainer extends Component {
  constructor () {
    super()

    this.handleTag = this.handleTag.bind(this)
    this.handleTagCount = this.handleTagCount.bind(this)

    this.state = {
      activeTag: '',
      hasTags: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.handleActiveTag(nextProps)
  }

  render () {
    return (
      <View>
        {this.renderTags()}
        <CategoriesSwiper
          hasTags={this.state.hasTags}
          activeTag={this.state.activeTag}
          params={this.props.params}
        />
      </View>
    )
  }

  handleActiveTag (nextProps) {
    if (this.props.params.section === nextProps.params.section) return
    this.setState({ activeTag: '' })
  }

  renderTags () {
    let { section } = this.props.params
    if (!section) return null
    return (
      <TagsListContainer
        categorySlug={section.model.slug}
        active={this.state.activeTag}
        handleTag={this.handleTag}
        handleTagCount={this.handleTagCount}
      />
    )
  }

  handleTagCount (hasTags) {
    this.setState({
      hasTags
    })
  }

  handleTag (tag) {
    this.setState({
      activeTag: tag
    })
  }
}

CategoriesTimelineContainer.propTypes = {
  params: PropTypes.object
}

export default CategoriesTimelineContainer
