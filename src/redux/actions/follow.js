import {PROCESSING_FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE, FOLLOW_ABORTED} from '../constants';
import {AsyncStorage} from 'react-native';

export function onFollowPressed(data){
	return {
		type: PROCESSING_FOLLOW,
		payload: data
	}
}

export function followSuccess(data){
	return {
		type: FOLLOW_SUCCESS,
		data
	}
}

export function followFailure(error){
	return {
		type: FOLLOW_FAILURE,
		error
	}
}

export function abortFollow(){
	return {
		type: FOLLOW_ABORTED,
	}
}