import {
		AUTHENTICATING_USER,
		AUTHENTICATION_ABORTED, 
		FETCHING_INITIAL_POSTS, 
		INITIAL_POSTS_ABORTED,
		FETCHING_SEARCH_RESULT,
		SEARCH_ABORTED,
		FETCHING_NOTIFICATIONS,
		NOTIFICATIONS_ABORTED,
		FETCHING_PROFILE_DATA,
		PROFILE_ABORTED,
		PROCESSING_LIKE,
		LIKE_ABORTED,
		LIKE_SUCCESS,
		FETCHING_FOCUSED_POST,
		FOCUSED_POST_ABORTED,
		ADDING_COMMENT,
		ADD_COMMENT_ABORTED,
		FETCHING_RECENT_POSTS,
		RECENT_POSTS_ABORTED,
		PROCESSING_FOLLOW,
		FOLLOW_ABORTED,
		POSTING_CONTENT,
		POSTING_ABORTED} from '../constants';
import {loginSuccess, loginFailure} from '../actions/auth';
import {initialPostsSuccess, initialPostsFailure, getRecentPosts, recentPostsSuccess, recentPostsFailure, updateFocusedPost, focusedPostSuccess, focusedPostFailure} from '../actions/newsfeed';
import {searchSuccess, searchFailure} from '../actions/search';
import {notificationsSuccess, notificationsFailure} from '../actions/notification';
import {profileSuccess, profileFailure} from '../actions/profile';
import {likeSuccess, likeFailure} from '../actions/like';
import {addCommentSuccess, addCommentFailure} from '../actions/comment';
import {followSuccess, followFailure} from '../actions/follow';
import {postingSuccess, postingFailure} from '../actions/post';
import Api from '../../lib/api';

import 'rxjs';
import {Observable} from 'rxjs/Observable';

export const loginEpic = action$ => 
	action$.ofType(AUTHENTICATING_USER)
		.mergeMap(action => 
			Observable.fromPromise(Api.post(`/api/auth/`, action.payload))
				.map(res => loginSuccess(res))
				.takeUntil(action$.ofType(AUTHENTICATION_ABORTED))
				.catch(error => Observable.of(loginFailure(error)))
		)
		
export const fetchPostsEpic = action$ => 
	action$.ofType(FETCHING_INITIAL_POSTS)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/api/users/timeline/initial/${action.payload}`))
				.map(res => initialPostsSuccess(res))
				.takeUntil(action$.ofType(INITIAL_POSTS_ABORTED))
				.catch(error => Observable.of(initialPostsFailure(error)))
		)
		
export const recentPostsEpic = action$ => 
	action$.ofType(FETCHING_RECENT_POSTS)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/api/users/timeline/recent/${action.payload.token}/latestPost?date=${action.payload.latestPost}`))
				.map(res => recentPostsSuccess(res))
				.takeUntil(action$.ofType(RECENT_POSTS_ABORTED))
				.catch(error => Observable.of(recentPostsFailure(error)))
		)
		
export const searchEpic = action$ => 
	action$.ofType(FETCHING_SEARCH_RESULT)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/search/str/${action.payload}`))
				.map(res => searchSuccess(res))
				.takeUntil(action$.ofType(SEARCH_ABORTED))
				.catch(error => Observable.of(searchFailure(error)))
		)
		
export const notificationEpic = action$ => 
	action$.ofType(FETCHING_NOTIFICATIONS)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/api/users/notifications/${action.payload}`))
				.map(res => notificationsSuccess(res))
				.takeUntil(action$.ofType(NOTIFICATIONS_ABORTED))
				.catch(error => Observable.of(notificationsFailure(error)))
		)
		
export const profileEpic = action$ => 
	action$.ofType(FETCHING_PROFILE_DATA)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/api/users/profile/${action.payload.username}/${action.payload.token}`))
				.map(res => profileSuccess(res, action.payload))
				.takeUntil(action$.ofType(PROFILE_ABORTED))
				.catch(error => Observable.of(profileFailure(error)))
		)
		
export const likeEpic = action$ => 
	action$.ofType(PROCESSING_LIKE)
		.mergeMap(action => 
			Observable.fromPromise(Api.post(`/api/users/timeline/likes`, action.payload))
					.map((res) => likeSuccess(res, action.payload))
					.takeUntil(action$.ofType(LIKE_ABORTED))
					.catch(error => Observable.of(likeFailure(error)))
					)
					
export const followEpic = action$ => 
	action$.ofType(PROCESSING_FOLLOW)
		.mergeMap(action => 
			Observable.fromPromise(Api.post(`/api/users/follow`, action.payload))
					.map((res) => followSuccess(res))
					.takeUntil(action$.ofType(FOLLOW_ABORTED))
					.catch(error => Observable.of(followFailure(error)))
					)
					
export const updateFocusedEpic = action$ => 
	action$.ofType(FETCHING_FOCUSED_POST)
		.mergeMap(action => 
			Observable.fromPromise(Api.get(`/api/users/post/update-focused/${action.payload.postId}/${action.payload.token}`))
				.map(res => focusedPostSuccess(res))
				.takeUntil(action$.ofType(FOCUSED_POST_ABORTED))
				.catch(error => Observable.of(focusedPostFailure(error)))
		)
		
export const addCommentEpic = action$ => 
	action$.ofType(ADDING_COMMENT)
		.mergeMap(action => 
			Observable.fromPromise(Api.post(`/api/users/post/comment`, action.payload.commentData))
					.map((res) => addCommentSuccess(res))
					.takeUntil(action$.ofType(ADD_COMMENT_ABORTED))
					.catch(error => Observable.of(addCommentFailure(error)))
					)
					
export const postContentEpic = action$ => 
	action$.ofType(POSTING_CONTENT)
		.mergeMap(action => 
			Observable.fromPromise(Api.post(`/api/users/post`, action.payload))
					.flatMap((res) => Observable.of(postingSuccess(res), getRecentPosts(action.payload)))
					.takeUntil(action$.ofType(POSTING_ABORTED))
					.catch(error => Observable.of(postingFailure(error)))
					)