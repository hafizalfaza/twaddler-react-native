import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import auth from './reducers/auth';
import newsfeed from './reducers/newsfeed';
import search from './reducers/search';
import notification from './reducers/notification';
import profile from './reducers/profile';
import tabBar from './reducers/tabBar';

import {loginEpic, fetchPostsEpic, recentPostsEpic, searchEpic, notificationEpic, profileEpic, likeEpic, updateFocusedEpic, addCommentEpic, followEpic, postContentEpic} from '../epic/epic';

import mainNav from './reducers/navigatorReducers/mainNav';
import newsfeedNav from './reducers/navigatorReducers/newsfeedNav';
import searchNav from './reducers/navigatorReducers/searchNav';
import notificationNav from './reducers/navigatorReducers/notificationNav';
import myProfileNav from './reducers/navigatorReducers/myProfileNav';

export const rootEpic = combineEpics(
  loginEpic,
  fetchPostsEpic,
  searchEpic,
  notificationEpic,
  profileEpic,
  likeEpic,
  updateFocusedEpic,
  addCommentEpic,
  recentPostsEpic,
  followEpic,
  postContentEpic
);

const appReducer = combineReducers({
  mainNav,
  newsfeedNav,
  searchNav,
  notificationNav,
  myProfileNav,  
  auth,
  newsfeed,
  search,
  notification,
  profile,
  tabBar
});

// Root reducer set for resetable store
export const rootReducer = (state, action) => {
  if (action.type === 'RESET_REDUX_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};