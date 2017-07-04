import React from 'react';
import { Animated, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import NotificationScreen from '../components/Main/Home/Notification/NotificationScreen';
import ProfileScreen from '../components/Main/Home/Profile/ProfileScreen';
import CommentsScreen from '../components/Main/Home/Comments/CommentsScreen';

const NotificationStackConfig = {
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
}

export const NotificationNavigator = StackNavigator({
  Notification: { screen: NotificationScreen},
  ProfileOnNotification: { screen: ProfileScreen },
  CommentsOnNotification: { screen: CommentsScreen }
}, NotificationStackConfig);

const NotificationStack = ({ dispatch, notificationNav }) => (
  <NotificationNavigator navigation={addNavigationHelpers({ dispatch, state: notificationNav })} />
);

NotificationStack.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notificationNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  notificationNav: state.notificationNav,
});

export default connect(mapStateToProps)(NotificationStack);