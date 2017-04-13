import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import CategoriesSwiper from '../CategoriesSwiper'
import TagsListContainer from '../TagsListContainer'
import { AnalyticsActions } from '../../actions/index'

class CategoriesTimelineContainer extends Component {
  constructor () {
    super()

    this.handleTag = this.handleTag.bind(this)
    this.handleTagCount = this.handleTagCount.bind(this)

    this.state = {
      activeTag: null,
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
    this.setState({ activeTag: null })
  }

  renderTags () {
    let { section } = this.props.params
    if (!section || section.name === 'home') return null
    return (
      <TagsListContainer
        categorySlug={section.model.slug}
        active={this.state.activeTag}
        handleTag={this.handleTag}
        handleTagCount={this.handleTagCount}
        menuOpen={this.props.menuOpen}
      />
    )
  }

  handleTagCount (hasTags) {
    this.setState({
      hasTags
    })
  }

  handleTag (tag) {
    this.props.dispatch(AnalyticsActions.trackScreen(`/${tag}`))
    this.setState({
      activeTag: tag
    })
  }
}

CategoriesTimelineContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    menuOpen: state.uiReducer.menu.isOpen
  }
}

export default connect(mapStateToProps)(CategoriesTimelineContainer)
