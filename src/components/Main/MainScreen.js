import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import LoginScreen from './LoginScreen';
import {setCurrentUser} from '../../redux/actions/auth';
import HomeTabNavigator from '../../navigators/HomeTabNavigator';

class MainScreen extends Component{
	constructor(props){
		super(props);
		this.checkToken = this.checkToken.bind(this);
		this.setCurrentUser = this.setCurrentUser.bind(this);
	}
	
	componentWillMount(){
		this.checkToken();
		// AsyncStorage.removeItem('access_token');
	}
  

  setCurrentUser(currentUser){
	  this.props.setCurrentUser(currentUser)
  }
  
  async checkToken(){
	 try{
		const token = await AsyncStorage.getItem('access_token');
		const userData = await AsyncStorage.getItem('user_data');
		const parsedUserData = JSON.parse(userData);
		const currentUser = {token: token, user: parsedUserData}
		if(token){
			this.setCurrentUser(currentUser);
		}else{
			this.setState({isLoggedIn: false});
			console.log('no token');
			
		}
	}catch(error){
		console.log("Something went wrong");
	}
  }
	
	render(){
		const {auth} = this.props;

		if(auth.isLoggedIn == true){
			return <HomeTabNavigator />
		}
		
		if(auth.isLoggedIn == false){
			return(
				<LoginScreen {...this.props} />
			);
		}

		if(auth.isLoggedIn==null){
			return null;
		}	
		
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
	}
}
function mapDispatchToProps(dispatch){
	return {
		setCurrentUser: (data) => dispatch(setCurrentUser(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);