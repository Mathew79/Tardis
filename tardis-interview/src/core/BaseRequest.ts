
import { IRequester , Method } from '../core/IApi'

abstract class BaseRequest<T>{

    //Returns Requester funtions, which enacapsulate the request object to make a network call.
    abstract requester() : IRequester<T>

    //Property - request's method (GET / POST)
    abstract  method() : Method

    //Returns the additionals param / body as key value pair or string
    abstract parameters() : {} | string

    //Returns path component.(must start with '/')
    abstract path() : string

    //Returns the associated Headers object of the request.
    abstract header(): {}

    //Parse the response to associated model.
    abstract parser(response) : T

    //Returns the URL of the request.
    baseUrl() : string{
        return 'http://localhost:3000';
    }
}

export default BaseRequest