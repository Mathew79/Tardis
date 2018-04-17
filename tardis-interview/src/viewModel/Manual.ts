
import { connect } from 'react-redux';
import { Manuals } from "../scenes/index";
import { APIStatus } from '../core/IApi'
import { ManualAction } from '../actions/index'

import User from '../model/user';
import { Navigator } from 'react-native-navigation'

function dispatcher(dispatch, status : APIStatus, response ) {
    switch (status) {
        case 0:
            dispatch({ type: 'MANUAL_FETCH_IN_PROGRESS' })
            break;
        case 1:
            dispatch({ type: 'ERROR_MANUAL', error: response })
            break;
        case 2:
            dispatch({ type: 'MANUAL_RECEIVED', user: response })
            break;
        default:
    }
}

function mapDispatchToProps(dispatch) {
    let manualAction = new ManualAction()
    let requester = manualAction.requester()

    return {
       fetchList: () => {
        manualAction.requestType = "LIST"
           requester(dispatch,dispatcher)
        },
        navigate : (state : any, navigator : Navigator) => {
           
        }
    }
}

let mapStateToProps = state => {
    return {
       inprogress:state.manuals.inprogress as boolean,
        list: state.manuals.list,
    } as any
}

export default connect(mapStateToProps, mapDispatchToProps)(Manuals);