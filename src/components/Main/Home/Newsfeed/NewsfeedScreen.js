import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TextInput, TouchableOpacity, Image} from 'react-native';
import {getInitialPosts} from '../../../../redux/actions/newsfeed';
import PostContainer from './PostContainer';
import {onLikePressed} from '../../../../redux/actions/like';
import {getRecentPosts} from '../../../../redux/actions/newsfeed';
import {postContent} from '../../../../redux/actions/post';

class NewsfeedScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			textInput: ''
		}
		this.goToProfileScreen = this.goToProfileScreen.bind(this);		
		this.onLikePressed = this.onLikePressed.bind(this);		
		this.goToCommentsScreen = this.goToCommentsScreen.bind(this);		
		this.handleRefresh = this.handleRefresh.bind(this);		
		this.onAddPost = this.onAddPost.bind(this);		
	}
	
	componentDidMount(){
		const {token} = this.props.auth.currentUser;
		this.props.getInitialPosts(token)
	}
	
	goToProfileScreen(data){		
		this.props.goToProfileScreen(data);
	}
	
	onLikePressed(data){
		const likeData = {...data, routeName: this.props.navigation.state.routeName}
		this.props.onLikePressed(likeData);
	}
	
	goToCommentsScreen(data){
		const {state} = this.props.navigation;

		const commentsData = {type: 'COMMENTS_ON_NEWSFEED', postData: data}
		this.props.goToCommentsScreen(commentsData);
	}
	
	handleRefresh(){
		const {newsfeed} = this.props;
		const data = {token: this.props.auth.currentUser.token, latestPost: newsfeed.posts[0].postDate}
		this.props.getRecentPosts(data);
	}
	
	onAddPost(){
		if(this.state.textInput !== ''){
			const data = {token: this.props.auth.currentUser.token, inputText: this.state.textInput, charCount: this.state.textInput.length, latestPost: this.props.newsfeed.posts[0].postDate}
			this.props.postContent(data);
			this._textInput.setNativeProps({text: ''});
		}
	}
	
	
	postContainer = ({item}) => (
		<PostContainer 
			post={item}
			auth={this.props.auth}
			goToProfileScreen={this.goToProfileScreen}
			onLikePressed={this.onLikePressed}
			goToCommentsScreen={this.goToCommentsScreen}
			routeName={this.props.navigation.state.routeName}
		/>
	);
	
	static navigationOptions = ({ navigation }) => {
	  const {state, setParams} = navigation;

	  return {
		title: 'Twaddler',
		headerTitleStyle: {
			color: 'white',
			textAlign: 'center',
			alignSelf: 'center'
			
		},
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#276796'
		}
	  };
	  
	};
	
	render(){	
		const {newsfeed} = this.props;
		const loading = require('../../../../assets/icons/loading.gif');
		const addPost = require('../../../../assets/icons/add-comment.png');
		if(!newsfeed.isFetchingPosts){
			if(newsfeed.posts){
				return (
					<View style={{flex: 1}}>
						<View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'black', borderBottomWidth: 1, borderBottomColor: 'black'}}>
							<View style={{flex: 0.85, paddingLeft: 10, paddingRight: 5}}>
								<TextInput returnKeyType='send' onSubmitEditing={this.onAddPost} ref={component => this._textInput = component} placeholder='Say something...' onChangeText={(val)=>this.setState({textInput: val})} underlineColorAndroid='transparent'/>
							</View>
							<View style={{flex: 0.15}}>
								<TouchableOpacity onPress={this.onAddPost}>
									<Image source={addPost} style={{width: 40, height: 40}}/>
								</TouchableOpacity>
							</View>
						</View>
						{newsfeed.isFetchingRecentPosts ? <View style={{justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 20, height: 20}}/></View> : null}
						<FlatList
							data={newsfeed.posts}
							renderItem={this.postContainer}
							keyExtractor={(item) => item._id}
							refreshing={newsfeed.isFetchingPosts}
							onRefresh={this.handleRefresh}
						/>
					</View>
				)
			}else{
				return <Text>No Posts</Text>
			}		
		}else{
			return <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
		}			
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		newsfeed: state.newsfeed
	}
}

function mapDispatchToProps(dispatch){
	return {
		getInitialPosts: (data) => dispatch(getInitialPosts(data)),
		onLikePressed: (data) => dispatch(onLikePressed(data)),
		goToProfileScreen: (data) => dispatch({type: 'PROFILE_ON_NEWSFEED', data}),
		goToCommentsScreen: (data) => dispatch(data),
		getRecentPosts: (data) => dispatch(getRecentPosts(data)),
		postContent: (data) => dispatch(postContent(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedScreen);