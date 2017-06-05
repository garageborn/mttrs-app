import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import TagsList from '../../components/TagsList'
import withQuery from './index.gql'
import { CategoriesActions } from '../../actions/index'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class TagsListContainer extends Component {
  constructor (props) {
    super(props)
    this.selectTag = this.selectTag.bind(this)
    updateCurrentScene(this, props.category.slug)
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

const mapStateToProps = (state, ownProps) => {
  return {
    selectedTag: state.CategoriesReducer.selectedTags[ownProps.category.id]
  }
}

const TagsListContainerWithData = withQuery(TagsListContainer)
export default connect(mapStateToProps)(TagsListContainerWithData)
