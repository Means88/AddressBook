import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  Navigator,
} from 'react-native';
import IndexPage from './pages/IndexPage';

class App extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{ component: IndexPage }}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.props} />;
        }}
      />
    );
  }
}

export default App;

