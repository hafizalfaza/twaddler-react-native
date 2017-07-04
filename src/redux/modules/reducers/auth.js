import {AUTHENTICATING_USER, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, AUTHENTICATION_ABORTED, SET_CURRENT_USER} from '../../constants';

const initialAuthState = { 
	currentUser: {},
	isAuthenticating: false,
	isLoggedIn: false,
	error: null,
	};

	
export default function auth(state=initialAuthState, action){
	switch(action.type){
		case AUTHENTICATING_USER: 
			return {
				...state,
				isAuthenticating: true,
				currentUser: {}
			}
		
		case AUTHENTICATION_SUCCESS:
			return {
				...state,
				isAuthenticating: false,
				isLoggedIn: true,
				currentUser: {
					token: action.data.token,
					userData: action.data.user
				}
			}
		case AUTHENTICATION_FAILURE:
			return {
				isAuthenticating: false,
				isLoggedIn: false,
				error: action.error
			}
		case AUTHENTICATION_ABORTED:
			return {
				currentUser: {},
				isAuthenticating: false,
				isLoggedIn: false,
			}
			
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticating: false,
				isLoggedIn: true,
				currentUser: {
					token: action.data.token,
					userData: action.data.user
				}
			}
			
		default:
			return state;
	}
}	