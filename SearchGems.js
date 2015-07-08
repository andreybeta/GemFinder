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

var SearchResults = require('./SearchResults');

class SearchGems extends Component{

  constructor(props){
    super(props);
    this.state = {showProgress : false};

  }

  render(){
  	return(
	  	<View style={styles.container} >
	  		<Text>GemFinder</Text>
	  		<TextInput style = {styles.inputs} placeholder='Search gems..'
          onChangeText={ (text)=>this.setState({term: text}) } 
        ></TextInput>
	  		<TouchableHighlight
          style={styles.searchButton}
          onPress = {this.onSearchPressed.bind(this)}
          >
	  			<Text style={styles.buttonLabel}>Search</Text>
	  		</TouchableHighlight>
        
        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />
        <SearchResults />
	  	</View>
  	);
  }
  onSearchPressed(){
    console.log('Search term: ' + this.state.term);
    this.setState({showProgress : true});
    fetch('http://rubygems.org/api/v1/activity/latest.json')
      .then((response) =>  {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        this.setState({showProgress : false});


      })
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  inputs: {
  	height: 36,
  	borderWidth: 1,
  	borderColor: '#999',
  	padding: 10,  	
  },

  searchButton: {
  	height: 36,
  	backgroundColor: '#D66',
  	justifyContent: 'center',
    padding: 10
  },

  buttonLabel:{
  	color: 'white'    
  }
});

module.exports = SearchGems;