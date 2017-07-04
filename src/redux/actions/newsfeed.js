import {FETCHING_INITIAL_POSTS, INITIAL_POSTS_SUCCESS, INITIAL_POSTS_FAILURE, INITIAL_POSTS_ABORTED, FETCHING_FOCUSED_POST, FOCUSED_POST_SUCCESS, FOCUSED_POST_ABORTED, FETCHING_RECENT_POSTS, RECENT_POSTS_SUCCESS, RECENT_POSTS_FAILURE, RECENT_POSTS_ABORTED} from '../constants';
import {AsyncStorage} from 'react-native';

export function getInitialPosts(data){
	return {
		type: FETCHING_INITIAL_POSTS,
		payload: data
	}
}

export function initialPostsSuccess(data){
	return {
		type: INITIAL_POSTS_SUCCESS,
		data
	}
}

export function initialPostsFailure(error){
	return {
		type: INITIAL_POSTS_FAILURE,
		error
	}
}

export function abortInitialPosts(){
	return {
		type: INITIAL_POSTS_ABORTED,
	}
}

export function updateFocusedPost(data){
	return {
		type: FETCHING_FOCUSED_POST,
		payload: data
	}
}

export function focusedPostSuccess(data){
	return {
		type: FOCUSED_POST_SUCCESS,
		data
	}
}

export function focusedPostFailure(error){
	return {
		type: FOCUSED_POST_FAILURE,
		error
	}
}

export function abortFocusedPost(){
	return {
		type: FOCUSED_POST_ABORTED
	}
}

export function getRecentPosts(data){
	return {
		type: FETCHING_RECENT_POSTS,
		payload: data
	}
}

export function recentPostsSuccess(data){
	return {
		type: RECENT_POSTS_SUCCESS,
		data
	}
}

export function recentPostsFailure(error){
	return {
		type: RECENT_POSTS_FAILURE,
		error
	}
}

export function abortRecentPosts(){
	return {
		type: RECENT_POSTS_ABORTED
	}
}
