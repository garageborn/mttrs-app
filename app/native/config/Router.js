import React from 'react'
import HomeSceneContainer from '../containers/HomeSceneContainer'
import CategorySceneContainer from '../containers/CategorySceneContainer'
import PublisherSceneContainer from '../containers/PublisherSceneContainer'
import MenuContainer from '../containers/MenuContainer'
import StorySceneContainer from '../containers/StorySceneContainer'
import StoryLinksSceneContainer from '../containers/StoryLinksSceneContainer'
import { createRouter } from '@exponent/ex-navigation'

const Router = createRouter(() => ({
  home: () => HomeSceneContainer,
  menu: () => MenuContainer,
  story: () => StorySceneContainer,
}));

// class Routes {
//   static fetchData({ dispatch }) {
//     return [
//       dispatch(CategoryActions.getCategories()),
//       dispatch(PublishersActions.getPublishers())
//     ]
//   }

//   static all(store) {
//     return Actions.create(
//       <Scene key='modal' component={Modal} direction='vertical'>
//         <Scene key='root' hideNavBar={true} initial={true}>
//           <Scene key='home' type={ActionConst.REPLACE} component={HomeSceneContainer} initial={true}/>
//           <Scene key='menu' component={MenuContainer} direction='vertical'/>
//           <Scene key='category' type={ActionConst.REPLACE} component={CategorySceneContainer}/>
//           <Scene key='publisher' type={ActionConst.REPLACE} component={PublisherSceneContainer}/>
//           <Scene key='story' type={ActionConst.REPLACE} component={StorySceneContainer}/>
//         </Scene>
//         <Scene key='storyLinks' component={StoryLinksSceneContainer}/>
//       </Scene>
//     )
//   }
// }

export default Router
