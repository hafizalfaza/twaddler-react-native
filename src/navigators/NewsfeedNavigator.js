import React from 'react';
import { Animated, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import NewsfeedScreen from '../components/Main/Home/Newsfeed/NewsfeedScreen';
import ProfileScreen from '../components/Main/Home/Profile/ProfileScreen';
import CommentsScreen from '../components/Main/Home/Comments/CommentsScreen';

const NewsfeedStackConfig = {
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
}

export const NewsfeedNavigator = StackNavigator({
  Newsfeed: { screen: NewsfeedScreen, },
  ProfileOnNewsfeed: { screen: ProfileScreen },
  CommentsOnNewsfeed: { screen: CommentsScreen }
}, NewsfeedStackConfig);

const NewsfeedStack = ({ dispatch, newsfeedNav }) => (
  <NewsfeedNavigator navigation={addNavigationHelpers({ dispatch, state: newsfeedNav })} />
);

NewsfeedStack.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newsfeedNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  newsfeedNav: state.newsfeedNav,
});

export default connect(mapStateToProps)(NewsfeedStack);