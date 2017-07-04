import { NavigationActions } from 'react-navigation';

import { MyProfileNavigator } from '../../../../navigators/MyProfileNavigator';

const initialMyProfileNavState=MyProfileNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'MyProfile',
	  }),
	],
}))


function myProfileNav(state = initialMyProfileNavState, action) {
  let nextState;
  switch (action.type) {
    case 'PROFILE':
      nextState = MyProfileNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profile' }),
        state
      );
      break;
	 case 'LOGOUT':
      nextState = MyProfileNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
    default:
      nextState = MyProfileNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default myProfileNav;