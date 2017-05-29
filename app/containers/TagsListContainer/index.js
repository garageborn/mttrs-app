import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import TagsList from '../../components/TagsList'
import withQuery from './index.gql'
import { CategoriesActions } from '../../actions/index'

class TagsListContainer extends Component {
  constructor () {
    super()
    this.selectTag = this.selectTag.bind(this)
  }

  render () {
    const { data, selectedTag } = this.props
    if (!_result(data, 'tags.length')) return null
    return <TagsList selectedTag={selectedTag} selectTag={this.selectTag} data={data} />
  }

  selectTag (tag) {
    const { category, dispatch } = this.props
    dispatch(CategoriesActions.selectTag(category, tag))
  }
}

TagsListContainer.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.any.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.object.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    selectedTag: state.CategoriesReducer.selectedTags[ownProps.category.id]
  }
}

const TagsListContainerWithData = withQuery(TagsListContainer)
export default connect(mapStateToProps)(TagsListContainerWithData)
