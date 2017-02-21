import React, { Component, PropTypes } from 'react'
import CategoryColorList from '../../components/CategoryColorList'
import withQuery from './index.gql'

class HeaderBottomColorContainer extends Component {
  render () {
    const { data, lastPosition, position, subscribe } = this.props
    if (data.error) return null
    return (
      <CategoryColorList
        data={data}
        lastPosition={lastPosition}
        position={position}
        subscribe={subscribe}
      />
    )
  }
}

HeaderBottomColorContainer.propTypes = {
  data: PropTypes.object.isRequired,
  lastPosition: PropTypes.number.isRequired,
  position: PropTypes.any.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default withQuery(HeaderBottomColorContainer)
