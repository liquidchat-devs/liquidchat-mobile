import React, { Component } from 'react';
import { Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LcButton, LcServerButton, LcServerIconButton } from '../CustomElements.js';
import * as c from './index';

export default class MainView extends Component {
  state = {
    openedLeftMenu: true
  }

  constructor(props) {
    super(props);

    this.mainScroll = React.createRef();
  }

  componentDidMount() {
    this.scrollToChat();
  }

  scrollToChannels() {
    console.log("scrollchannels");
    this.mainScroll.current.scrollTo({ x: 0, y: 0 });
  }

  scrollToChat() {
    console.log("scrollchat");
    this.mainScroll.current.scrollTo({ x: 300, y: 0 });
  }

  handleScroll = function(e) {
    this.setState({
      openedLeftMenu: e.nativeEvent.contentOffset.x == 0
    })
  }.bind(this);

  render() {
    return (
        <View style={this.props.styles.mainView} pointerEvents={"box-none"}>
            {this.getLeftMenu(true)}
            <ScrollView onScroll={this.handleScroll} ref={this.mainScroll} style={this.props.styles.mainContainer} contentContainerStyle={this.props.styles.mainContainerContent} scrollEnabled={true} horizontal={true} >
                {this.state.openedLeftMenu ?
                this.getLeftMenu() : <View style={this.props.styles.mainScrollVoid}></View>}
                <View style={this.props.styles.mainScreenWrapper}>
                    <View style={this.props.styles.chatWrapper}>
                        <c.ChannelHeader scrollToChannels={this.scrollToChannels} state={this.props.state} const={this.props.const} API={this.props.API} elements={this.props.elements} functions={this.props.functions} styles={this.props.styles} />
                        <c.Chat state={this.props.state} const={this.props.const} API={this.props.API} elements={this.props.elements} functions={this.props.functions} styles={this.props.styles} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
  }

  getLeftMenu(absolutePos=false) {
    let channels = Array.from(this.props.state.channels.values());
    channels = channels.filter(channel => { return ((channel.type === 0 || channel.type === 1) && this.props.state.channelTypes === 2 && channel.server.id === this.props.state.selectedServer) || (channel.type === 2 && this.props.state.channelTypes === 1); })
    channels = channels.sort((a, b) => a.position - b.position)

    let channelsList = channels.map((value, index) => {
      if(index === 0) { this.previousFirstChannel = this.firstChannel; this.firstChannel = value.id; }
      let channelName = value.name.length < 12 ? value.name : value.name.substring(0, 9) + "..."

      return (
        <TouchableOpacity onPress={() => { this.props.functions.switchChannel(value.id); }} key={index} style={this.props.state.currentChannel === value.id ? [(this.props.state.channelTypes === 2 ? this.props.styles.channel : this.props.styles.dmChannel), this.props.styles.selectedColor] : [this.props.state.channelTypes === 2 ? this.props.styles.channel : this.props.styles.dmChannel]} >
            <Text style={this.props.styles.channelSign}>#</Text>
            <Text style={this.props.styles.channelName}>{channelName}</Text>
        </TouchableOpacity>)
    });

    let servers = Array.from(this.props.state.servers.values()).map((server, i) => {
      return <LcServerButton onPress={() => { this.props.functions.setSelectedServer(server.id); }} key={server.id} uri={this.props.state.fileEndpoint + "/" + server.avatar}></LcServerButton>
    });

    return <View style={absolutePos === true ? [this.props.styles.leftMenuAbsolute] : [this.props.styles.leftMenu]}>
      <View style={this.props.styles.serversList}>
        <LcServerIconButton onPress={() => { this.props.functions.switchChannelTypes(3); }} uri={"https://qtlamkas.why-am-i-he.re/9GQLsF.png"}></LcServerIconButton>
        <LcServerIconButton onPress={() => { this.props.functions.switchChannelTypes(1); }} uri={"https://qtlamkas.why-am-i-he.re/8qn4YD.png"}></LcServerIconButton>
        {servers}
      </View>
      <View style={this.props.styles.channelsList}>
        {channelsList}
      </View>
    </View>
  }
}