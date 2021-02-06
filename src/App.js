import { registerRootComponent } from 'expo';
import React, { Component } from 'react';
import { Text, View, PanResponder } from 'react-native';
import styles from "./style";

import ElementBuilder from './public/scripts/ElementBuilder';
import API from './public/scripts/API';
import Functions from './public/scripts/Functions';
import Constants from './public/scripts/Constants';
import DialogManager from './Components.js';
import MainView from './components/MainView';
import * as c from './components/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    //Page size
    pageWidth: 0,
    pageHeight: 0,
    pageHeightOffset: 0,

    //Authorization
    waitingForSession: true,
    session: -1,

    //UI utilities
    formState: 0,
    dialogState: -1,
    channelTypes: 1,
    boxX: 0,
    boxY: 0,
    panResponder: -1,

    //Search
    searchedTerm: "",
    searches: -1,

    //Selected IDs
    selectedMessage: -1,
    editingMessage: -1,
    editedMessage: "",
    selectedUser: -1,
    selectedImage: -1,
    selectedChannel: -1,
    selectedServer: -1,
    selectedAvatar: -1,

    //Data
    users: new Map(),
    servers: new Map(),
    channels: new Map(),
    friendRequests: new Map(),
    invites: new Map(),
    unreadMessages: new Map(),
    emotes: new Map(),
    typingIndicators: new Map(),
    notes: new Map(),

    //Channel selector
    firstChannelElement: -1,
    firstChannel: -1,
    previousChannel: -1,
    currentChannel: -1,
    currentVoiceGroup: -1,

    //Upload/Download utils
    uploadReceived: 0,
    uploadExpected: 0,
    uploadFileID: -1,
    uploadFileName: -1,
    uploadFailed: false,
    isFileDraggingOver: false,

    //API
    API: new API(this),
    APIEndpoint: "https://nekonetwork.net:8080",
    fileEndpoint: "https://nekonetwork.net:8081",
    
    //Utils
    const: new Constants(this),
    elements: new ElementBuilder(this),
    functions: new Functions(this),
    registeredHooks: false,
    copiedID: -1
  };

  componentDidMount = () => {
    this.setState({
      registeredHooks: true
    });
  }

  render() {
    let server = this.state.functions.getServer(this.state.selectedServer)
    let channel = this.state.functions.getChannel(this.state.currentChannel)

    return (
      <View style={styles.App}>
        <View style={styles.notch} />
        {this.state.waitingForSession === false ?
          <View style={styles.full}>
            <DialogManager state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
            <MainView state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
          </View> :
        (this.state.formState === 0 ?
          <View style={styles.full}>
            <DialogManager state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
            <c.LoginForm state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
          </View> :
          <View style={styles.full}>
            <DialogManager state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
            <c.RegisterForm state={this.state} const={this.state.const} API={this.state.API} elements={this.state.elements} functions={this.state.functions} styles={styles} />
          </View>
        )}
      </View>
    )
  }
}

export default registerRootComponent(App);