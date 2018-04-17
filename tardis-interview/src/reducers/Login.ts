

import { User } from '../model/index'

export function user(state: User = new User(), action) {
  switch (action.type) {
    case 'NEW_USER':
      return { ...state, name: action.username , isLogged : false};
    case 'TOKEN_RECEIVED':
      return { ...state, token: action.user.token, isLogged : action.user.isLogged };
    case 'ERROR_LOGIN':
    return { ...state, token: null , isLogged : false};
    default:
      return state
  }
}

export function login(state = {inprogress : false}, action){
  switch (action.type) {
    case 'NEW_USER':
      return { ...state, inprogress: true};
    case 'ERROR_LOGIN':
    return { ...state, inprogress: false };
    case 'TOKEN_RECEIVED':
    return { ...state, inprogress: false };
    default:
      return state
  }
}
