

import { IApiClient, IRequester, APIStatus } from './IApi'
import BaseRequest from './BaseRequest'

class APIClient<T> implements IApiClient<T> {

  private encodeQueryData(data: {}): string {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  public requester(request: BaseRequest<T>, parser: (response: any) => T): IRequester<T> {
    return (dispatch, dispatcher) => {

      dispatcher(dispatch, APIStatus.PROCESSING, null)

      let init: any = {
        method: request.method(),
        headers: request.header(),
        cache: 'default'
      };

      let url: string = request.baseUrl() + request.path()

      let param = request.parameters()

      if (request.method() === "POST") {
        if (typeof param === 'string') {
          init.body = param
        }
        else {
          init.body = JSON.stringify(request.parameters())
        }
      }
      else {
        if (typeof param === 'string') {
          url = url + '?' + param
        }
        else {
          url = url + '?' + this.encodeQueryData(request.parameters())
        }
      }

      const myRequest = new Request(url, init);
      fetch(myRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => {
          var resType = response.headers.get("content-type")
          if (resType.includes("json")) {
            return response.json()
          }
          else {
           return response.text()
          }
        })
        .then((response) => {
          let data = parser(response);
          dispatcher(dispatch, APIStatus.SUCCESS, data)
        })
        .catch((error) => {
          dispatcher(dispatch, APIStatus.ERROR, error)
        });
    };
  }
}

export default APIClient



