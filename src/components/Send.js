import React, { Component } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { LcButton } from '../Components.js';

export default class Send extends React.Component {
  state = {
    message: "",
    currentEmotes: [],
    currentEmoteIndex: 0,
    currentMentions: [],
    currentMentionIndex: 0
  };

  handleChange = e => {
    let message = e.target.value;
    let server = this.props.functions.getServer(this.props.state.selectedServer)
    let channel = this.props.functions.getChannel(this.props.state.currentChannel)
    let members = server !== undefined ? server.members : channel.members;
    members = members.reduce((acc, curr) => { acc.push(this.props.functions.getUser(curr)); return acc; }, [])

    let a0 = message.lastIndexOf(":");
    let a = message.substring(a0 > -1 ? a0 + 1 : message.length)
    let possibleEmotes = Array.from(this.props.state.emotes.values()).filter(e => { return (e.author.id === this.props.state.session.userID || (e.server !== undefined && this.props.functions.isInServer(e.server.id))) && a.length > 0 && e.name.startsWith(a); }).sort((a, b) => { return a.name.length - b.name.length; }).slice(0, 4)
    let b0 = message.lastIndexOf("@");
    let b = message.substring(b0 > -1 ? b0 + 1 : message.length)
    let possibleMentions = members.filter(e => { return b.length > 0 && e.username.startsWith(b); }).sort((a, b) => { return a.username.length - b.username.length; }).slice(0, 4)

    this.props.API.API_typingIndicator(channel.id);
    this.setState({
      message: message,
      currentEmotes: possibleEmotes,
      currentEmoteIndex: this.state.currentEmoteIndex >= possibleEmotes.length ? (possibleEmotes.length === 0 ? 0 : possibleEmotes.length - 1) : this.state.currentEmoteIndex,
      currentMentions: possibleMentions,
      currentMentionIndex: this.state.currentMentionIndex >= possibleMentions.length ? (possibleMentions.length === 0 ? 0 : possibleMentions.length - 1) : this.state.currentMentionIndex
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    if(this.state.currentEmotes[this.state.currentEmoteIndex] !== undefined) {
      let b = this.state.message.substring(0, this.state.message.lastIndexOf(":"))
      this.handleChange({ target: { value: b + "<:" + this.state.currentEmotes[this.state.currentEmoteIndex].id + ":>" }})
    } else if(this.state.currentMentions[this.state.currentMentionIndex] !== undefined) {
      let b = this.state.message.substring(0, this.state.message.lastIndexOf("@"))
      this.handleChange({ target: { value: b + "<@" + this.state.currentMentions[this.state.currentMentionIndex].id + ">" }})
    } else if(this.state.message.length > 0) {
      this.handleChange({ target: { value: "" }})
      if(await this.props.API.API_sendWebsocketMessage(this.props.state.currentChannel, this.state.message)) {
        this.setState({
          message: "",
        });
      }
    }
  }

  handleFile = async e => {
    if(e.target.files.length < 1) { return; }
    
    var file = e.target.files[0];
    e.target.value = ""
    if(await this.props.API.endpoints["sendFile"](file, {}, { text: this.state.message, "channel.id": this.props.state.currentChannel })) {
      this.setState({
        message: "",
      });
    }
  }

  render() {
    return <View style={this.props.styles.sendWrapper}>
      <TextInput placeholder="Send message..." style={this.props.styles.sendInputfield} />
    </View>;
  }
}