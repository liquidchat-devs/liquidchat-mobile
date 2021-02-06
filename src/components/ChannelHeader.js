import React, { Component } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { LcButton, LcMenuButton } from '../CustomElements.js';

export default class ChannelHeader extends Component {
  state = {
    searchResult: -1,
    searches: -1,
    searchTerm: ""
  }

  handleChange = e => {
    let term = e.target.value;
    this.setState({
      searchTerm: term
    })
  }

  handleSubmit = async e => {
    e.preventDefault();

    var res = await this.props.API.endpoints["searchMessages"]({ id: this.props.state.currentChannel, filters: { term: this.state.searchTerm }});
    if(isNaN(res) || res.length === 0) {
      this.props.functions.setSearches(res);
      this.props.functions.setSearchedTerm(this.state.searchTerm);
    } else {
      this.setState({
        searchResult: res,
      });
    }
  }

  render() {
    let server = this.props.functions.getServer(this.props.state.selectedServer)
    let channel = this.props.functions.getChannel(this.props.state.currentChannel)
    if(channel === undefined || (server !== undefined && server.channels.includes(channel.id) === false) || (channel.type !== 2 && server === undefined)) {
      return null;
    }

    let tip = -1;
    let messages = -1;
    switch(channel.type) {
      case 0:
      case 2:
        messages = channel.messages === undefined ? [] : channel.messages;
        tip = "#" + channel.name + " (" + messages.length + ")";
        break;

      case 1:
        tip = "." + channel.name + " " + (this.props.state.currentVoiceGroup !== -1 ? this.props.state.currentVoiceGroup.users.length : "Connecting...");
        break;

      default:
        break;
    }

    return <View style={this.props.styles.channelHeader}>
      <LcMenuButton title="-" onPress={this.props.scrollToChannels} />
      <Text style={this.props.styles.channelNameText}>{tip}</Text>
    </View>;
  }
}