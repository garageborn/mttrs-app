import { Platform } from 'react-native'
import { graphql } from 'react-apollo'
import AndroidIntl from 'intl'
import gql from 'graphql-tag'
import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'
require('../config/IntlProvider').locale

if (Platform.OS === 'android') global.Intl = AndroidIntl

const defaultVariables = {
  categorySlug: '',
  days: 5,
  offset: 0,
  perDay: 10,
  publisherSlug: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
}

const Query = gql`
  query($days: Int!, $offset: Int, $timezone: String, $perDay: Int!, $categorySlug: String, $publisherSlug: String) {
    timeline(days: $days, offset: $offset, timezone: $timezone) {
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
      if (props.type === 'home') return { variables: defaultVariables }
      return {
        variables: {
          ...defaultVariables,
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
