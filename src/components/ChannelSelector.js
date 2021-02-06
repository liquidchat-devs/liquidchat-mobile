import React, { Component } from 'react';
import { List } from 'react-movable';
import { Text, View, TextInput, Image } from 'react-native';
import { LcButton } from '../CustomElements.js';

export default class ChannelSelector extends Component {
  componentDidUpdate() {
    if(this.firstChannel !== this.previousFirstChannel && this.refs.firstChannelElement !== undefined) {
      this.props.functions.setFirstChannel(this.refs.firstChannelElement, this.firstChannel)
    }
  }

  acceptFriendRequest(id) {
    this.props.API.endpoints["acceptFriendRequest"]({ id: id });
  }

  declineFriendRequest(id) {
    this.props.API.endpoints["declineFriendRequest"]({ id: id });
  }

  render() {
    return null;
  }
}