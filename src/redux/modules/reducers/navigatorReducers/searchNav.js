import { NavigationActions } from 'react-navigation';

import { SearchNavigator } from '../../../../navigators/SearchNavigator';

const initialSearchNavState=SearchNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Search',
	  }),
	],
}))


function searchNav(state = initialSearchNavState, action) {
  let nextSearchNavState;
  switch (action.type) {
    case 'PROFILE_ON_SEARCH':
      nextSearchNavState = SearchNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ProfileOnSearch', params: {profileUsername: action.data} }),
        state
      );
      break;
	  
	  case 'COMMENTS_ON_SEARCH':
		
      nextSearchNavState = SearchNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CommentsOnSearch', params: {postData: action.postData} }),
        state
      );
      break; 
	  
	 case 'SEARCH_BACK':
		nextSearchNavState = SearchNavigator.router.getStateForAction(
			NavigationActions.back({key: action.key}),
			state
      );
	  
	 break;
		
    default:
		
      nextSearchNavState = SearchNavigator.router.getStateForAction(action, state);
      break;

  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextSearchNavState || state;
}

export default searchNav;