import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, FlatList} from 'react-native';
import {getNotifications} from '../../../../redux/actions/notification';
import NotificationContainer from './NotificationContainer';

class NotificationScreen extends Component{
	constructor(props){
		super(props);
		this.goToProfileScreen = this.goToProfileScreen.bind(this);		
		this.goToCommentsScreen = this.goToCommentsScreen.bind(this);		
	}	
	
	componentDidMount(){
		const {token} = this.props.auth.currentUser;
		this.props.getNotifications(token)
	}
	
	
	goToProfileScreen(data){
		this.props.goToProfileScreen(data);
	}
	
	goToCommentsScreen(data){
		this.props.goToCommentsScreen(data);
	}
	
	
	notificationContainer = ({item}) => (
		<NotificationContainer notification={item} goToProfileScreen={this.goToProfileScreen} goToCommentsScreen={this.goToCommentsScreen}/>
	);
	
	static navigationOptions = ({ navigation }) => {
	  const {state, setParams} = navigation;

	  return {
		title: 'Notifications',
		headerTitleStyle: {
			color: 'white',			
		},
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#276796'
		}
	  };
	  
	};
	
	render(){
		const loading = require('../../../../assets/icons/loading.gif');
		const {notification} = this.props;
		if(notification.isFetchingNotifications){
			return <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
		}else{
			if(notification.notificationsData){
				if(notification.notificationsData[0]){
					return (
						<FlatList
							data={notification.notificationsData}
							renderItem={this.notificationContainer}
							keyExtractor={(item) => item.notificationId}
						/>
					)
				}else{
					return <Text>No notification</Text>
				}
			}else{
				return null;
			}
		}
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		notification: state.notification
	}
}

function mapDispatchToProps(dispatch){
	return {
		getNotifications: (data) => dispatch(getNotifications(data)),
		goToProfileScreen: (data) => dispatch({type: 'PROFILE_ON_NOTIFICATION', data}),
		goToCommentsScreen: (data) => dispatch({type: 'COMMENTS_ON_NOTIFICATION', postData: data})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);