import {AUTHENTICATING_USER, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, AUTHENTICATION_ABORTED, SET_CURRENT_USER} from '../constants';
import {AsyncStorage} from 'react-native';

export function logIn(data){
	return {
		type: AUTHENTICATING_USER,
		payload: data
	}
}

export function loginSuccess(data){
	AsyncStorage.setItem('access_token', data.token);
	AsyncStorage.multiSet([['user_data', JSON.stringify(data.user)]]);
	return {
		type: AUTHENTICATION_SUCCESS,
		data
	}
}

export function loginFailure(error){
	return {
		type: AUTHENTICATION_FAILURE,
		error
	}
}

export function abortLogin(){
	return {
		type: AUTHENTICATION_ABORTED,
	}
}


export function setCurrentUser(data) {
	return {
		type: SET_CURRENT_USER,
		data
	}
}