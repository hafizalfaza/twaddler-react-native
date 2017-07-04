import {FETCHING_PROFILE_DATA, PROFILE_SUCCESS, PROFILE_FAILURE, PROFILE_ABORTED, CLEAR_PROFILE_DATA} from '../constants';
import {AsyncStorage} from 'react-native';

export function getProfileData(data){
	return {
		type: FETCHING_PROFILE_DATA,
		payload: data
	}
}

export function profileSuccess(res, data){
	return {
		type: PROFILE_SUCCESS,
		res,
		routeName: data.routeName
	}
}

export function profileFailure(error){
	return {
		type: PROFILE_FAILURE,
		error
	}
}

export function abortProfile(){
	return {
		type: PROFILE_ABORTED,
	}
}

export function clearProfileData(data){
	return {
		type: CLEAR_PROFILE_DATA,
		data
	}
}
