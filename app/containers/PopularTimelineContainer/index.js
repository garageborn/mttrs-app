import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class PopularTimelineContainer extends Component {
  constructor (props) {
    super(props)
    updateCurrentScene(this, 'home')
  }

  render () {
    const { data } = this.props
    return <TimelineContainer data={data} />
  }
}

PopularTimelineContainer.propTypes = {
  data: PropTypes.object
}

const PopularTimelineContainerWithData = withQuery(PopularTimelineContainer)
export default PopularTimelineContainerWithData
