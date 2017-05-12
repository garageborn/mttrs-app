import Timeline from '../scenes/Timeline'
import Link from '../scenes/Link'
import { StackNavigator } from 'react-navigation'

export const routes = {
  timeline: { screen: Timeline, params: { name: 'home' } },
  link: { screen: Link }
}

const Router = StackNavigator(routes, { headerMode: 'none' })

export default Router
