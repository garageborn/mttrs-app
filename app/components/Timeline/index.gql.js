import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'
import { timezone } from '../../config/IntlProvider'

const defaultVariables = {
  categorySlug: '',
  days: 2,
  offset: 0,
  perDay: 16,
  publisherSlug: '',
  timezone
}

const Query = gql`
  query($days: Int!, $offset: Int, $timezone: String, $type: String!, $perDay: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(days: $days, offset: $offset, timezone: $timezone, type: $type) {
      date
      stories(limit: $perDay, popular: true, category_slug: $categorySlug, publisher_slug: $publisherSlug) {
        id
        total_social
        headline
        summary
        main_category { name color slug }
        main_link(publisher_slug: $publisherSlug) {
          title
          url
          slug
          image_source_url
          publisher { name icon_id slug }
        }
        other_links_count
      }
    }
  }
`

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

export default function (Timeline) {
  return graphql(Query, {
    options (props) {
      let variables = {
        ...defaultVariables,
        type: props.type
      }
      if (props.type === 'home') return { variables: variables }
      return {
        variables: {
          ...variables,
          publisherSlug: props.type === 'publisher' ? props.filter.slug : '',
          categorySlug: props.type === 'category' ? props.filter.slug : ''
        }
      }
    },
    props ({ data }) {
      return {
        data: {
          ...data,
          pullToRefresh: pullToRefresh.bind(this, data),
          infiniteScroll: infiniteScroll.bind(this, data)
        }
      }
    }
  })(Timeline)
}
