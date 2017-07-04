import {FETCHING_INITIAL_POSTS, INITIAL_POSTS_SUCCESS, INITIAL_POSTS_FAILURE, INITIAL_POSTS_ABORTED, FETCHING_RECENT_POSTS, RECENT_POSTS_SUCCESS, RECENT_POSTS_FAILURE, RECENT_POSTS_ABORTED, FETCHING_FOCUSED_POST, FOCUSED_POST_SUCCESS, LIKE_SUCCESS, ADD_COMMENT_SUCCESS, CLEAR_FOCUSED_POST} from '../../constants';

const initialNewsfeedState = { 
	posts: null,
	isFetchingPosts: false,
	isFetchingRecentPosts: false,
	isUpdatingFocusedPost: false,
	focusedPost: [],
	error: null
	};

	
export default function newsfeed(state=initialNewsfeedState, action){
	switch(action.type){
		case FETCHING_INITIAL_POSTS: 
			return {
				...state,
				isFetchingPosts: true,
			}
		
		case INITIAL_POSTS_SUCCESS:
			return {
				...state,
				isFetchingPosts: false,
				posts: [...action.data.initialPosts]
			}
		case INITIAL_POSTS_FAILURE:
			return {
				...state,
				isFetchingPosts: false,
				error: action.error
			}
		case INITIAL_POSTS_ABORTED:
			return {
				...state,
				isFetchingPosts: false,
			}
			
		case FETCHING_RECENT_POSTS: 
			return {
				...state,
				isFetchingRecentPosts: true,
			}
		
		case RECENT_POSTS_SUCCESS:
			return {
				...state,
				isFetchingRecentPosts: false,
				posts: [...action.data.recentPosts, ...state.posts]
			}
		case RECENT_POSTS_FAILURE:
			return {
				...state,
				isFetchingRecentPosts: false,
				error: action.error
			}
		case RECENT_POSTS_ABORTED:
			return {
				...state,
				isFetchingRecentPosts: false,
			}
			
		case LIKE_SUCCESS:
			let newPostsArray=[];
			for(let i=0; i<state.posts.length; i++){
				if(state.posts[i]._id.toString() === action.data.postLiked._id.toString()){
					newPostsArray.push(action.data.postLiked);
				}else{
					newPostsArray.push(state.posts[i])
				}
			}
			return {
				...state,
				posts: newPostsArray,
				focusedPost: action.data.postLiked
			}
			
		case ADD_COMMENT_SUCCESS:
			let newPostsArrayFromComment=[];
			let newFocusedPostArray = [...state.focusedPost]
			newFocusedPostArray.splice(-1,1);
			newFocusedPostArray.push(action.data.postCommented[0]);
			for(let i=0; i<state.posts.length; i++){
				if(state.posts[i]._id.toString() === action.data.postCommented[0]._id.toString()){
					newPostsArrayFromComment.push(action.data.postCommented[0]);
				}else{
					newPostsArrayFromComment.push(state.posts[i])
				}
			}
			return {
				...state,
				isUpdatingFocusedPost: false,
				focusedPost: newFocusedPostArray,
				posts: newPostsArrayFromComment
			}
			
		case CLEAR_FOCUSED_POST:
			let clearFocusedArray = [...state.focusedPost];
			clearFocusedArray.splice(-1,1)
			return {
				...state,
				focusedPost: clearFocusedArray
			}
			
		case FETCHING_FOCUSED_POST:
			
			return {
				...state,
				isUpdatingFocusedPost: true
			}
		case FOCUSED_POST_SUCCESS:
		let newFocusedPostArrayNews=[...state.focusedPost, action.data.focusedPost[0]]
			return {
				...state,
				focusedPost: newFocusedPostArrayNews
			}
			
		default:
			return state;
	}
}	