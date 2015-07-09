'use strict';

var React = require('react-native');
var Config = require('./Config');

var {
  StyleSheet,
  Text,
  View,
  Component,
  ActivityIndicatorIOS
} = React;

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
Parse.initialize(Config.ParseKey, Config.ParseAppKey);


var SearchResults = require('./SearchResults');

class Favorites extends Component{

  constructor(props){
    super(props);
    this.state = {showProgress : true};
  }

  componentDidMount(){
    this.fetchFavorites();
    console.log('navigator', this.props.navigator);
  }

  render(){
    return(
      <View style={styles.container} >
        <Text>Favorites</Text>

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />

        <SearchResults style={styles.results}  ref='results' navigator={this.props.navigator} />
      </View>
    );
  }

  fetchFavorites(){
    this.setState({showProgress : true});
    var query = new Parse.Query('Favorites'); //.ascending('createdAt');
    query.find({
      success: function(data){
        console.log(data)
        var results = data.map(function(el){return el.toJSON()})
        this.refs.results.setResults(results);
        this.setState({showProgress : false});
      }.bind(this),
      error: function(e){

      }
    });


    //this.refs.results.setResults(results);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },

});

module.exports = Favorites;