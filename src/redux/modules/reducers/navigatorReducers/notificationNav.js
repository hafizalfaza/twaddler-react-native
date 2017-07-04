import { NavigationActions } from 'react-navigation';

import { NotificationNavigator } from '../../../../navigators/NotificationNavigator';

const initialNotificationNavState=NotificationNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Notification',
	  }),
	],
}))


function notificationNav(state = initialNotificationNavState, action) {
  let nextNotificationNavState;
  switch (action.type) {
    case 'PROFILE_ON_NOTIFICATION':
      nextNotificationNavState = NotificationNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ProfileOnNotification', params: {profileUsername: action.data} }),
        state
      );
      break;
	  
	 case 'COMMENTS_ON_NOTIFICATION':
		
      nextNotificationNavState = NotificationNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CommentsOnNotification', params: {postData: action.postData} }),
        state
      );
      break; 
	  
	 case 'NOTIFICATION_BACK':
		nextNotificationNavState = NotificationNavigator.router.getStateForAction(
			NavigationActions.back({key: action.key}),
			state
      );
	  break;
		
    default:
		
      nextNotificationNavState = NotificationNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextNotificationNavState || state;
}

export default notificationNav;