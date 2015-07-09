'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight,
  Image,
} = React;

var GemInfo = require('./GemInfo');

class SearchResults extends Component{
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource : ds.cloneWithRows(this.props.results || ['sin datos'])
    };
  }

  componentDidMount(){
    console.log('mount' );
  }

  renderRow(row){
    if(row.name){
      var info = row.info.length>100 ? row.info.substring(1, 100) + '...': row.info;
      return (
        <TouchableHighlight
          underlayColor='#e9573f'
          style={styles.row}
          onPress = {()=>this.onItemPressed(row)}>
          <View style={styles.rowWrap}>
            <Image style={styles.rowImage} source={{uri: 'https://rubygems.org/favicon.ico'}}/>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>{row.name}</Text>
              <Text style={styles.rowInfo}>{info}</Text>
              <Text style={styles.rowDownloads}>{row.downloads} downloads</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }else{
      return <View/>
    }
  }

  render(){
    //console.log('results', this.state.results);
  	return(
	  	<View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
	  	</View>
  	);
  }

  onItemPressed(gemInfo){
    this.props.navigator.push({
      title: gemInfo.name,
      component: GemInfo,
      passProps: { gemInfo: gemInfo },
    });
    //console.log(gemInfo);
  }

  setResults(results){
    //console.log('set results', results);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(results)
    });
  }
}


var styles = StyleSheet.create({
  container:{

  },
  row:{
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    padding: 5,
    borderRadius: 4
  },
  rowWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  rowInfo:{
    flex: 4,
  },
  rowTitle:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowDownloads:{
    textAlign: 'left',
    alignSelf: 'flex-end'
  },
  rowImage:{
    width: 32,
    height: 32,
    marginRight: 10,
  }

});

module.exports = SearchResults;