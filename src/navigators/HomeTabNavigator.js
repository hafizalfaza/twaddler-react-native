import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import NewsfeedStack from './NewsfeedNavigator';
import SearchStack from './SearchNavigator';
import NotificationStack from './NotificationNavigator';
import MyProfileStack from './MyProfileNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const TabNavigatorConfig = {
  animationEnabled  : false,
  tabBarPosition : 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
	activeTintColor: '#0C3A5B',
	labelStyle: {
      fontSize: 12,
	},
	style: {
      backgroundColor: '#276796',
	},
	pressColor: 'none',
	showIcon: true,
	showLabel: false,
  },
  lazy : true,
	
}


const HomeTabNavigator = TabNavigator({
  N: { screen: NewsfeedStack, navigationOptions : { tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/newsfeed.png')}
        style={[{width: 20, height: 20}, {tintColor: tintColor}]}
      />
  )}},
  S: { screen: SearchStack, navigationOptions : { tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/search.png')}
        style={[{width: 20, height: 20}, {tintColor: tintColor}]}
      />
  )} },
  No: { screen: NotificationStack, navigationOptions : { tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/notification.png')}
        style={[{width: 20, height: 20}, {tintColor: tintColor}]}
      />
  )} },
  MP: { screen: MyProfileStack, navigationOptions : { tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/profile.png')}
        style={[{width: 20, height: 20}, {tintColor: tintColor}]}
      />
  )}  }
}, TabNavigatorConfig);



export default HomeTabNavigator;