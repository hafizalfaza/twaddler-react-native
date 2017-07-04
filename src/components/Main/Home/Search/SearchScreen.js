import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, TextInput, Image, FlatList, TouchableOpacity} from 'react-native';
import {search} from '../../../../redux/actions/search';

class SearchScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchInput: '',
		};
		this.onTypeSearch = this.onTypeSearch.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
		this.goToProfileScreen = this.goToProfileScreen.bind(this);
	}
	
	componentWillMount(){
		this.props.navigation.setParams({
			onTypeSearch: this.onTypeSearch,
			onSubmitSearch: this.onSubmitSearch
		})
	}
	
	onTypeSearch(val){
		this.setState({searchInput: val})
	}
	
	onSubmitSearch(){
		this.props.searchRequest(this.state.searchInput);
	}
	
	goToProfileScreen(){
		this.props.goToProfileScreen(this.props.search.searchResult.user.username)
	}
	
	static navigationOptions = ({ navigation }) => {
	  const {state, setParams} = navigation;
	  const searchIcon = require('../../../../assets/icons/search.png');
	  if(state.params){
		  return {
			headerTitle: <View style={{flex: 1, flexDirection: 'row'}}><View style={{flex: 0.15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}><Image source={searchIcon} style={{width: 30, height: 30}}/></View><TextInput style={{flex: 0.85, color: 'white'}} placeholder={'Search...'} placeholderTextColor={'white'} onChangeText={(val) => state.params.onTypeSearch(val)} returnKeyType= 'search' onSubmitEditing={state.params.onSubmitSearch} underlineColorAndroid='transparent' autoFocus/></View>,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#276796',
			}
		  };
	  }else{
		  return null;
	  }	  
	  
	};
	
	render(){
		const {search} = this.props;
		const {searchResult} = search;
		if(search.isFetchingSearchResult){
			return <Text>Searching...</Text>
		}else{
			if(searchResult){
				if(searchResult.user){
					return (
						<TouchableOpacity onPress={this.goToProfileScreen}>
							<View style={{flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: 'black', borderBottomWidth: 1, borderBottomColor: 'black'}}>
								<View style={{paddingRight: 10}}>
									<Image source={{uri: searchResult.user.profilePic}} style={{ width: 50, height: 50 }}/>
								</View>
								<View>
									<Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>{searchResult.user.username}{"\n"}</Text> 
									<Text>{searchResult.user.fullName}</Text> 
								</View>
							</View>
						</TouchableOpacity>
					);
				}else{
					return <Text>No result</Text>;
				}				
			}else{
				return null;
			}
		}
		
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		search: state.search,
	}
}

function mapDispatchToProps(dispatch){
	return {
		searchRequest: (data) => dispatch(search(data)),
		goToProfileScreen: (data) => dispatch({type: 'PROFILE_ON_SEARCH', data})
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);