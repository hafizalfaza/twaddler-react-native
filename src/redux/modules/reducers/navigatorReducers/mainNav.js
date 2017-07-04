import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../../../../navigators/AppNavigator';

const initialNavState=AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Main',
	  }),
	],
}))


function mainNav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'COMMENTS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Comments', params: {postData: action.data.postData, routeSource: action.data.routeSource} }),
        state
      );
      break;
	
	case 'MAIN_BACK':
		nextState = AppNavigator.router.getStateForAction(
			NavigationActions.back({key: action.key}),
			state
      );
      break;
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default mainNav;