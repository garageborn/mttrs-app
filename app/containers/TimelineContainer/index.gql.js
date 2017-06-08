import { graphql } from 'react-apollo'
import _compact from 'lodash/compact'
import _uniqBy from 'lodash/uniqBy'
import _isArray from 'lodash/isArray'
import _result from 'lodash/result'
import makeCancelable from '../../common/utils/makeCancelable'

export const defaultVariables = { limit: 16 }

const pullToRefresh = ({ fetchMore, variables }) => {
  const promise = new Promise((resolve, reject) => {
    fetchMore({
      variables: { ...variables, cursor: null },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        // const newTimeline = fetchMoreResult.timeline
        const newTimeline = {}
        if (!newTimeline) return previousResult

        let timeline = _compact([newTimeline].concat(previousResult.timeline))
        timeline = _uniqBy(timeline, item => _result(item, 'date'))
        return { timeline: [...timeline] }
      }
    }).then(resolve).catch(reject)
  })
  return makeCancelable(promise)
}

const infiniteScroll = ({ fetchMore, variables, timeline }) => {
  const promise = new Promise((resolve, reject) => {
    const items = timelineToItems(timeline)
    if (!hasMore(items)) return resolve()

    const lastItem = items[items.length - 1]

    fetchMore({
      variables: { ...variables, cursor: lastItem.date },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.timeline) return previousResult

        const previousTimeline = timelineToItems(previousResult.timeline)
        const nextTimeline = [fetchMoreResult.timeline]
        return { timeline: [...previousTimeline, ...nextTimeline] }
      }
    }).then(resolve).catch(reject)
  })
  return makeCancelable(promise)
}

const hasMore = (items) => {
  const lastItem = items[items.length - 1]
  return lastItem && lastItem.stories && lastItem.stories.length > 0
}

const timelineToItems = (timeline) => {
  if (!timeline) return []
  return _isArray(timeline) ? timeline : [timeline]
}

export default function (Query, options) {
  const defaultOptions = {
    props ({ data }) {
      const { error, loading, timeline, variables, refetch } = data
      const items = timelineToItems(timeline)

      return {
        data: {
          loading,
          error,
          variables,
          items,
          refetch,
          hasMore: hasMore(items),
          pullToRefresh: pullToRefresh.bind(this, data),
          infiniteScroll: infiniteScroll.bind(this, data)
        }
      }
    }
  }
  return graphql(Query, Object.assign({}, defaultOptions, options))
}
