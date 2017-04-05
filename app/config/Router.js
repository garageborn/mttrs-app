import Timeline from '../scenes/Timeline'
import Link from '../scenes/Link'
import { createRouter } from '@exponent/ex-navigation'

const routes = {
  timeline: () => Timeline,
  link: () => Link
}

const Router = createRouter(() => routes)

export default Router
