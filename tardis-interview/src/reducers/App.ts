
export function app(state = {isLocked : false}, action) {
  switch (action.type) {
    case 'LOCK_APP':
      return { ...state, isLocked: true};
    case 'UNLOCK_APP':
      return { ...state,  isLocked : false };
    default:
      return state
  }
}

