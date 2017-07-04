import React, {Component} from 'react';
import PostContainer from '../Newsfeed/PostContainer';
import CommentContainer from './CommentContainer';
import {View, FlatList, TouchableOpacity, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {addComment, clearFocusedPost} from '../../../../redux/actions/comment';
import {onLikePressed} from '../../../../redux/actions/like';
import {updateFocusedPost} from '../../../../redux/actions/newsfeed';

class CommentsScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			commentInput: ''
		}
		this.goBack = this.goBack.bind(this);
		this.onLikePressed = this.onLikePressed.bind(this);
		this.goToProfileScreen = this.goToProfileScreen.bind(this);
		this.onAddComment = this.onAddComment.bind(this);
	}
	
	componentDidMount(){
		this.props.navigation.setParams({
			goBack: this.goBack,
			goToProfileScreen: this.goToProfileScreen
		})
		
		const data = {token: this.props.auth.currentUser.token, postId: this.props.navigation.state.params.postData._id}
		
		this.props.updateFocusedPost(data);
	}
	
	componentWillUnmount(){
		this.props.clearFocusedPost();
	}
	
	onLikePressed(data){
		const likeData = {...data, routeName: this.props.navigation.state.routeName}
		this.props.onLikePressed(likeData);
	}
	

	goToProfileScreen(data){		
		const {state} = this.props.navigation;
		if(state.routeName === 'CommentsOnNewsfeed'){
			const profileData = {type: 'PROFILE_ON_NEWSFEED', data}
			this.props.goToProfileScreen(profileData);
		}else if(state.routeName === 'CommentsOnSearch'){
			const profileData = {type: 'PROFILE_ON_SEARCH', data}
			this.props.goToProfileScreen(profileData);
		}else if(state.routeName === 'CommentsOnNotification'){
			const profileData = {type: 'PROFILE_ON_NOTIFICATION', data}
			this.props.goToProfileScreen(profileData);
		}else if (state.routeName === 'CommentsOnMyProfile'){
			const profileData = {type: 'PROFILE_ON_MYPROFILE', data}
			this.props.goToProfileScreen(profileData);
		}
	}
	
	
	goBack(){
		const {state} = this.props.navigation;
		if(state.routeName === 'CommentsOnNewsfeed'){
			const data = {type: 'NEWSFEED_BACK', key: state.key}
			this.props.goBack(data);
		}else if(state.routeName === 'CommentsOnSearch'){
			const data = {type: 'SEARCH_BACK', key: state.key}
			this.props.goBack(data);
		}else if(state.routeName === 'CommentsOnNotification'){
			const data = {type: 'NOTIFICATION_BACK', key: state.key}
			this.props.goBack(data);
		}else if (state.routeName === 'CommentsOnMyProfile'){
			const data = {type: 'MYPROFILE_BACK', key: state.key}
			this.props.goBack(data);
		}						
	}
	
	onAddComment(){
		if(this.state.commentInput !== ''){
			this._textInput.setNativeProps({text: ''});
			const {postData} = this.props.navigation.state.params;
			const commentData = {comment: this.state.commentInput, postId: postData._id, token:this.props.auth.currentUser.token}
			const commentToPost = {user: this.props.auth.currentUser.userData.username, comment: this.state.commentInput, commentId: this.props.auth.currentUser.userData._id+'_'+'posting'}
			
			this.props.addComment({commentData, commentToPost})
		}	
	}
	
	
	static navigationOptions = ({ navigation }) => {
	  const {state, setParams} = navigation;
		 return {
			title: 'Comments',
			headerLeft: <TouchableOpacity onPress={state.params ? state.params.goBack : null}><Image source={require('../../../../assets/icons/back.png')} style={{marginLeft: 10,width: 25, height: 25}}/></TouchableOpacity>,
			headerTitleStyle: {
				color: 'white',
				marginLeft: 5,
			},
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#276796'
			},
	  };

		 
	  
	};
	
		
	commentContainer = ({item}) => (
		<CommentContainer comment={item} goToProfileScreen={this.goToProfileScreen}/>
	)
	
	render(){
		
		const {postData} = this.props.navigation.state.params;
		const {newsfeed} = this.props;
		const addComment = require('../../../../assets/icons/add-comment.png');
		if(!newsfeed.isUpdatingFocusedPost){
			console.log(newsfeed.focusedPost);
			console.log(postData)
			return(
				<View style={{flex: 1, justifyContent: 'space-between'}}>
					<PostContainer post={newsfeed.focusedPost[0] ? newsfeed.focusedPost[newsfeed.focusedPost.length-1] : postData} auth={this.props.auth}	routeName={this.props.navigation.state.routeName} onLikePressed={this.onLikePressed} goToProfileScreen={this.goToProfileScreen} routeName={this.props.navigation.state.routeName}/>
					<FlatList 
						data={newsfeed.focusedPost[0] ? newsfeed.focusedPost[newsfeed.focusedPost.length-1].comments : postData.comments}
						renderItem={this.commentContainer}
						keyExtractor={(item) => item.commentId}
					/>				
					
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 0.85, paddingLeft: 10, paddingRight: 5}}>
							<TextInput returnKeyType='send' onSubmitEditing={this.onAddComment} ref={component => this._textInput = component} placeholder='Type a comment...' onChangeText={(val)=>this.setState({commentInput: val})} autoFocus/>
						</View>
						<View style={{flex: 0.15}}>
							<TouchableOpacity onPress={this.onAddComment}>
								<Image source={addComment} style={{width: 40, height: 40}}/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)	
		}else{
			return (
				<View style={{flex: 1, justifyContent: 'space-between'}}>
					<PostContainer post={postData} auth={this.props.auth}	routeName={this.props.navigation.state.routeName} onLikePressed={this.onLikePressed} goToProfileScreen={this.goToProfileScreen} routeName={this.props.navigation.state.routeName}/>
					<FlatList 
						data={postData.comments}
						renderItem={this.commentContainer}
						keyExtractor={(item) => item.commentId}
					/>				
					
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 0.85, paddingLeft: 10, paddingRight: 5}}>
							<TextInput ref={component => this._textInput = component} placeholder='Type a comment...' onChangeText={(val)=>this.setState({commentInput: val})} autoFocus/>
						</View>
						<View style={{flex: 0.15}}>
							<TouchableOpacity onPress={this.onAddComment}>
								<Image source={addComment} style={{width: 40, height: 40}}/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			
			)
			
		}
					
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		newsfeed: state.newsfeed,
	}
}

function mapDispatchToProps(dispatch){
	return {
		goBack: (data) => dispatch(data),
		goToProfileScreen: (data) => dispatch(data),
		onLikePressed: (data) => dispatch(onLikePressed(data)),
		addComment: (data) => dispatch(addComment(data)),
		clearFocusedPost: () => dispatch(clearFocusedPost()),
		updateFocusedPost: (data) => dispatch(updateFocusedPost(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);