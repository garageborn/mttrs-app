import _isNil from 'lodash/isNil'

import {
  REQUEST_TIMELINE, TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED, TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH, TIMELINE_PULL_TO_REFRESH_COMPLETED,
  TIMELINE_PULL_TO_INFINITE, TIMELINE_PULL_TO_INFINITE_COMPLETED,
  REQUEST_NEXT_TIMELINE, NEXT_TIMELINE_RECEIVED, NEXT_TIMELINE_DATE_RECEIVED,
  NEXT_TIMELINE_DATE_REQUEST, PAGINATE
} from '../constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false,
  isFetchingTop: false,
  nextItems: [],
  previousItems: [],
  isFetchingNext: false
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
    case NEXT_TIMELINE_DATE_REQUEST:
      let nextTimelineDateItem = state.nextItems.find(item => item.date === action.date)
      let nextIndex = state.nextItems.indexOf(nextTimelineDateItem)
      let nextNewTimelineDateItem = Object.assign({ stories: [] }, nextTimelineDateItem, { date: action.date, isNextFetching: true })
      let nextTimelineDateItems = replaceItem(state.nextItems, nextIndex, nextNewTimelineDateItem)
      return { ...state, nextItems: sortDate(nextTimelineDateItems) }
    case NEXT_TIMELINE_DATE_RECEIVED:
      let nextItems = [...state.nextItems]
      let nextDateItem = nextItems.find(item => item.date === action.date)
      Object.assign(nextDateItem, { stories: action.stories, isFetchingNext: false })
      return { ...state, nextItems }
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
    case REQUEST_NEXT_TIMELINE:
      return { ...state, nextItems: [], isFetchingNext: true }
    case PAGINATE:
      let pagination
      if (action.options === 'next') {
        pagination = { ...state, items: state.nextItems, previousItems: action.items, nextItems: [] }
      }

      return pagination
    default:
      return state
  }
}
