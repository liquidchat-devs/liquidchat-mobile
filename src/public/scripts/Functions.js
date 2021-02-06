import React from 'react';
import { formatMessage } from './MessageFormatter';
import { formatDate } from './DateFormatter';
import { Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

export default class Functions {
    constructor(_main) {
        this.mainClass = _main;
    }

    setFirstChannel = (_e, _channelID) => {
        this.mainClass.setState({
            firstChannel: _channelID,
            firstChannelElement: _e,
        }, () => {
            this.mainClass.state.firstChannelElement.click();
        });
    }

    switchChannel = (_channelID) => {
        this.mainClass.setState({
            previousChannel: this.mainClass.state.currentChannel,
            currentChannel: _channelID
        });

        let channel = this.mainClass.state.channels.get(_channelID)
        if(channel === undefined) { return; }

        switch(channel.type) {
            case 1:
                this.mainClass.state.API.endpoints["joinVoiceChannel"]({ id: channel.id })
                break;

            default:
                break;
        }
    }

    switchFormState = () => {
        this.mainClass.setState({
            formState: this.mainClass.state.formState === 0 ? 1 : 0,
        });
    }

    switchDialogState = (id) => {
        console.log("Switching dialog state from " + this.mainClass.state.dialogState + " > " + id);

        this.mainClass.setState({
            dialogState: id
        });
    }

    switchChannelTypes = (id) => {
        this.mainClass.setState({
            channelTypes: id,
            selectedServer: -1,
        });

        this.switchChannel(-1);
    }

    setSelectedMessage = (message) => {
        this.mainClass.setState({
            selectedMessage: message
        });
    }

    startEditingMessage = (message) => {
        this.mainClass.setState({
            editingMessage: message
        });
    }

    endEditingMessage = () => {
        this.mainClass.setState({
            editingMessage: -1
        });
    }

    setEditedMessage = val => {
        this.mainClass.setState({
            editedMessage: val
        });
    }

    setSelectedImage = val => {
        this.mainClass.setState({
            selectedImage: val
        });
    }

    setSelectedServer = val => {
        if(this.mainClass.state.selectedServer !== val) { this.switchChannel(-1); }
        this.mainClass.setState({
            channelTypes: 2,
            selectedServer: val
        });
    }

    setSelectedChannel =  (channel) => {
        this.mainClass.setState({
            selectedChannel: channel
        });
    }

    setSelectedAvatar =  (avatar) => {
        this.mainClass.setState({
            selectedAvatar: avatar
        });
    }

    setSelectedBanner =  (banner) => {
        this.mainClass.setState({
            selectedBanner: banner
        });
    }

    setBox = (x, y) => {
        this.mainClass.setState({
            boxX: x,
            boxY: y
        });
    }

    setSelectedUser = (user) => {
        this.mainClass.setState({
            selectedUser: user
        });
    }

    setSearchedTerm = (term) => {
        this.mainClass.setState({
            searchedTerm: term
        });
    }

    setSearches = (searches) => {
        this.mainClass.setState({
            searches: searches
        });
    }

    moveChannel = (channels, oldIndex, newIndex) => {
        //Sort the channels
        channels.splice(newIndex, 0, channels.splice(oldIndex, 1)[0]);
        channels.forEach((c, index) => {
            c.position = index;
            this.mainClass.state.API.endpoints["editChannel"]({
                id: c.id,
                position: index
            });
        });
    }

    getUser = (id) => {
        return this.mainClass.state.users.get(id);
    }

    getChannel = (id) => {
        return this.mainClass.state.channels.get(id);
    }

    getServer = (id) => {
        return this.mainClass.state.servers.get(id);
    }

    getOwnServers = () => {
        let servers = new Map();
        this.mainClass.state.servers.forEach(server => {
          if(server.members.includes(this.mainClass.state.session.userID)) {
            servers.set(server.id, server);
          }
        })
    
        return servers;
    }

    isInChannel = () => {
        let server = this.getServer(this.mainClass.state.selectedServer)
        let channel = this.getChannel(this.mainClass.state.currentChannel)
        return !(channel === undefined || (server !== undefined && server.channels.includes(channel.id) === false) || (channel.type !== 2 && server === undefined) || channel.type === 1);
    }

    isInServer = (id) => {
        return this.getOwnServers().has(id);
    }

    copyID = (id) => {
        navigator.clipboard.writeText(id);
        this.mainClass.setState({
          copiedID: id
        }, () => { this.switchDialogState(3); });
    };

    getFormattedMessage(chat, message) {
        let server = this.mainClass.state.functions.getServer(this.mainClass.state.selectedServer)

        switch(message.type) {
            case 0:
              const user = this.mainClass.state.functions.getUser(message.author.id);
              return <View style={chat.props.styles.messageObject}>
                <Image style={chat.props.styles.messageAvatar} source={{ uri: this.mainClass.state.fileEndpoint + "/" + user.avatar }}/>
                <View style={chat.props.styles.messageWrapper}>
                  <View style={chat.props.styles.messageData}>
                    <Text style={chat.props.styles.messageUsername}>
                      {user !== undefined ? user.username : "Loading"}
                    </Text>
                    <Text style={chat.props.styles.messageDate}>
                      {formatDate(message.createdAt)}
                    </Text>
                  </View>
                  <View style={chat.props.styles.messageContentWrapepr}>
                    {formatMessage(chat, message)}
                  </View>
                </View>
              </View>
    
            case 1:
            case 2:
            case 3:
              return <div className="flex marginleft2 fullwidth">
                <div className="marginleft2 alignmiddle">
                  <img alt="" className="messageIcon" src={this.mainClass.state.fileEndpoint + "/" + (message.type === 1 || message.type === 3 ? "join.svg" : "leave.svg")}/>
                </div>
                <div className="marginleft2 fullwidth">
                  <div className="flex">
                    <div className="allignMiddle margintop1a" style={{fontSize: 10, color: "#acacac"}}>
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                  <div className="flex fullwidth">
                    {message.id === this.mainClass.state.editingMessage.id ?
                    <div className="fullwidth">
                        <form onSubmit={this.handleEdit} className="full fullwidth">
                          <input className="input-message chatColor" type="text" value={this.mainClass.state.editedMessage} required={true} onChange={(e) => { this.mainClass.state.functions.setEditedMessage(e.target.value) }}/>
                        </form>
                      </div>
                    : formatMessage(chat, message)
                    }
                  </div>
                </div>
              </div>

            default:
                return null
        }
    }

}