import { NavigationActions, TabNavigator } from 'react-navigation'
import _isEqual from 'lodash/isEqual'
import PopularTabBarNavigator from '../components/PopularTabBarNavigator'
import PopularTimelineScene from '../scenes/PopularTimelineScene'
import { buildCategoryTimelineScene } from '../scenes/CategoryTimelineScene'
import PublishersScene from '../scenes/PublishersScene'

let instance

class PopularNavigator {
  constructor () {
    if (!instance) instance = this
    this.routes = null
    this.config = {}
    this.categories = []
    this.initialRoute = null
    return instance
  }

  setCategories (categories) {
    if (_isEqual(this.categories, categories)) return
    this._component = null
    this.categories = categories
    this.routes = this.buildRoutes()
    this.config = this.buildConfig()
    this.initialRoute = this.buildInitialRoute()
  }

  buildRoutes () {
    let categoryRoutes = {}
    this.categories.forEach((category) => {
      categoryRoutes[category.slug] = {
        screen: buildCategoryTimelineScene(category),
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

  buildInitialRoute () {
    if (!this.component) return
    const initialState = this.component.router.getStateForAction(NavigationActions.INIT)
    return initialState.routes[initialState.index]
  }

  get component () {
    if (!this.categories) return null
    if (!this._component) this._component = TabNavigator(this.routes, this.config)
    return this._component
  }
}

export default new PopularNavigator()
