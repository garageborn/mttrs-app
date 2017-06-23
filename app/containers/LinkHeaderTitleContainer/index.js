import React, { Component, PropTypes} from 'react'
import LinkHeaderTitle from '../../components/LinkHeaderTitle'
import withQuery from './index.gql'

class LinkHeaderTitleContainer extends Component {
  render () {
    const { link, loading } = this.props.data
    if (loading) return null
    return <LinkHeaderTitle link={link} />
  }
}

LinkHeaderTitleContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    link: PropTypes.object
  }).isRequired
}

const LinkHeaderTitleContainerWithData = withQuery(LinkHeaderTitleContainer)
export default LinkHeaderTitleContainerWithData
