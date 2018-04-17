
import { connect } from 'react-redux';
import { Login } from '../scenes/index'
import { LoginAction, navigate } from '../actions/index'
import { APIStatus } from '../core/IApi'
import User from '../model/user';
import { Navigator } from 'react-native-navigation'
import { bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';


let push , modal

function dispatcher(dispatch, status: APIStatus, response) {
    switch (status) {
        case 0:
            dispatch({ type: 'PROCESSING_LOGIN' })
            break;
        case 1:
            dispatch({ type: 'ERROR_LOGIN', error: response })
            break;
        case 2:
            dispatch({ type: 'TOKEN_RECEIVED', user: response })
            dispatch(push({
                screen: 'Manual',title: 'Manual', backButtonHidden: true, passProps: { user: response, navigateFrom: 'Login' }, navigatorStyle: {
                    navBarNoBorder: false
                }
            }))
            break;
        default:
    }
}

function mapDispatchToProps(dispatch, props) {
    let loginAction = new LoginAction()
    let requester = loginAction.requester()

    push = createAction('NAVIGATE_PUSH_TO',
        (updates) => updates,
        () => ({
            props: props
        })
    )

    modal = createAction('NAVIGATE_MODAL_TO',
        (updates) => updates,
        () => ({
            props: props
        })
    )

    return {
        submit: (username: string, password: string) => {
            dispatch({ type: 'NEW_USER', username: username })
            loginAction.setUser(username, password)
            requester(dispatch, dispatcher)
        },
        lock :() => {
            dispatch({ type: 'LOCK_APP'})
            dispatch({ type: 'NAVIGATE_MODAL_TO', meta :{ props : props },payload : {
                screen: 'KeyFob',title: 'KeyFob', backButtonHidden: true, passProps: { navigateFrom: 'Login' }, navigatorStyle: {
                    navBarNoBorder: false
                }}})
        },
    
    }
}

let mapStateToProps = state => {
    return {
        username: state.user.userName as string,
        password: state.user.password as string,
        token: state.user.token as string,
        inprogress: state.login.inprogress as boolean
    } as any
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);