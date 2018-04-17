
import APIClient from '../core/APIClient'
import { Manual } from '../model/index'
import { Method , IRequester} from '../core/IApi'
import BaseRequest  from '../core/BaseRequest'

export type ReguestType = "LIST" | "IMAGE"

class ManualAction extends BaseRequest<Array<Manual>> {

    private _api: APIClient<Array<Manual>>
    private _manual: Array<Manual>

    constructor() {
        super()
        this._api = new APIClient<Array<Manual>>()
        this._manual = new Array<Manual>()
    }

    method(): Method {
        return "GET"
    }

    parameters(): string{
        if (this.requestType === "LIST"){  
        return ''
        }
        else{
           return 
        }
    }

    path(): string {
        if (this.requestType === "LIST"){
            return '/manaul/index.json'
        }
        else{
            return '/manual'
        }
    }

    header(): {} {
        return {}
    }

    parser(response): Array<Manual> {
        let manual = new Array<Manual>()
       
        return manual
    }

    requester(): IRequester<Array<Manual>> {
        return this._api.requester(this, this.parser)
    }

    requestType : ReguestType = "LIST"

}

export default ManualAction