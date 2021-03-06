'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var MostRecent = require('./MostRecent');
var SearchGems = require('./SearchGems');
var Favorites = require('./Favorites');
var GemInfo = require('./GemInfo');

var Main = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    return {
      selectedTab: 'most-recent',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        >
        <TabBarIOS.Item
          title="Recents"
          systemIcon="most-recent"
          selected={this.state.selectedTab === 'most-recent'}
          onPress={() => {
            this.setState({
              selectedTab: 'most-recent',
            });
          }}>
          <MostRecent navigator = {this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Search"
          systemIcon="search"
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          <SearchGems navigator = {this.props.navigator}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="favorites"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            //this.refs.favorites.fetchFavorites();
            this.setState({
              selectedTab: 'favorites',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <Favorites ref='favorites' navigator = {this.props.navigator} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            this.setState({
              selectedTab: 'more',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'more')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 10,
  },
  label: {
    color: '#CCC',
    margin: 2,
  }
});

module.exports = Main;