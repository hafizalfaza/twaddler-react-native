import {FETCHING_NOTIFICATIONS, NOTIFICATIONS_SUCCESS, NOTIFICATIONS_FAILURE, NOTIFICATIONS_ABORTED} from '../../constants';

const initialNotifiationsState = { 
	notificationsData: null,
	isFetchingNotifications: false,
	error: null
	};

	
export default function notification(state=initialNotifiationsState, action){
	switch(action.type){
		case FETCHING_NOTIFICATIONS: 
			return {
				...state,
				isFetchingNotifications: true,
			}
		
		case NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isFetchingNotifications: false,
				notificationsData: action.data.notifications.notifications,
			}
		case NOTIFICATIONS_FAILURE:
			return {
				...state,
				isFetchingNotifications: false,
				error: action.error
			}
		case NOTIFICATIONS_ABORTED:
			return {
				...state,
				isFetchingNotifications: false,
			}
			
		default:
			return state;
	}
}	