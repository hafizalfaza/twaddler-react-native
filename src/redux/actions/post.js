import {POSTING_CONTENT, POSTING_SUCCESS, POSTING_FAILURE, POSTING_ABORTED} from '../constants';
import {AsyncStorage} from 'react-native';

export function postContent(data){
	return {
		type: POSTING_CONTENT,
		payload: data
	}
}

export function postingSuccess(data){
	return {
		type: POSTING_SUCCESS,
		data
	}
}

export function postingFailure(error){
	return {
		type: POSTING_FAILURE,
		error
	}
}

export function abortPosting(){
	return {
		type: POSTING_ABORTED,
	}
}