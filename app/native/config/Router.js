import React from 'react'
import HomeSceneContainer from '../containers/HomeSceneContainer'
import CategorySceneContainer from '../containers/CategorySceneContainer'
import PublisherSceneContainer from '../containers/PublisherSceneContainer'
import MenuContainer from '../containers/MenuContainer'
import StorySceneContainer from '../containers/StorySceneContainer'
import StoryLinksSceneContainer from '../containers/StoryLinksSceneContainer'
import { createRouter } from '@exponent/ex-navigation'

const Routes = {
  home: () => HomeSceneContainer,
  category: () => CategorySceneContainer,
  publisher: () => PublisherSceneContainer,
  menu: () => MenuContainer,
  story: () => StorySceneContainer,
  storyLinks: () => StoryLinksSceneContainer,
}

const Router = createRouter(() => Routes)

export default Router
