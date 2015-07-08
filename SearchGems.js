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
        <View style={styles.groupContainer}>
  	  		<TextInput style = {styles.searchInput} placeholder='Search gems..'
            onChangeText={ (text)=>this.setState({term: text}) }
          ></TextInput>
  	  		<TouchableHighlight
            style={styles.searchButton}
            onPress = {this.onSearchPressed.bind(this)}
            >
  	  			<Text style={styles.buttonLabel}>Search</Text>
  	  		</TouchableHighlight>
        </View>
        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />
        <SearchResults style={styles.results}  ref='results' results={this.state.results}/>
      </View>
  	);
  }

  onSearchPressed(){
    console.log('Search term: ' + this.state.term);
    this.setState({showProgress : true});
    fetch('http://rubygems.org/api/v1/search.json?query=' + this.state.term)
      .then((response) =>  {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        this.setState({
          showProgress : false,
        });

        this.refs.results.setResults(results);


      })
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },

  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  searchInput: {
  	height: 36,
  	borderWidth: 1,
  	borderColor: '#999',
  	padding: 4,
    flex: 4,
    borderRadius: 8,
    marginRight: 5,
  },

  searchButton: {
    height: 36,
    backgroundColor: '#D66',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 8
  },

  buttonLabel:{
  	fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },

  results:{
    borderWidth: 1,
  }
});

module.exports = SearchGems;