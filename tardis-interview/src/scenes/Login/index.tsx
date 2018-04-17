/**
 * @flow
 */


import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, AppState } from 'react-native';
import { store } from '../../App'
import User from '../../model/user'
import { Navigator } from 'react-native-navigation'
import { Loader } from '../../components/index';

type Props = { submit: any, navigate: any,lock : any, navigator: Navigator, inprogress: boolean };
type State = { username: string, password: string, token: string, appState: string }

export default class Login extends Component<Props, State> {

  unsubscribe: any

  constructor(props: Props) {
    super(props);
    this.state = { username: '', password: '', token: null, appState: AppState.currentState };

  }

  componentDidMount() {
    const navigator = this.props.navigator;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.unsubscribe = store.subscribe(() => {
      let currentState: any = store.getState()
      if (currentState.user.isLogged && currentState.app.isLocked) {
          
      }
    })
  }


  componentWillUnmount() {
    this.unsubscribe();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      let currentState: any = store.getState()
      if (currentState.user.isLogged && currentState.app.isLocked === false) {
        this.props.lock()
      }
      
    }
    this.setState({ appState: nextAppState });
  }

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.image} source={require('../../../resources/Login/tardis.png')} />
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            autoCorrect={false}
            placeholder={'username'}
            onChangeText={(text) => { this.setState((previous) => ({ ...previous, username: text })) }}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            secureTextEntry={true}
            placeholder={'password'}
            onChangeText={(text) => { this.setState((previous) => ({ ...previous, password: text })) }}
          />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => { this.props.submit(this.state.username, this.state.password) }}
            disabled={this.state.username == '' || this.state.password == ''}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>

        <Loader loading={this.props.inprogress} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: "contain",
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
});



