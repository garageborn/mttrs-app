import React from 'react'
import TimelineSceneContainer from '../containers/TimelineSceneContainer'
import CategorySceneContainer from '../containers/CategorySceneContainer'
import PublisherSceneContainer from '../containers/PublisherSceneContainer'
import LinkSceneContainer from '../containers/LinkSceneContainer'
import StoryLinksSceneContainer from '../containers/StoryLinksSceneContainer'
import { createRouter } from '@exponent/ex-navigation'

const Routes = {
  timeline: () => TimelineSceneContainer,
  category: () => CategorySceneContainer,
  publisher: () => PublisherSceneContainer,
  link: () => LinkSceneContainer,
  storyLinks: () => StoryLinksSceneContainer,
}

const Router = createRouter(() => Routes)

export default Router
