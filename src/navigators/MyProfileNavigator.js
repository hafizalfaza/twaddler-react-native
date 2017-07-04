import React from 'react';
import { Animated, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import ProfileScreen from '../components/Main/Home/Profile/ProfileScreen';

const MyProfileStackConfig = {
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
}

export const MyProfileNavigator = StackNavigator({
  MyProfile: { screen: ProfileScreen },
  ProfileOnMyProfile: { screen: ProfileScreen },
}, MyProfileStackConfig);

const MyProfileStack = ({ dispatch, myProfileNav }) => (
  <MyProfileNavigator navigation={addNavigationHelpers({ dispatch, state: myProfileNav })} />
);

MyProfileStack.propTypes = {
  dispatch: PropTypes.func.isRequired,
  myProfileNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  myProfileNav: state.myProfileNav,
});

export default connect(mapStateToProps)(MyProfileStack);