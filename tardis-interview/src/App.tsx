import React from 'react';
import { Platform, StyleSheet, Text,View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Navigation  } from 'react-native-navigation';

import { Login , KeyFob , Manual} from './viewModel/index'

import AppReducer from './reducers/index';


export var store = createStore(AppReducer, {}, applyMiddleware(thunk));

Navigation.registerComponent('Login', () => Login, store, Provider);
Navigation.registerComponent('KeyFob', () => KeyFob, store, Provider);
Navigation.registerComponent('Manual', () => Manual, store, Provider);



export default class App extends React.Component {

  constructor(props){
    super(props);
    Navigation.startSingleScreenApp({
			screen: {
        screen: 'Login',
        title: 'Login',
        navigatorStyle :{
          navBarNoBorder :true,
          navBarBackgroundColor:  '#F2F2F2',
        },
      }
		});
  }

}



