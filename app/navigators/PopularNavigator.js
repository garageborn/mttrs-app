import { TabNavigator } from 'react-navigation'
import PopularTabBarNavigator from '../components/PopularTabBarNavigator'
import PopularTimelineScene from '../scenes/PopularTimelineScene'
import CategoryTimelineScene from '../scenes/CategoryTimelineScene'
import PublishersScene from '../scenes/PublishersScene'

let instance

class PopularNavigator {
  constructor () {
    if (!instance) instance = this
    this.routes = {
      home: { screen: PopularTimelineScene },
      publishers: { screen: PublishersScene }
    }
    this.config = {}
    this.categories = []
    return instance
  }

  setCategories (categories) {
    console.log('---------------------setCategories', categories)
    this._component = null
    this.categories = categories
    this.routes = this.buildRoutes()
    this.config = this.buildConfig()
  }

  buildRoutes () {
    let categoryRoutes = {}
    this.categories.forEach((category) => {
      categoryRoutes[category.slug] = {
        screen: CategoryTimelineScene,
        navigationOptions: {
          tabBarLabel: category
        }
      }
    })

    return {
      home: { screen: PopularTimelineScene },
      ...categoryRoutes,
      publishers: { screen: PublishersScene }
    }
  }

  buildConfig () {
    return {
      ...TabNavigator.Presets.AndroidTopTabs,
      tabBarOptions: { categories: this.categories },
      tabBarComponent: PopularTabBarNavigator,
      headerMode: 'none',
      tabBarPosition: 'top',
      lazy: true,
      swipeEnabled: true,
      animationEnabled: true
    }
  }

  get component () {
    if (!this._component) {
      console.log('    buildNewComponent', { routesLength: Object.keys(this.routes).length})

      this._component = TabNavigator(Object.assign({}, this.routes), Object.assign({}, this.config))
    }
    return this._component
  }

  getStateForAction (action, state) {
    console.log('getStateForAction', this.categories.length, this.component.router.getStateForAction(action, state))
    return this.component.router.getStateForAction(action, state)
  }
}

export default new PopularNavigator()
