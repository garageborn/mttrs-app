import React from 'react'
import HomeSceneContainer from '../containers/HomeSceneContainer'
import CategorySceneContainer from '../containers/CategorySceneContainer'
import PublisherSceneContainer from '../containers/PublisherSceneContainer'
import MenuContainer from '../containers/MenuContainer'
import LinkSceneContainer from '../containers/LinkSceneContainer'
import StoryLinksSceneContainer from '../containers/StoryLinksSceneContainer'
import { createRouter } from '@exponent/ex-navigation'

const Routes = {
  home: () => HomeSceneContainer,
  category: () => CategorySceneContainer,
  publisher: () => PublisherSceneContainer,
  menu: () => MenuContainer,
  link: () => LinkSceneContainer,
  storyLinks: () => StoryLinksSceneContainer,
}

const Router = createRouter(() => Routes)

export default Router
