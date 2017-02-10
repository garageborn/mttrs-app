import React, { PropTypes } from 'react'
import Error from '../Error'

const ApolloError = ({ skinType, data }) => {
  let refetchData = () => {
    return data.refetch({
      notifyOnNetworkStatusChange: true
    })
  }

  return (
    <Error skinType={skinType} onPressReload={refetchData} />
  )
}

ApolloError.propTypes = {
  skinType: PropTypes.string,
  data: PropTypes.object.isRequired
}

export default ApolloError
