import React from 'react';
import { Animated, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import MainScreen from '../components/Main/MainScreen';

const StackNavigatorConfig = {
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
}

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen, navigationOptions: { header: null }},
}, StackNavigatorConfig);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.mainNav,
});

export default connect(mapStateToProps)(AppWithNavigationState);