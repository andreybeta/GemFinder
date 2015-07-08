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

class MostRecent extends Component{

  constructor(props){
    super(props);
    this.state = {showProgress : true};
  }
  componentDidMount(){
    this.fetchLatest();
  }

  render(){
    return(
      <View style={styles.container} >
        <Text>Most Recents</Text>

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />
        <SearchResults style={styles.results}  ref='results' />
      </View>
    );
  }

  fetchLatest(){
    this.setState({showProgress : true});
    fetch('http://rubygems.org/api/v1/activity/latest.json')
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
    marginTop: 60,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },

});

module.exports = MostRecent;