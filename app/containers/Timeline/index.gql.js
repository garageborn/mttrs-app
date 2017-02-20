import { graphql } from 'react-apollo'
import _uniqBy from 'lodash/uniqBy'
import _isArray from 'lodash/isArray'
import { timezone } from '../../config/IntlProvider'

export const defaultVariables = {
  limit: 16,
  timezone
}

const pullToRefresh = ({ fetchMore, variables }) => {
  return fetchMore({
    variables: { ...variables, cursor: null },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) return previousResult

      const newTimeline = fetchMoreResult.data.timeline
      if (!newTimeline) return previousResult

      let timeline = [newTimeline].concat(previousResult.timeline)
      timeline = _uniqBy(timeline, item => item.date)
      return Object.assign({}, previousResult, { timeline: [...timeline] })
    }
  })
}

const infiniteScroll = ({ fetchMore, variables, timeline }) => {
  const items = _isArray(timeline) ? timeline : [timeline]
  if (!hasMore(items)) return

  const lastItem = items[items.length - 1]

  return fetchMore({
    variables: { ...variables, cursor: lastItem.date },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) return previousResult

      const previousTimeline = _isArray(previousResult.timeline) ? previousResult.timeline : [previousResult.timeline]

      return {
        timeline: previousTimeline.concat(fetchMoreResult.data.timeline)
      }
    }
  })
}

const hasMore = (items) => {
  const lastItem = items[items.length - 1]
  return lastItem && lastItem.stories && lastItem.stories.length > 0
}

export default function (Query, options) {
  const defaultOptions = {
    props ({ data }) {
      const { error, loading, timeline, variables } = data
      const items = _isArray(timeline) ? timeline : [timeline]

      return {
        data: {
          loading,
          error,
          variables,
          items,
          hasMore: hasMore(items),
          pullToRefresh: pullToRefresh.bind(this, data),
          infiniteScroll: infiniteScroll.bind(this, data)
        }
      }
    }
  }
  return graphql(Query, Object.assign({}, defaultOptions, options))
}
