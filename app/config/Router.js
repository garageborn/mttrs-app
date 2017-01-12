import Timeline from '../scenes/Timeline'
import Link from '../scenes/Link'
import { createRouter } from '@exponent/ex-navigation'

const Routes = {
  timeline: () => Timeline,
  link: () => Link
}

const Router = createRouter(() => Routes)

export default Router
