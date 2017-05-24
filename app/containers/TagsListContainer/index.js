import React, { Component, PropTypes} from 'react'
import TagsList from '../../components/TagsList'
import withQuery from './index.gql'
import _result from 'lodash/isNil'

class TagsListContainer extends Component {
  render () {
    const { data, active, handleTag } = this.props
    if (!_result(data, 'tags.length')) return null
    return <TagsList active={active} handleTag={handleTag} data={data} />
  }
}

TagsListContainer.propTypes = {
  data: PropTypes.object.isRequired,
  handleTag: PropTypes.func.isRequired,
  active: PropTypes.string
}

export default withQuery(TagsListContainer)
