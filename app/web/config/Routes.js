import React from 'react'
import MainContainer from '../containers/MainContainer'
import {Route} from 'react-router'
import * as CategoryActions from '../../actions/CategoryActions'
import * as PublishersActions from '../../actions/PublishersActions'

class Routes {
  static fetchData({ dispatch }) {
    return [
      dispatch(CategoryActions.getCategories()),
      dispatch(PublishersActions.getPublishers())
    ]
  }

  static all(store) {
    let categories = store.getState().CategoriesReducers.categories
    let publishers = store.getState().PublishersReducers.publishers
    return [
      ...Routes.defaultRoutes(),
      ...Routes.categoriesRoutes(categories),
      ...Routes.publishersRoutes(publishers)
    ]
  }

  static defaultRoutes() {
    return [
      <Route path='/' component={MainContainer} />,
      <Route path='/last-week' component={MainContainer} filter='last_week'/>,
      <Route path='/last-month' component={MainContainer} filter='last_month'/>
    ]
  }

  static categoriesRoutes(categories) {
    return categories.map((category) => {
      return [
        <Route path={`/${category.slug}`} component={MainContainer} categorySlug={category.slug}/>,
        <Route path={`/${category.slug}/last-week`} component={MainContainer} filter='last_week' categorySlug={category.slug}/>,
        <Route path={`/${category.slug}/last-month`} component={MainContainer} filter='last_month' categorySlug={category.slug}/>
      ]
    }).reduce(function(a, b) { return a.concat(b) }, [])
  }

  static publishersRoutes(publishers) {
    return publishers.map((publisher) => {
      return [
        <Route path={`/${publisher.slug}`} component={MainContainer} publisherSlug={publisher.slug}/>,
        <Route path={`/${publisher.slug}/last-week`} component={MainContainer} filter='last_week' publisherSlug={publisher.slug}/>,
        <Route path={`/${publisher.slug}/last-month`} component={MainContainer} filter='last_month' publisherSlug={publisher.slug}/>
      ]
    }).reduce(function(a, b) { return a.concat(b) }, [])
  }
}

export default Routes
