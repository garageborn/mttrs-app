import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import CategoryColor from '../../components/CategoryColor'
import TimelineContainer from '../TimelineContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class PublisherTimeline extends Component {
  constructor () {
    super()
    updateCurrentScene(this, 'publisher')
  }

  render () {
    const { data, publisher, selectedCategory } = this.props
    const renderOptions = { timelineType: 'publisher', publisherSlug: publisher.slug }

    return (
      <View>
        <CategoryColor category={selectedCategory} />
        <TimelineContainer data={data} renderOptions={renderOptions} />
      </View>
    )
  }
}

PublisherTimeline.propTypes = {
  selectedCategory: PropTypes.object,
  data: PropTypes.object,
  publisher: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.PublishersReducer.selectedCategory
  }
}

const PublisherTimelineWithQuery = withQuery(PublisherTimeline)
export default connect(mapStateToProps)(PublisherTimelineWithQuery)
