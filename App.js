import React from 'react';
import {View} from 'react-native';
import Navigation from './src/Navigation/NavigationStack';
import {Provider} from 'react-redux';
import {store} from './src/Store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
