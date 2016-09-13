import { ActionConst } from 'react-native-router-flux'

let defaultState = {
  scene: {}
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return { ...state, scene: action.scene }
    default:
      return state
  }
}
