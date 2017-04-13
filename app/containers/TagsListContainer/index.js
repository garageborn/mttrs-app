import React, { Component, PropTypes} from 'react'
import TagsList from '../../components/TagsList'
import withQuery from './index.gql'
import _isNil from 'lodash/isNil'

class TagsListContainer extends Component {
  componentWillReceiveProps (nextProps) {
    this.handleTags(nextProps)
  }

  render () {
    const { data, active, handleTag, menuOpen } = this.props
    if (data.loading || _isNil(data.tags)) return null
    if (!data.tags.length) return null
    return (
      <TagsList
        active={active}
        handleTag={handleTag}
        tags={data.tags}
        menuOpen={menuOpen}
      />
    )
  }

  handleTags (nextProps) {
    if (nextProps.data.loading) return
    if (!this.props.data.tags && !nextProps.data.tags) return
    if (_isNil(nextProps.data)) return
    if (!nextProps.data.tags.length) return this.props.handleTagCount(false)
    this.props.handleTagCount(nextProps.data.tags.length)
  }
}

TagsListContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    tags: PropTypes.array
  }),
  handleTag: PropTypes.func.isRequired,
  handleTagCount: PropTypes.func.isRequired,
  active: PropTypes.string,
  menuOpen: PropTypes.bool.isRequired
}

export default withQuery(TagsListContainer)
