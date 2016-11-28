import _isNil from 'lodash/isNil'

import {
  REQUEST_TIMELINE, TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED, TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH, TIMELINE_PULL_TO_REFRESH_COMPLETED,
  TIMELINE_PULL_TO_INFINITE, TIMELINE_PULL_TO_INFINITE_COMPLETED,
  SWITCH_TENANT
} from '../constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false,
  isFetchingTop: false,
  tenant: 'mttrs'
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
  switch (action.type) {
    case TIMELINE_DATE_REQUEST:
      let timelineDateItem = state.items.find(item => item.date === action.date)
      let index = state.items.indexOf(timelineDateItem)
      let newTimelineDateItem = Object.assign({ stories: [] }, timelineDateItem, { date: action.date, isFetching: true })
      let timelineDateItems = replaceItem(state.items, index, newTimelineDateItem)
      return { ...state, items: sortDate(timelineDateItems) }
    case TIMELINE_DATE_RECEIVED:
      let items = [...state.items]
      let dateItem = items.find(item => item.date === action.date)
      Object.assign(dateItem, { stories: action.stories, isFetching: false })
      if (!_isNil(action.options.publisher_slug)) {
        items = publisherItems(items, action)
      }
      return { ...state, items }
    case TIMELINE_RECEIVED:
      return { ...state, isFetching: false }
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, isFetchingTop: true }
    case TIMELINE_PULL_TO_REFRESH_COMPLETED:
      return { ...state, isFetchingTop: false }
    case TIMELINE_PULL_TO_INFINITE:
      return { ...state, isFetchingBottom: true }
    case TIMELINE_PULL_TO_INFINITE_COMPLETED:
      return { ...state, isFetchingBottom: false }
    case REQUEST_TIMELINE:
      return { ...state, items: [], isFetching: true }
    case SWITCH_TENANT:
      return { ...state, tenant: action.tenant }
    default:
      return state
  }
}
