import _isNil from 'lodash/isNil'

import {
  REQUEST_TIMELINE, TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED, TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH, TIMELINE_PULL_TO_REFRESH_COMPLETED,
  TIMELINE_PULL_TO_INFINITE, TIMELINE_PULL_TO_INFINITE_COMPLETED
} from '../constants/ActionTypes'

let defaultState = {
  items: {},
  isFetchingTop: false
}

const replaceItem = (source, index, item) => {
  if (index === -1) {
    return source.concat(item)
  } else {
    return [
      ...source.slice(0, index),
      item,
      ...source.slice(index + 1)
    ]
  }
}

const sortDate = items => {
  return items.sort((a, b) => b.date - a.date)
}

const publisherItems = (items, action) => {
  items.map((itemsArray) => {
    itemsArray.stories.map((story) => {
      if (story.main_link.publisher.slug !== action.options.publisher_slug) {
        const publisherLink = story.other_links.find((link) =>
          link.publisher.slug === action.options.publisher_slug)
        story.other_links = [
          story.main_link,
          ...story.other_links.slice(0, story.other_links.indexOf(publisherLink)),
          ...story.other_links.slice(story.other_links.indexOf(publisherLink) + 1)
        ]
        story.main_link = publisherLink
      }
    })
  })
  return items
}

export default function(state = defaultState, action) {
  // console.info('--------', action.type, state.items)
  switch (action.type) {
    case TIMELINE_DATE_REQUEST:
      let key = action.options.category_slug || 'home'
      let items = Object.assign({}, state.items)
      if (!items[key]) items[key] = []

      let timelineDateItem = items[key].find(item => item.date === action.date)
      let index = items[key].indexOf(timelineDateItem)
      let newTimelineDateItem = Object.assign({ stories: [] }, timelineDateItem, { date: action.date, isFetching: true })
      let timelineDateItems = replaceItem(items[key], index, newTimelineDateItem)

      items[key] = sortDate(timelineDateItems)
      return { ...state, items: items }

    case TIMELINE_DATE_RECEIVED:
      let key2 = action.options.category_slug || 'home'
      let items2 = Object.assign({}, state.items)
      let dateItem = items2[key2].find(item => item.date === action.date)
      Object.assign(dateItem, { stories: action.stories, isFetching: false })
      // if (!_isNil(action.options.publisher_slug)) {
      //   items = publisherItems(items, action)
      // }
      return { ...state, items: items2 }

    case TIMELINE_RECEIVED:
      return { ...state, isFetching: false }
    // case TIMELINE_PULL_TO_REFRESH:
    //   return { ...state, isFetchingTop: true }
    // case TIMELINE_PULL_TO_REFRESH_COMPLETED:
    //   return { ...state, isFetchingTop: false }
    // case TIMELINE_PULL_TO_INFINITE:
    //   return { ...state, isFetchingBottom: true }
    // case TIMELINE_PULL_TO_INFINITE_COMPLETED:
    //   return { ...state, isFetchingBottom: false }
    // case REQUEST_TIMELINE:
    //   return { ...state, items: {}, isFetching: true }

    default:
      return state
  }
}
