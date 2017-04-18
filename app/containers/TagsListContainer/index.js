import React, { Component, PropTypes} from 'react'
import TagsList from '../../components/TagsList'
import withQuery from './index.gql'
import _isNil from 'lodash/isNil'

class TagsListContainer extends Component {
  render () {
    const { data, active, handleTag, menuOpen } = this.props
    if (_isNil(data.tags) || !data.tags.length) return null
    return (
      <TagsList
        active={active}
        handleTag={handleTag}
        data={data}
        menuOpen={menuOpen}
      />
    )
  }
}

TagsListContainer.propTypes = {
  data: PropTypes.object.isRequired,
  handleTag: PropTypes.func.isRequired,
  active: PropTypes.string,
  menuOpen: PropTypes.bool.isRequired
}

export default withQuery(TagsListContainer)
