import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {convertDate} from '../../../../tools/dateConverter';

class PostContainer extends PureComponent{
	
	goToProfileScreen = () => {
		this.props.goToProfileScreen(this.props.post.postedBy)
	}
	
	onLikePressed = () => {
		const {post, auth} = this.props;
		const data = {token: auth.currentUser.token, postId: post._id, triggeredBy: auth.currentUser.userData._id, liked: post.likedByCurrentUser, postedBy: post.postedBy, fullName: post.fullName, profilePic: post.profilePic}
		this.props.onLikePressed(data)
	}
	
	goToCommentsScreen = () => {
		const {post} = this.props;
		const data = {...post}
		this.props.goToCommentsScreen(data)
	}
	
	render(){
		const {_id, text, postedBy, fullName, profilePic, postDate, likedBy, comments, likedByCurrentUser} = this.props.post;
		const loveOnIcon = require('../../../../assets/icons/love-on.png');
		const loveOffIcon = require('../../../../assets/icons/love-off.png');
		const commentIcon = require('../../../../assets/icons/comment.png');
		return(
			<View style={styles.postContainer}>
				<View style={{ paddingRight: 10 }}>
					<TouchableNativeFeedback onPress={this.props.routeName.toLowerCase().includes('profile') ? null : this.goToProfileScreen}>
						<Image source={ {uri: profilePic}} style={ { width: 55, height: 55, borderRadius: 8 } }/>
					</TouchableNativeFeedback>
				</View>
				<View style={{ flex: 1}}>
					<View style={{ paddingBottom: 10}}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableNativeFeedback onPress={this.props.routeName.toLowerCase().includes('profile') ? null : this.goToProfileScreen}>
								<Text style= {styles.usernameText}>{postedBy}&nbsp;</Text>
							</TouchableNativeFeedback>
							<Text style= {styles.fullNameText}>{fullName}&nbsp;&bull;&nbsp;</Text>
							<Text style= {styles.fullNameText}>{convertDate(postDate)}</Text>
						</View>
						<Text style={styles.postText}>{text}</Text>
						<View style={{alignItems: 'center', flexDirection:'row', flexWrap: 'nowrap'}}>
							<View style={{flex: 0.25, flexDirection: 'row'}}>
								<View style={{alignSelf: 'center'}}>
									<TouchableOpacity onPress={this.props.routeName.toLowerCase().includes('comments') ? null : this.goToCommentsScreen}>	
										<Image source={commentIcon} style={ { width: 22, height: 22 } }/>
									</TouchableOpacity>
								</View>
								<View style={{alignSelf: 'center', paddingLeft: 5}}>
									<Text style={styles.likeText}>{comments.length}</Text>
								</View>
							</View>
							<View style={{flex: 0.25, flexDirection: 'row'}}>
								<View style={{alignSelf: 'center'}}>
									<TouchableOpacity onPress={this.onLikePressed}>
										<Image source={likedByCurrentUser ? loveOnIcon : loveOffIcon} style={ { width: 20, height: 20 } }/>
									</TouchableOpacity>
								</View>
								<View style={{alignSelf: 'center', paddingLeft: 5}}>
									<Text style={styles.likeText}>{likedBy.length}</Text>
								</View>
							</View>
							<View style={{flex: 0.5}}></View>
						</View>
					</View>
				</View>
			</View>		
		)
	}
}

const styles = StyleSheet.create({
	postContainer: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#000',
		borderBottomColor: '#000',
		padding: 10,
		flexDirection:'row',
	},
	postContainerTransparent: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#000',
		borderBottomColor: '#000',
		padding: 10,
		flexDirection:'row',
		opacity: 0.5,
	},
	usernameText: {
		fontSize: 17,
		color: '#2288D6'
	},
	fullNameText: {
		fontSize: 17,
	},
	postText: {
		fontSize: 17,
		color: '#000',
		paddingBottom: 10,
		flexWrap: 'wrap'
	},
	likeText: {
		fontSize: 17,
		color: '#000',
	}
});

export default PostContainer;