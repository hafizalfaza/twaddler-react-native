import {PROCESSING_LIKE, LIKE_SUCCESS, LIKE_FAILURE, LIKE_ABORTED} from '../constants';
import {AsyncStorage} from 'react-native';

export function onLikePressed(data){
	return {
		type: PROCESSING_LIKE,
		payload: data
	}
}

export function likeSuccess(resData, reqData){
	const data = {...resData, routeName: reqData.routeName}
	return {
		type: LIKE_SUCCESS,
		data
	}
}

export function likeFailure(error){
	return {
		type: LIKE_FAILURE,
		error
	}
}

export function abortLike(){
	return {
		type: LIKE_ABORTED,
	}
}