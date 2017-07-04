import {FETCHING_NOTIFICATIONS, NOTIFICATIONS_SUCCESS, NOTIFICATIONS_FAILURE, NOTIFICATIONS_ABORTED} from '../constants';

export function getNotifications(data){
	return {
		type: FETCHING_NOTIFICATIONS,
		payload: data
	}
}

export function notificationsSuccess(data){
	return {
		type: NOTIFICATIONS_SUCCESS,
		data
	}
}

export function notificationsFailure(error){
	return {
		type: NOTIFICATIONS_FAILURE,
		error
	}
}

export function abortNotifications(){
	return {
		type: NOTIFICATIONS_ABORTED,
	}
}
