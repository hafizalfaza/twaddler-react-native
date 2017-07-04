import {FETCHING_SEARCH_RESULT, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_ABORTED} from '../constants';
import {AsyncStorage} from 'react-native';

export function search(data){
	return {
		type: FETCHING_SEARCH_RESULT,
		payload: data
	}
}

export function searchSuccess(data){
	return {
		type: SEARCH_SUCCESS,
		data
	}
}

export function searchFailure(error){
	return {
		type: SEARCH_FAILURE,
		error
	}
}

export function abortSearch(){
	return {
		type: SEARCH_ABORTED,
	}
}