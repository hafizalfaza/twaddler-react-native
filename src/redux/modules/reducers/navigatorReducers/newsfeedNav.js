import { NavigationActions } from 'react-navigation';

import { NewsfeedNavigator } from '../../../../navigators/NewsfeedNavigator';

const initialNewsfeedNavState=NewsfeedNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Newsfeed',
	  }),
	],
}))


function newsfeedNav(state = initialNewsfeedNavState, action) {
  let nextNewsfeedNavState;
  switch (action.type) {
    case 'PROFILE_ON_NEWSFEED':
		
      nextNewsfeedNavState = NewsfeedNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ProfileOnNewsfeed', params: {profileUsername: action.data} }),
        state
      );
      break;
	  
	 case 'COMMENTS_ON_NEWSFEED':
		
      nextNewsfeedNavState = NewsfeedNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CommentsOnNewsfeed', params: {postData: action.postData} }),
        state
      );
      break;
	 
	case 'NEWSFEED_BACK':
		nextNewsfeedNavState = NewsfeedNavigator.router.getStateForAction(
			NavigationActions.back({key: action.key}),
			state
      );
      break;
		
    default:
		
      nextNewsfeedNavState = NewsfeedNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextNewsfeedNavState || state;
}

export default newsfeedNav;