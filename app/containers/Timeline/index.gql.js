import { graphql } from 'react-apollo'
import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'
import { timezone } from '../../config/IntlProvider'

export const defaultVariables = {
  days: 1,
  offset: 0,
  perDay: 16,
  timezone
}

const pullToRefresh = ({ fetchMore, variables }) => {
  return fetchMore({
    variables: { ...variables, days: 1, offset: 0 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) { return previousResult }
      let timeline = fetchMoreResult.data.timeline.concat(previousResult.timeline)
      timeline = _uniqBy(timeline, item => item.date)
      timeline = _sortBy(timeline, item => -item.date)
      return Object.assign({}, previousResult, { timeline: [...timeline] })
    }
  })
}

const infiniteScroll = ({ fetchMore, variables, timeline }) => {
  return fetchMore({
    variables: { ...variables, days: 1, offset: timeline.length },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult.data) { return previousResult }
      return Object.assign({}, previousResult, {
        timeline: [...previousResult.timeline, ...fetchMoreResult.data.timeline]
      })
    }
  })
}

export default function (Query, options) {
  const defaultOptions = {
    props ({ data }) {
      return {
        data: {
          ...data,
          pullToRefresh: pullToRefresh.bind(this, data),
          infiniteScroll: infiniteScroll.bind(this, data)
        }
      }
    }
  }
  return graphql(Query, Object.assign({}, defaultOptions, options))
}
