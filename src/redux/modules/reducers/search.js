import {FETCHING_SEARCH_RESULT, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_ABORTED} from '../../constants';

const initialSearchState = { 
	searchResult: null,
	isFetchingSearchResult: false,
	error: null
	};

	
export default function search(state=initialSearchState, action){
	switch(action.type){
		case FETCHING_SEARCH_RESULT: 
			return {
				...state,
				isFetchingSearchResult: true,
			}
		
		case SEARCH_SUCCESS:
			return {
				...state,
				isFetchingSearchResult: false,
				searchResult: action.data
			}
		case SEARCH_FAILURE:
			return {
				...state,
				isFetchingSearchResult: false,
				error: action.error
			}
		case SEARCH_ABORTED:
			return {
				...state,
				isFetchingSearchResult: false,
			}
			
		default:
			return state;
	}
}	