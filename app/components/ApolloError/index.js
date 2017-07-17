import React, { Component, PropTypes } from 'react'
import captureError from '../../common/utils/captureError'
import Error from '../Error'

class ApolloError extends Component {
  constructor () {
    super()
    this.refetchData = this.refetchData.bind(this)
  }

  componentDidMount () {
    const { data } = this.props
    if (!data.error) return
    captureError(data, data.variables)
  }

  render () {
    const { skinType } = this.props
    return <Error skinType={skinType} onPressReload={this.refetchData} />
  }

  refetchData () {
    const { data } = this.props
    return data.refetch({ notifyOnNetworkStatusChange: true })
  }
}

ApolloError.propTypes = {
  skinType: PropTypes.string,
  data: PropTypes.object.isRequired
}

export default ApolloError
