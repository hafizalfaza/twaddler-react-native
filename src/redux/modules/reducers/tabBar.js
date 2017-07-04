import {HIDE_TAB_BAR, SHOW_TAB_BAR} from '../../constants';

	
export default function tabBar(state=true, action){
	switch(action.type){
		case HIDE_TAB_BAR: 
			return false;
		
		case SHOW_TAB_BAR: 
			return true;
		default:
			return state;
	}
}	