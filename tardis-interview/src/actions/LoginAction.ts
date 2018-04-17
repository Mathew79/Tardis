
import APIClient from '../core/APIClient'
import { User } from '../model/index'
import { Method , IRequester} from '../core/IApi'
import BaseRequest  from '../core/BaseRequest'

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import CryptoJS from 'crypto-js'


class LoginAction extends BaseRequest<User> {
    
    private _api: APIClient<User>
    private _user: User

    constructor() {
        super()
        this._api = new APIClient<User>()
        this._user = new User()
    }

    setUser(name: string, password: string) {
        this._user.name = name
        this._user.password = password
    }

    method(): Method {
        return "POST"
    }

    parameters(): string{
        let header = {typ: 'JWT',alg: 'HS256'}
        let headerWordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        let encodedHeader = this.base64url(headerWordArray);

        let payload = {username: this._user.name ,password: this._user.password,client_id: this._user.clientId}
        let payloadWordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
        let encodedPayload = this.base64url(payloadWordArray);
     
        let token = encodedHeader + '.' + encodedPayload

        let signature = CryptoJS.HmacSHA256(token,'client_secret')
       
        return token + '.' + this.base64url(signature)
    }

    path(): string {
        return '/login'
    }

    header(): {} {
        return {}
    }

    parser(response): User {
        let user = new User()
        user.token = response
        user.isLogged = true
        return user
    }

    requester(): IRequester<User> {
        return this._api.requester(this, this.parser)
    }


     base64url(source) {
        // Encode in classical base64
      let  encodedSource = CryptoJS.enc.Base64.stringify(source);
      
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
      
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
      
        return encodedSource;
      }

}

export default LoginAction