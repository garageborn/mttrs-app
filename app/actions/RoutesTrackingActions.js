import { TRACK_ROUTE } from '../constants/ActionTypes'

export const track = (route) => ({
  type: TRACK_ROUTE,
  route
})
