import React from 'react'
import TimelineSceneContainer from '../containers/TimelineSceneContainer'
import LinkSceneContainer from '../containers/LinkSceneContainer'
import StoryLinksSceneContainer from '../containers/StoryLinksSceneContainer'
import { createRouter } from '@exponent/ex-navigation'

const Routes = {
  timeline: () => TimelineSceneContainer,
  link: () => LinkSceneContainer,
  storyLinks: () => StoryLinksSceneContainer,
}

const Router = createRouter(() => Routes)

export default Router
