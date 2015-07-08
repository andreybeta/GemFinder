'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  Component,
  TouchableHighlight
} = React;

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
        <TouchableHighlight  underlayColor='#e9573f' style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>{row.name}</Text>
            <Text style={styles.rowInfo}>{info}</Text>
            <Text style={styles.rowDownloads}>{row.downloads} downloads</Text>
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

  setResults(results){
    console.log('set results', results);

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
  rowTitle:{
    fontSize: 16,
    fontWeight: 'bold'

  },
  rowDownloads:{
    textAlign: 'left',
    alignSelf: 'flex-end'
  }

});

module.exports = SearchResults;