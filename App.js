/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/AppNavigation'
import {Provider} from 'react-redux'
import Store from './src/Redux/Store'

export default class App extends Component {
  render() {
    return (
      <Provider store = { Store }>
        <AppNavigator />
      </Provider>
    );
  }
}


