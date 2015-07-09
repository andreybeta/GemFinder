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


class GemInfo extends Component{

  constructor(props){
    super(props);
    this.state = {showProgress : false};

  }

  render(){
  	return(
	  	<View style={styles.container} >
  	  	<Text>Gem Info</Text>

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          color={'#808080'}
          size={'small'} />

      </View>
  	);
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

module.exports = GemInfo;