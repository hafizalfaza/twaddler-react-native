import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {convertDate} from '../../../../tools/dateConverter';

class NotificationContainer extends PureComponent{
	
	goToProfileScreen = () => {
		this.props.goToProfileScreen(this.props.notification.triggeredBy)
	}
	
	goToCommentsScreen = () => {
		this.props.goToCommentsScreen(this.props.notification.postData)
	}
	
	
	render(){
		const {notification} = this.props;
		const loveIcon = require('../../../../assets/icons/love-on.png');
		const commentIcon = require('../../../../assets/icons/comment.png');
		if(notification.type === 'POST_LIKE'){
			return(
				<View style={{ paddingLeft: 7, paddingTop: 7, paddingBottom: 7, borderTopWidth: 1, borderTopColor: 'black', borderBottomWidth: 1, borderBottomColor: 'black'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<TouchableNativeFeedback onPress={this.goToProfileScreen}>
							<Image source={{uri: notification.profilePic}} style={{width: 30, height: 30}} />
						</TouchableNativeFeedback>
						<View style={{flexDirection: 'row', paddingLeft: 7, alignSelf: 'center'}}>
							<TouchableNativeFeedback onPress={this.goToProfileScreen}>
								<Text style={{color: 'black'}}><Text style={{fontWeight: 'bold'}}>{notification.triggeredBy}</Text> liked your post </Text>
							</TouchableNativeFeedback>
							<Image source={loveIcon} style={{alignSelf: 'center', width: 15, height: 15}}/>
							<Text>&nbsp;&bull;&nbsp;{convertDate(notification.date)}</Text>
						</View>
												
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 0.13}}></View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 0.80, padding: 7, borderWidth: 1, borderColor: 'black', borderRadius: 8}}>
							<View style={{flex: 0.90}}>	
								<Text>{notification.postData.text}</Text>
							</View>
							<View style={{flex: 0.10, alignItems: 'flex-end'}}>
								<Text>{convertDate(notification.postData.postDate)}</Text>
							</View>
						</View>
						<View style={{flex: 0.05}}></View>
					</View>
				</View>
			);
		}else if(notification.type === 'POST_COMMENT'){
			return(
				<View style={{paddingLeft: 7, paddingTop: 7, paddingBottom: 7, borderTopWidth: 1, borderTopColor: 'black', borderBottomWidth: 1, borderBottomColor: 'black'}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Image source={{uri: notification.profilePic}} style={{width: 30, height: 30}} />
						<View style={{flex: 1}}>	
							<View style={{flexDirection: 'row', paddingLeft: 7}}>	
								<TouchableOpacity onPress={this.goToProfileScreen}>
									<Text style={{color: 'black'}}><Text style={{fontWeight: 'bold'}}>{notification.triggeredBy}</Text> commented on your post </Text>
								</TouchableOpacity>
								<Image source={commentIcon} style={{alignSelf: 'center', width: 15, height: 15}}/>
								<Text>&nbsp;&bull;&nbsp;{convertDate(notification.date)}</Text>
							</View>
							<View style={{paddingLeft: 14, paddingTop: 10, paddingBottom: 10, paddingRight: 14}}>
								<Text style={{color: 'black'}}>"{notification.comment}"</Text>
							</View>
						</View>				
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 0.13}}></View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 0.80, padding: 7, borderWidth: 1, borderColor: 'black', borderRadius: 8}}>
							<View style={{flex: 0.90}}>	
								<Text>{notification.postData.text}</Text>
							</View>
							<View style={{flex: 0.10, alignItems: 'flex-end'}}>
								<Text>{convertDate(notification.postData.postDate)}</Text>
							</View>
						</View>
						<View style={{flex: 0.05}}></View>
					</View>
				</View>
			);
		}else if(notification.type === 'USER_MENTION'){
			return(
				<View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<Image source={{uri: notification.profilePic}} style={{width: 50, height: 50}} />
						<Text>{notification.triggeredBy} mentioned you in a post</Text>
					</View>
					<View style={{paddingLeft: 60}}>
						<Text>{this.props.auth.currentUser.userData.username}</Text>
						<Text>{notification.postData.text}</Text>
					</View>
				</View>
			);
		}else{
			return null;
		}
	}
}

export default NotificationContainer;