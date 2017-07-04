import React, {Component} from 'react';
import { connect } from 'react-redux';
import {logIn, abortLogin} from '../../redux/actions/auth';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, Button, AsyncStorage } from 'react-native';

class LoginScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			identifier: '',
			password: ''
		}
		this.onLoginPressed = this.onLoginPressed.bind(this);
		this.onAbortPressed = this.onAbortPressed.bind(this);
	}

	
	onLoginPressed() {
	  const identifier = this.state.identifier;
	   const password = this.state.password;
	   data = {identifier: identifier, password: password}
	  this.props.logIn(data);
	}
	
	onAbortPressed() {
	  this.props.abortLogin();
	}


	
	render(){
		const {navigation, auth} = this.props;
		return (
			
			<View style={{flex: 1, justifyContent: 'center', padding: 10}}>
				<Text style={{fontSize: 35}}>Twaddler{"\n"}</Text>
				<TextInput placeholder={"Username or email"} onChangeText={(val) => this.setState({identifier: val})}/>
				<TextInput placeholder={"Password"} secureTextEntry={true} onChangeText={(val) => this.setState({password: val})}/>
				{auth.isAuthenticating ? <Text>Authenticating...</Text> : <Button title={"Login"} onPress={this.onLoginPressed} disabled={auth.isAuthenticating}/>}
			</View>
		);			
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		isFetchingUser: state.isFetchingUser
	}
}

function mapDispatchToProps(dispatch, ownProps){
	return {
		logIn: (data) => dispatch(logIn(data)),
		abortLogin: () => dispatch(abortLogin())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);