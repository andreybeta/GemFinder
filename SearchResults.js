'use strict';

var React = require('react-native');
var {
  StyleSheet,  
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
      
} = React;

class SearchResults extends Component{  
  constructor(props){
    super(props);
    this.state = {showProgress : false};

  }

  render(){
  	return(
	  	<View style={styles.container} >
	  		<Text>Results</Text>	  		
	  	</View>
  	);
  } 

}

var styles = StyleSheet.create({

});

module.exports = SearchResults;