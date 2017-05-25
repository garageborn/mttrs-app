import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CategoriesSwiper from '../CategoriesSwiper'
import TagsListContainer from '../TagsListContainer'
import { AnalyticsActions } from '../../actions/index'
import _result from 'lodash/result'

class CategoriesTimelineContainer extends Component {
  constructor () {
    super()

    this.handleTag = this.handleTag.bind(this)

    this.state = {
      activeTag: null,
      hasTags: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.resetActiveTag(nextProps)
  }

  render () {
    return (
      <View>
        {this.renderTags()}
        <CategoriesSwiper activeTag={this.state.activeTag} params={this.props.params} />
      </View>
    )
  }

  resetActiveTag (nextProps) {
    if (!_result(this.props.params, 'section')) return
    if (this.props.params.section === nextProps.params.section) return
    this.setState({ activeTag: null })
  }

  renderTags () {
    const section = _result(this.props.navigation, 'state.params.section')
    if (!section || section.name === 'home') return null
    return (
      <TagsListContainer
        categorySlug={section.model.slug}
        active={this.state.activeTag}
        handleTag={this.handleTag}
      />
    )
  }

  handleTag (tag, categorySlug) {
    this.props.dispatch(AnalyticsActions.trackScreen(`/${categorySlug}/${tag}`))
    this.setState({ activeTag: tag })
  }
}

CategoriesTimelineContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect()(CategoriesTimelineContainer)
