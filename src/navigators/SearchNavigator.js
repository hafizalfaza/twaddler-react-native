import React from 'react';
import { Animated, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import SearchScreen from '../components/Main/Home/Search/SearchScreen';
import ProfileScreen from '../components/Main/Home/Profile/ProfileScreen';
import CommentsScreen from '../components/Main/Home/Comments/CommentsScreen';

const SearchStackConfig = {
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0,
  		timing: Animated.timing,
  		easing: Easing.step0,
  	},
  }),
}

export const SearchNavigator = StackNavigator({
  Search: { screen: SearchScreen},
  ProfileOnSearch: { screen: ProfileScreen },
  CommentsOnSearch: { screen: CommentsScreen }
}, SearchStackConfig);

const SearchStack = ({ dispatch, searchNav }) => (
  <SearchNavigator navigation={addNavigationHelpers({ dispatch, state: searchNav })} />
);

SearchStack.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchNav: state.searchNav,
});

export default connect(mapStateToProps)(SearchStack);