console.ignoredYellowBox = ['Remote debugger'];

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'rxjs';
import configureStore from './src/redux/configureStore';

import AppWithNavigationState from './src/navigators/AppNavigator';


const store = configureStore();

const TwaddlerApp = () => (
	<Provider store={store}>
		<AppWithNavigationState />
	</Provider>
);


AppRegistry.registerComponent('Twaddler', () => TwaddlerApp);