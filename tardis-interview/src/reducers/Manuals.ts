
import { Manual } from '../model/index'

export function manuals(state = {inprogress : false}, action) {
  switch (action.type) {
    case 'MANUAL_FETCH_IN_PROGRESS':
      return { ...state, inprogress: true};
    case 'TOKEN_RECEIVED':
      return { ...state, token: action.user.token, isLogged : action.user.isLogged };
    case 'ERROR':
    return { ...state, token: null , isLogged : false};
    default:
      return state
  }
}