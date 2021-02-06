import React, { Component } from 'react';
import { formatBytes } from '../public/scripts/SizeFormatter';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import { LcButton } from '../Components.js';
import Send from './Send';

export default class Chat extends Component {
  componentDidMount = async() => {
    this.setVideoRef = (element, type) => {
      this["video" + type] = element;
    };
    
    await this.props.API.endpoints["fetchFriendRequests"]({});
    await this.props.API.endpoints["fetchServers"]({});
    await this.props.API.endpoints["fetchDMChannels"]({});
  }

  handleEdit = async e => {
    e.preventDefault();

    const res = await this.props.API.endpoints["editMessage"]({ id: this.props.state.editingMessage.id, text: this.props.state.editedMessage })
    if(res === 1) {
      this.props.setEditedMesage("");
    }

    this.props.functions.endEditingMessage();
  }

  isFullScreen() {
    return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  }

  videoAction(element, file, action) {
    switch(action) {
      case "playpause":
        if (element.paused || element.ended) {
          element.play();
          if(this.refs["videoOverlay-" + file.name] !== undefined) {
            this.refs["videoOverlay-" + file.name].classList.remove("stopped");
            this.refs["videoOverlay-" + file.name].classList.add("playing");
          }

          this.refs["playButtonWrapper-" + file.name].innerHTML  = `<svg aria-hidden="false" width="22" height="22" viewBox="0 0 22 22"><path fill="currentColor" d="M0,14 L4,14 L4,0 L0,0 L0,14 L0,14 Z M8,0 L8,14 L12,14 L12,0 L8,0 L8,0 Z" transform="translate(6 5)"></path></svg>`;
        } else {
          element.pause();
          if(this.refs["videoOverlay-" + file.name] !== undefined) {
            this.refs["videoOverlay-" + file.name].classList.add("stopped");
            this.refs["videoOverlay-" + file.name].classList.remove("playing");
          }

          this.refs["playButtonWrapper-" + file.name].innerHTML  = `<svg aria-hidden="false" width="22" height="22" viewBox="0 0 22 22"><polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon></svg>`;
        }
        break;

      case "pause":
        element.pause();
        if(this.refs["videoOverlay-" + file.name] !== undefined) {
          this.refs["videoOverlay-" + file.name].classList.add("stopped");
          this.refs["videoOverlay-" + file.name].classList.remove("playing");
        }

        this.refs["playButtonWrapper-" + file.name].innerHTML  = `<svg aria-hidden="false" width="22" height="22" viewBox="0 0 22 22"><polygon fill="currentColor" points="0 0 0 14 11 7" transform="translate(7 5)"></polygon></svg>`;
        break;

      case "fullscreen":
        if (this.isFullScreen()) {
          if (document.exitFullscreen) document.exitFullscreen();
          else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
          else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
          else if (document.msExitFullscreen) document.msExitFullscreen();
        } else {
            if (element.requestFullscreen) element.requestFullscreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullScreen) element.webkitRequestFullScreen();
            else if (element.msRequestFullscreen) element.msRequestFullscreen();
        }
        break;

      default:
        break;
    }
  }

  getUploadMessage(fileID, fileName, bytes1, bytes2, failed) {
    var text = ""
    if(fileName === -1 || bytes1 === bytes2) {
      text = ""
    } else if(failed) {
      text = "Upload of " + fileName + " failed (" + formatBytes(bytes1) + "/100MB)-"
    } else {
      text = "Uploading " + fileName + "... " + formatBytes(bytes1) + "/" + formatBytes(bytes2, true) + " (" + this.formatPercentage(bytes1, bytes2) + ")"
    }

    return text.length < 1 ? null : <div className="paddingtop2 paddingbot2 flex message">
      <div className="flex marginleft2">
        <div className="marginleft2 file-wrapper chatColor">
            <div className="white">{text}</div>
        </div>
      </div>
    </div>
  }

  formatPercentage(in1, in2) {
    if(in1 === 0 || in2 === 0) { return "0%" }
    return Math.round((in1 / in2) * 100) + "%"
  }

  render() {
    let server = this.props.functions.getServer(this.props.state.selectedServer)
    let channel = this.props.functions.getChannel(this.props.state.currentChannel)
    if(this.props.functions.isInChannel() === false) {
      return (
        <View style={this.props.styles.noChannelWrapper}>
          <Text style={this.props.styles.noChannelText}> No Channel Selected</Text>
        </View>
      );
    }

    let messages = channel.messages === undefined ? [] : channel.messages;
    let messageList = -1;
    messageList = messages.map((message, i) => {
      let messageHTML = this.props.functions.getFormattedMessage(this, message);
      return (
        <View key={i} style={this.props.styles.message}>
          {messageHTML}
        </View>
      )
    });

    return <View style={this.props.styles.chatContainer}>
      <ScrollView style={this.props.styles.messagesWrapper} contentContainerStyle={this.props.styles.messagesWrapperContainer}>
       {messageList}
      </ScrollView>
      <Send state={this.props.state} const={this.props.state.const} API={this.props.state.API} elements={this.props.state.elements} functions={this.props.state.functions} styles={this.props.styles} />
    </View>;
  }
}