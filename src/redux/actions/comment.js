import {ADDING_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_ABORTED, CLEAR_FOCUSED_POST} from '../constants';
import {AsyncStorage} from 'react-native';

export function addComment(data){
	return {
		type: ADDING_COMMENT,
		payload: data
	}
}

export function addCommentSuccess(data){
	return {
		type: ADD_COMMENT_SUCCESS,
		data
	}
}

export function addCommentFailure(error){
	return {
		type: ADD_COMMENT_FAILURE,
		error
	}
}

export function abortComment(){
	return {
		type: ADD_COMMENT_ABORTED,
	}
}

export function clearFocusedPost(){
	return {
		type: CLEAR_FOCUSED_POST,
	}
}