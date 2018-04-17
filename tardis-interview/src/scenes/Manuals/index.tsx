/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View, Text, FlatList
} from 'react-native';
import { Navigator } from 'react-native-navigation'
import { Manual } from '../../model/index'
import { FaceView } from '../../components/index';

type Props = { fetchList: any , navigate : Navigator, inprogress : boolean , list : Array<Manual>};

export default class Manuals extends Component<Props> {

  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f5Fcff' }}>
          <View style={{ paddingTop: 10, alignItems: 'center' }}>
                <FaceView style={{ width: 100, height: 100, borderWidth: 1, borderRadius: 50, overflow: 'hidden' }} />
          </View>

        <View style={{
          margin: 20, backgroundColor: '#333A79',
          borderWidth: 0, borderRadius: 10, paddingBottom: 10
        }}>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  }
});
