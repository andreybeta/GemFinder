'use strict';

var React = require('react-native');
var Config = require('./Config');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS

} = React;

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
Parse.initialize(Config.ParseKey, Config.ParseAppKey);

class GemInfo extends Component{

  constructor(props){
    super(props);
    this.state = {
      showProgress : false,
      gemInfo : this.props.gemInfo
    };

  }

  render(){
  	return(
	  	<View style={styles.container} >
        <Text>{this.state.gemInfo.name}</Text>
  	  	<Text>{this.state.gemInfo.info}</Text>

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />

        <TouchableHighlight
            style={styles.saveButton}
            onPress = {this.onSavePressed.bind(this)}
            >
          <Text style={styles.buttonLabel}>Save</Text>
        </TouchableHighlight>

      </View>
  	);
  }
  onSavePressed(){
    var gemInfo = this.state.gemInfo;

    var FavoritesObject = Parse.Object.extend("Favorites");
    var fObject = new FavoritesObject();
    fObject.save(
      {
        name: gemInfo.name,
        info: gemInfo.info,
        downloads: gemInfo.downloads
      })
    .then(function(object) {
      alert("Guardado en favoritos");
    });

  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  saveButton: {
    height: 36,
    backgroundColor: '#e9573f',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',

    borderRadius: 8
  },
  buttonLabel:{
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = GemInfo;