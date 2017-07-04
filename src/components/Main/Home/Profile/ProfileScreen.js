import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfileData} from '../../../../redux/actions/profile';
import {View, Text, Image, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import PostContainer from '../Newsfeed/PostContainer';
import {clearProfileData, abortProfile} from '../../../../redux/actions/profile';
import {onLikePressed} from '../../../../redux/actions/like';
import {onFollowPressed} from '../../../../redux/actions/follow';


class MyProfileScreen extends Component{
	constructor (props){
		super(props);
		this.goBack = this.goBack.bind(this);
		this.goToProfileScreen = this.goToProfileScreen.bind(this);	
		this.onLikePressed = this.onLikePressed.bind(this);	
		this.goToCommentsScreen = this.goToCommentsScreen.bind(this);	
		this.onEditProfilePressed = this.onEditProfilePressed.bind(this);	
		this.onFollowPressed = this.onFollowPressed.bind(this);	
		this.logout = this.logout.bind(this);	
	}
	
	
	componentDidMount(){
		const {token, userData} = this.props.auth.currentUser;
		const {username} = userData;
		const {params} = this.props.navigation.state;
		if(this.props.navigation.state.routeName === 'MyProfile'){
			if(!this.props.profile.currentUserProfile){
				const data = {token, username, routeName: this.props.navigation.state.routeName}
				this.props.getProfileData(data)
			}
			this.props.navigation.setParams({
				profileUsername: this.props.auth.currentUser.userData.username
			})
		}else{
			const data = {token, username: this.props.navigation.state.params.profileUsername, routeName: this.props.navigation.state.routeName}
			this.props.getProfileData(data)
		}
		
		this.props.navigation.setParams({
			isCurrentUser: false,
			goBack: this.goBack,
			logout: this.logout,
		})
	}
	
	componentWillUnmount(){
		const {routeName} = this.props.navigation.state;
		this.props.clearProfileData(this.props.navigation.state.routeName);
		if(routeName !== 'MyProfile'){
			this.props.abortProfile();
		}
		
	}
	
	async logout(){
		try{
			await AsyncStorage.removeItem('access_token');
			await AsyncStorage.removeItem('user_data');
			this.props.resetReduxState();
		}catch(error){
			console.log(error);
		}
	}
	
	goToProfileScreen(data){
		// if(state.routeName === 'ProfileOnNewsfeed'){
			// const data = {type: 'PROFILE_ON_NEWSFEED', data}
			// this.props.goToProfileScreen(data);
		// }else if(state.routeName === 'ProfileOnSearch') {
			// const data = {type: 'PROFILE_ON_Search', data}
			// this.props.goToProfileScreen(data);
		// }
		
	}
	
	
	goToCommentsScreen(data){		
		const {state} = this.props.navigation;
		if(state.routeName === 'ProfileOnNewsfeed'){
			const commentsData = {type: 'COMMENTS_ON_NEWSFEED', postData: data}
			this.props.goToCommentsScreen(commentsData);
		}else if(state.routeName === 'ProfileOnSearch'){
			const commentsData = {type: 'COMMENTS_ON_SEARCH', postData: data}
			this.props.goToCommentsScreen(commentsData);
		}else if(state.routeName === 'ProfileOnNotification'){
			const commentsData = {type: 'COMMENTS_ON_NOTIFICATION', postData: data}
			this.props.goToCommentsScreen(commentsData);
		}else if(state.routeName === 'ProfileOnMyProfile'){
			const commentsData = {type: 'COMMENTS_ON_MYPROFILE', postData: data}
			this.props.goToCommentsScreen(commentsData);
		}
		
		
	}
	
	
	
	onLikePressed(data){
		const likeData = {...data, routeName: this.props.navigation.state.routeName}
		this.props.onLikePressed(likeData);
	}
	
	
	goBack(){
		const {state} = this.props.navigation;
		if(state.routeName === 'ProfileOnNewsfeed'){
			const data = {type: 'NEWSFEED_BACK', key: state.key}
			this.props.goBack(data);
		}else if(state.routeName === 'ProfileOnSearch'){
			const data = {type: 'SEARCH_BACK', key: state.key}
			this.props.goBack(data);
		}else if(state.routeName === 'ProfileOnNotification'){
			const data = {type: 'NOTIFICATION_BACK', key: state.key}
			this.props.goBack(data);
		}
		
	}
	
	static navigationOptions = ({ navigation }) => {
	  const {state, setParams} = navigation;
		 return {
			title: state.params ? <Text style={{paddingLeft: 5}}>{state.params.profileUsername}</Text> : null,
			headerLeft: state.routeName === 'MyProfile' ? null : <TouchableOpacity onPress={state.params ? state.params.goBack : null}><Image source={require('../../../../assets/icons/back.png')} style={{marginLeft: 10,width: 25, height: 25}}/></TouchableOpacity>,
			headerRight: state.params ? state.routeName === 'MyProfile' ? <TouchableOpacity onPress={state.params.logout} style={{marginRight: 10}}><Text style={{fontSize: 18, color: 'white'}}>Logout</Text></TouchableOpacity> : null : null,
			headerTitleStyle: {
				color: 'white',
				marginLeft: 5,
			},
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#276796'
			},
			tabBarVisible: false, 
	  };

		 
	  
	};
	
	onEditProfilePressed(){
		// const {profileNewsfeed} = this.props.profile;
		// const data = {token: this.props.auth.currentUser.token, userRequested: profileNewsfeed[profileNewsfeed.length-1].userInfo._id, following: profileNewsfeed[profileNewsfeed.length-1].userInfo.followedByCurrentUser}
		// this.props.onFollowPressed(data);
	}
	
	onFollowPressed(){
		
		const {auth, navigation} = this.props;

		if(navigation.state.routeName === 'ProfileOnNewsfeed'){
			const {profileNewsfeed} = this.props.profile;
			const data = {token: auth.currentUser.token, userRequested: profileNewsfeed[profileNewsfeed.length-1].userInfo._id, following: profileNewsfeed[profileNewsfeed.length-1].userInfo.followedByCurrentUser}
			this.props.onFollowPressed(data);
		} else if(navigation.state.routeName === 'ProfileOnSearch'){
			const {profileSearch} = this.props.profile;
			const data = {token: auth.currentUser.token, userRequested: profileSearch[profileSearch.length-1].userInfo._id, following: profileSearch[profileSearch.length-1].userInfo.followedByCurrentUser}
			this.props.onFollowPressed(data);
		} else if(navigation.state.routeName === 'ProfileOnNotification'){
			const {profileNotification} = this.props.profile;
			const data = {token: auth.currentUser.token, userRequested: profileNotification[profileNotification.length-1].userInfo._id, following: profileNotification[profileNotification.length-1].userInfo.followedByCurrentUser}
			this.props.onFollowPressed(data);
		} 
		
	}
	
	
	postContainer = ({item}) => (
		<PostContainer 
			post={item} 
			auth={this.props.auth}
			onLikePressed={this.onLikePressed}
			goToCommentsScreen={this.goToCommentsScreen}
			routeName={this.props.navigation.state.routeName}
		/>
	);
	
	render(){
		const loading = require('../../../../assets/icons/loading.gif');
		const {profile, navigation, auth} = this.props;
		const {userData} = auth.currentUser;
		if(navigation.state.routeName === 'MyProfile'){
			if(profile.currentUserProfile){
				return (
					<View style={{flex: 1}}>
						<View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
							<View style={{flexDirection: 'row'}}>
								<Image source={{uri: profile.currentUserProfile.userInfo.profilePic}} style={{width: 80, height: 80}}/>
								<View style={{flex: 1}}>	
									<View style={{ flex: 1, flexDirection: 'row', padding: 10}}>
										<View style={{flex: 0.33, alignItems: 'center'}}>
											<Text style={{color: 'black'}}>Posts</Text>
											<Text style={{color: 'black', fontWeight: 'bold'}}>{profile.currentUserProfile.userInfo.posts}</Text>
										</View>
										<View style={{flex: 0.33, alignItems: 'center'}}>
											<Text style={{color: 'black'}}>Followers</Text>
											<Text style={{color: 'black', fontWeight: 'bold'}}>{profile.currentUserProfile.userInfo.followers.length}</Text>
										</View>
										<View style={{flex: 0.33, alignItems: 'center'}}>
											<Text style={{color: 'black'}}>Following</Text>
											<Text style={{color: 'black', fontWeight: 'bold'}}>{profile.currentUserProfile.userInfo.following.length}</Text>
										</View>
									</View>
									
									<View style={{paddingTop: 10, alignSelf: 'center'}}>
										<TouchableOpacity>
											<Text style={{color: 'black', fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: 'black'}}>EDIT PROFILE</Text>
										</TouchableOpacity>											
									</View>
									
								</View>	
							</View>
							<View>
								<Text style={{fontSize: 17, color: 'black'}}>{userData.fullName}</Text>
								<Text>{profile.currentUserProfile.userInfo.bio}</Text>
							</View>
						</View>
						<FlatList
							data={profile.currentUserProfile.posts}
							renderItem={this.postContainer}
							keyExtractor={(item) => item._id}
						/>
					</View>
				)
			}else{
				if(profile.isFetchingProfile){
					return (
						<View style={{flex: 1}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
								<View style={{flexDirection: 'row'}}>
									<Image source={{uri: userData.profilePic}} style={{width: 80, height: 80}}/>
									<View style={{flex: 1}}>	
										<View style={{ flex: 1, flexDirection: 'row', padding: 10}}>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Posts</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{userData.posts}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Followers</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{userData.followers.length}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Following</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{userData.following.length}</Text>
											</View>
										</View>
										
										<View style={{paddingTop: 10, alignSelf: 'center'}}>
											<TouchableOpacity>
												<Text style={{color: 'black', fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: 'black'}}>EDIT PROFILE</Text>
											</TouchableOpacity>											
										</View>
									</View>	
								</View>
								<View>
									<Text style={{fontSize: 17, color: 'black'}}>{userData.fullName}</Text>
									<Text>{userData.bio}</Text>
								</View>
							</View>
							<View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
						</View>					
					)
				}else{
					if(profile.error){
						return <Text>Something went wrong</Text>;
					}else{
						return null;
					}
				}
			}
		}else{
			if(navigation.state.routeName === 'ProfileOnNewsfeed'){
				if(profile.profileNewsfeed[0] && !profile.isFetchingProfile){
					
					const profileNewsfeed = profile.profileNewsfeed[profile.profileNewsfeed.length - 1];
					return (
						<View style={{flex: 1}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
								<View style={{flexDirection: 'row'}}>
									<Image source={{uri: profileNewsfeed.userInfo.profilePic}} style={{width: 80, height: 80}}/>
									<View style={{flex: 1}}>	
										<View style={{ flex: 1, flexDirection: 'row', padding: 10}}>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Posts</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNewsfeed.userInfo.posts}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Followers</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNewsfeed.userInfo.followers.length}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Following</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNewsfeed.userInfo.following.length}</Text>
											</View>
										</View>
										
										<View style={{paddingTop: 10, alignSelf: 'center'}}>
											<TouchableOpacity onPress={profileNewsfeed.userInfo.username === auth.currentUser.userData.username ? this.onEditProfilePressed : this.onFollowPressed}>
												<Text style={{color: 'black', fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: 'black'}}>{profileNewsfeed.userInfo.username !== auth.currentUser.userData.username ? profileNewsfeed.userInfo.followedByCurrentUser ? 'UNFOLLOW' : '+FOLLOW' : 'EDIT PROFILE'}</Text>
											</TouchableOpacity>											
										</View>
										
									</View>	
								</View>
								<View>
									<Text style={{fontSize: 17, color: 'black'}}>{profileNewsfeed.userInfo.fullName}</Text>
									<Text>{profileNewsfeed.userInfo.bio}</Text>
								</View>
							</View>
							<FlatList
								data={profileNewsfeed.posts}
								renderItem={this.postContainer}
								keyExtractor={(item) => item._id}
							/>
						</View>
					)
				}else{
					return <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
				}
			}else if(navigation.state.routeName === 'ProfileOnSearch'){
				if(profile.profileSearch[0] && !profile.isFetchingProfile){
					const profileSearch = profile.profileSearch[profile.profileSearch.length - 1];
					return (
						<View style={{flex: 1}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
								<View style={{flexDirection: 'row'}}>
									<Image source={{uri: profileSearch.userInfo.profilePic}} style={{width: 80, height: 80}}/>
									<View style={{flex: 1}}>	
										<View style={{ flex: 1, flexDirection: 'row', padding: 10}}>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Posts</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileSearch.userInfo.posts}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Followers</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileSearch.userInfo.followers.length}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Following</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileSearch.userInfo.following.length}</Text>
											</View>
										</View>
										
										<View style={{paddingTop: 10, alignSelf: 'center'}}>
											<TouchableOpacity onPress={profileSearch.userInfo.username === auth.currentUser.userData.username ? this.onEditProfilePressed : this.onFollowPressed}>
												<Text style={{color: 'black', fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: 'black'}}>{profileSearch.userInfo.username !== auth.currentUser.userData.username ? profileSearch.userInfo.followedByCurrentUser ? 'UNFOLLOW' : '+FOLLOW' : 'EDIT PROFILE'}</Text>
											</TouchableOpacity>											
										</View>
										
									</View>	
								</View>
								<View>
									<Text style={{fontSize: 17, color: 'black'}}>{profileSearch.userInfo.fullName}</Text>
									<Text>{profileSearch.userInfo.bio}</Text>
								</View>
							</View>
							<FlatList
								data={profileSearch.posts}
								renderItem={this.postContainer}
								keyExtractor={(item) => item._id}
							/>
						</View>
					)
				}else{
					return <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
				}
			}else if(navigation.state.routeName === 'ProfileOnNotification'){
				if(profile.profileNotification[0] && !profile.isFetchingProfile){
					const profileNotification = profile.profileNotification[profile.profileNotification.length - 1];
					return (
						<View style={{flex: 1}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
								<View style={{flexDirection: 'row'}}>
									<Image source={{uri: profileNotification.userInfo.profilePic}} style={{width: 80, height: 80}}/>
									<View style={{flex: 1}}>	
										<View style={{ flex: 1, flexDirection: 'row', padding: 10}}>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Posts</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNotification.userInfo.posts}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Followers</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNotification.userInfo.followers.length}</Text>
											</View>
											<View style={{flex: 0.33, alignItems: 'center'}}>
												<Text style={{color: 'black'}}>Following</Text>
												<Text style={{color: 'black', fontWeight: 'bold'}}>{profileNotification.userInfo.following.length}</Text>
											</View>
										</View>
										
										<View style={{paddingTop: 10, alignSelf: 'center'}}>
											<TouchableOpacity onPress={profileNotification.userInfo.username === auth.currentUser.userData.username ? this.onEditProfilePressed : this.onFollowPressed}>
												<Text style={{color: 'black', fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: 'black'}}>{profileNotification.userInfo.username !== auth.currentUser.userData.username ? profileNotification.userInfo.followedByCurrentUser ? 'UNFOLLOW' : '+FOLLOW' : 'EDIT PROFILE'}</Text>
											</TouchableOpacity>											
										</View>
										
									</View>	
								</View>
								<View>
									<Text style={{fontSize: 17, color: 'black'}}>{profileNotification.userInfo.fullName}</Text>
									<Text>{profileNotification.userInfo.bio}</Text>
								</View>
							</View>
							<FlatList
								data={profileNotification.posts}
								renderItem={this.postContainer}
								keyExtractor={(item) => item._id}
							/>
						</View>
					)
				}else{
					return <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}><Image source={loading} style={{width: 50, height: 50}}/></View>
				}
			}		
			
		}
		
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		profile: state.profile
	}
}

function mapDispatchToProps(dispatch){
	return {
		getProfileData: (data) => dispatch(getProfileData(data)),
		clearProfileData: (data) => dispatch(clearProfileData(data)),
		abortProfile: () => dispatch(abortProfile()),
		goBack: (data) => dispatch(data),
		onLikePressed: (data) => dispatch(onLikePressed(data)),
		goToCommentsScreen: (data) => dispatch(data),
		onFollowPressed: (data) => dispatch(onFollowPressed(data)),
		resetReduxState: () => dispatch({type: 'RESET_REDUX_STATE'}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);