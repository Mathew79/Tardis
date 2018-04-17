import { combineReducers } from 'redux';
import { user , login} from './Login'
import { manuals } from './Manuals'
import { navigate } from './Route'
import { app } from './App'

const AppReducer = combineReducers({
    user,
    login,
    manuals,
    navigate,
    app 
})

export default AppReducer;