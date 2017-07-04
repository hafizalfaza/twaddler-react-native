import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {convertDate} from '../../../../tools/dateConverter';

class CommentContainer extends PureComponent{
	
	goToProfileScreen = () => (
		this.props.goToProfileScreen(this.props.comment.user)
	)
	
	render(){
		const {user, comment, date, commentId} = this.props.comment;
		return(

			<TouchableOpacity onPress={this.goToProfileScreen} style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 1, flexDirection: 'row', padding: 5, backgroundColor: '#D4E6F3', borderWidth: 1, borderColor: 'gray'}}>
					<View style={{flex: 0.90}}>
						<Text><Text style={{fontWeight: 'bold'}}>{user} </Text><Text>{comment}</Text></Text>
					</View>
					<View style={{flex: 0.10, alignItems: 'flex-end'}}><Text>{convertDate(date)}</Text></View>
				</View>
			</TouchableOpacity>

		);
	}
}

export default CommentContainer;