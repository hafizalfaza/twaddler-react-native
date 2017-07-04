import {FETCHING_PROFILE_DATA, PROFILE_SUCCESS, PROFILE_FAILURE, PROFILE_ABORTED, CLEAR_PROFILE_DATA, LIKE_SUCCESS, FOLLOW_SUCCESS, POSTING_SUCCESS} from '../../constants';

const initialProfileState = { 
	profileNewsfeed: [],
	profileSearch: [],
	profileNotification: [],
	currentUserProfile: null,
	isFetchingProfile: false,
	error: null
	};

	
export default function profile(state=initialProfileState, action){
	switch(action.type){
		case FETCHING_PROFILE_DATA:	
			return {
				...state,
				isFetchingProfile: true,
			}
		
		case PROFILE_SUCCESS:
			if(action.routeName === 'MyProfile'){
				return {
					...state,
					isFetchingProfile: false,
					currentUserProfile: action.res
				}
			}else if(action.routeName === 'ProfileOnNewsfeed'){
				let newsArray = [...state.profileNewsfeed]
				newsArray.push(action.res);
				return {
					...state,
					isFetchingProfile: false,
					profileNewsfeed: newsArray
				}
			}else if(action.routeName === 'ProfileOnSearch'){
				let searchArray = [...state.profileSearch]
				searchArray.push(action.res);
				return {
					...state,
					isFetchingProfile: false,
					profileSearch: searchArray
				}
			}else if(action.routeName === 'ProfileOnNotification'){
				let notifArray = [...state.profileNotification]
				notifArray.push(action.res);
				return {
					...state,
					isFetchingProfile: false,
					profileNotification: notifArray
				}
			}else{
				return state;
			}				
		case PROFILE_FAILURE:
			return {
				...state,
				isFetchingProfile: false,
				error: action.error
			}
		case PROFILE_ABORTED:
			return {
				...state,
				isFetchingProfile: false,
			}
			
		case CLEAR_PROFILE_DATA:
			if(action.data === 'ProfileOnNewsfeed'){
				let proNewsArraySplice = [...state.profileNewsfeed]
				proNewsArraySplice.splice(-1,1)
				return {
					...state,
					profileNewsfeed: proNewsArraySplice
				}
			}else if(action.data === 'ProfileOnSearch'){
				let proSearchArraySplice = [...state.profileSearch]
				proSearchArraySplice.splice(-1,1)
				return {
					...state,
					profileSearch: proSearchArraySplice
				}
			}else if(action.data === 'ProfileOnNotification'){
				let proNotifArraySplice = [...state.profileNotification]
				proNotifArraySplice.splice(-1,1)
				return {
					...state,
					profileNotification: proNotifArraySplice
				}
			}else{
				return state;
			}
		case LIKE_SUCCESS:
			let newArrayForNewsfeed = [...state.profileNewsfeed];
			let newArrayForSearch = [...state.profileSearch];
			let newArrayForNotification = [...state.profileNotification];
			let newObjForCurrentUser = {...state.currentUserProfile};
			
			if(state.profileNewsfeed[0]){
				for(let j=0; j<state.profileNewsfeed.length; j++){
					if(state.profileNewsfeed[j].userInfo.username === action.data.postLiked.postedBy){
						let proNewsArray = [];
						for(let i=0; i<state.profileNewsfeed[j].posts.length; i++){
							if(state.profileNewsfeed[j].posts[i]._id.toString() === action.data.postLiked._id.toString()){
								proNewsArray.push(action.data.postLiked);
							}else{
								proNewsArray.push(state.profileNewsfeed[j].posts[i])
							}
						}
						newArrayForNewsfeed[j].posts=proNewsArray
					}
				}
					
			}

			if(state.profileSearch[0]){
				for(let j=0; j<state.profileSearch.length; j++){
					if(state.profileSearch[j].userInfo.username === action.data.postLiked.postedBy){
						let proSearchArray = [];
						for(let i=0; i<state.profileSearch[j].posts.length; i++){
							if(state.profileSearch[j].posts[i]._id.toString() === action.data.postLiked._id.toString()){
								proSearchArray.push(action.data.postLiked);
							}else{
								proSearchArray.push(state.profileSearch[j].posts[i])
							}
						}
						newArrayForSearch[j].posts=proSearchArray
					}
				}					
			}

			if(state.profileNotification[0]){
				for(let j=0; j<state.profileNotification.length; j++){
					if(state.profileNotification[j].userInfo.username === action.data.postLiked.postedBy){
						let proNotifArray = [];
						for(let i=0; i<state.profileNotification[j].posts.length; i++){
							if(state.profileNotification[j].posts[i]._id.toString() === action.data.postLiked._id.toString()){
								proNotifArray.push(action.data.postLiked);
							}else{
								proNotifArray.push(state.profileNotification[j].posts[i])
							}
						}
						newArrayForNotification[j].posts=proNotifArray
					}
				}					
				
			}
			
			if(state.currentUserProfile){
				
				if(Object.keys(state.currentUserProfile).length === 0){
					newObjForCurrentUser=null;
				}else{
					if(state.currentUserProfile.userInfo.username === action.data.postLiked.postedBy){
						let currentUserArray = []
						for(let i=0; i<state.currentUserProfile.posts.length; i++){
							if(state.currentUserProfile.posts[i]._id.toString() === action.data.postLiked._id.toString()){
								currentUserArray.push(action.data.postLiked);
							}else{
								currentUserArray.push(state.currentUserProfile.posts[i])
							}
						}
						newObjForCurrentUser.posts=currentUserArray			
					}	
					
				}		
			}	
			
			
			return {
				...state,
				profileNewsfeed: newArrayForNewsfeed,
				profileSearch: newArrayForSearch,
				profileNotification: newArrayForNotification,
				currentUserProfile: newObjForCurrentUser
			}
			
		case FOLLOW_SUCCESS:
			console.log(action.data);
			let followForNewsfeed = [...state.profileNewsfeed];
			let followForSearch = [...state.profileSearch];
			let followForNotification = [...state.profileNotification];
			
			
			console.log(followForNewsfeed);
			
			if(state.profileNewsfeed[0]){
				for(let j=0; j<state.profileNewsfeed.length; j++){
					if(state.profileNewsfeed[j].userInfo.username === action.data.userRequested[0].username){
						followForNewsfeed[j].userInfo = action.data.userRequested[0];
					}
				}
					
			}

			if(state.profileSearch[0]){
				for(let j=0; j<state.profileSearch.length; j++){
					if(state.profileSearch[j].userInfo.username === action.data.userRequested[0].username){
						followForSearch[j].userInfo = action.data.userRequested[0];
					}
				}
					
			}

			if(state.profileNotification[0]){
				for(let j=0; j<state.profileNotification.length; j++){
					if(state.profileNotification[j].userInfo.username === action.data.userRequested[0].username){
						followForNotification[j].userInfo = action.data.userRequested[0];
					}
				}
					
			}
			
			return {
				...state,
				profileNewsfeed: followForNewsfeed,
				profileSearch: followForSearch,
				profileNotification: followForNotification,			
			}
			
		default:
			return state;
	}
}	