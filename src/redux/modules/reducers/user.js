const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
const FETCH_USER_ABORTED = 'FETCH_USER_ABORTED';

const initialAuthState = { 
	currentUser: {},
	isAuthenticating: false,
	isLoggedIn: false,
	error: null,
	};

	
export default function user(state=initialAuthState, action){
	switch(action.type){
		case FETCH_USER_PENDING: 
			return {
				...state,
				isAuthenticating: true,
				currentUser: {}
			}
		
		case FETCH_USER_FULFILLED:
			return {
				...state,
				isAuthenticating: false,
				isLoggedIn: true,
				currentUser: {
					token: action.data.token,
					userData: action.data.user
				}
			}
		case FETCH_USER_ABORTED:
			return {
				currentUser: {},
				isAuthenticating: false,
				isLoggedIn: false,
			}
			
		default:
			return state;
	}
}	