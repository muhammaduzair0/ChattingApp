import React from 'react';
import {View} from 'react-native';
import Navigation from './src/Navigation/NavigationStack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store,peristStore} from './src/Store/index'
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={peristStore}>
        <View style={{flex: 1}}>
          <Navigation />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
