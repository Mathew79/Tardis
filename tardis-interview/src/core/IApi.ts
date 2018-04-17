

import BaseRequest from './BaseRequest'
 

export enum APIStatus {
    PROCESSING = 0,
    ERROR = 1,
    SUCCESS = 2
  }

  export type Method = "GET" | "POST";

  export interface IApiClient<T> { 
  requester(request: BaseRequest<T>, parser: (response: any) => T): IRequester<T>;
}

export interface IRequester<T>{
  (dispatch,dispatcher : IDispatcher<T>) : any;
}

export interface IDispatcher<T>{
  (dispatch, status : APIStatus, response : T) : void;
}

