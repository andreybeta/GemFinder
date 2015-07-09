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
  ActivityIndicatorIOS,
  Image

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
        <Image style={styles.image} source={require('image!ruby3')}/>
        <Text style={styles.title}>{this.state.gemInfo.name}</Text>
        <Text style={styles.description}>{this.state.gemInfo.info}</Text>
        <Text style={styles.downloads}>{this.state.gemInfo.downloads} downloads</Text>


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
  title:{
    fontSize: 18,
    color: '#e9573f',
    fontWeight: '600'
  },
  image:{
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  downloads:{
    textAlign: 'left',
    alignSelf: 'flex-end',
    fontWeight: '600'
  }
});

module.exports = GemInfo;