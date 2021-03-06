import React, { Component } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { LcButton } from '../CustomElements.js';

export default class LoginForm extends Component {
    state = {
      username: "",
      password: "",
      clicked: false,
      loginResult: 0
    };
  
    componentDidMount = async() => {
      const res = await this.props.API.endpoints["login"]({ username: this.state.username, password: this.state.password, authType: "autologin" });
      this.setState({
        loginResult: res,
      });
    }
  
    handleChange = (name, value) => {
      this.setState({
        [name]: value,
      });
    }
  
    handleSubmit = async e => {
      e.preventDefault();
      const res = await this.props.API.endpoints["login"]({ username: this.state.username, password: this.state.password, authType: "default" });
      this.setState({
        loginResult: res,
      });
    }
  
    getErrorText(code) {
      switch(code) {
        case -3:
          return "Session expired-";
  
        case -2:
          return "User not found-";
        
        case -1:
          return "Invalid password-";
  
        case 0:
        default:
          return "";
      }
    }
  
    getSuccessText(code) {
      const user = this.props.functions.getUser(this.props.state.session.userID)
      switch(code) {
        case 0:
        case -3:
        case -2:
        case -1:
          return "";
  
        default:
          return "Logging in as " + (user !== undefined ? user.username : "Loading") + "...";
      }
    }
  
    render() {
        const form = (
        <View style={[this.props.styles.fullwidth, this.props.styles.aligncenter]}>
            <TextInput style={[this.props.styles.loginInputfield, this.props.styles.margintop20]} autoComplete="username" placeholder="Username..." onChangeText={(value) => { this.handleChange("username", value) }} />
            <TextInput secureTextEntry={true} style={[this.props.styles.loginInputfield, this.props.styles.margintop5]} autoComplete="password" placeholder="Password..." onChangeText={(value) => { this.handleChange("password", value)}} />
        </View>
        );

        return (
        <View style={this.props.styles.full}>
          <Image source={require("../../assets/bg.png")} style={this.props.styles.bg} />
          <View style={this.props.styles.full}>
            <View style={[this.props.styles.full, this.props.styles.aligncenter]}>
                <View style={this.props.styles.loginSection1}>
                    <View style={this.props.styles.loginAvatarWrapper}>
                      <Image alt="" style={this.props.styles.loginAvatar} source={require("../../assets/defaultAvatar.png")}/>
                    </View>
                    <View style={this.props.styles.loginPanel}>
                      <View style={this.props.styles.loginTextWrapper}>
                        <Text style={this.props.styles.loginText}>Login</Text>
                      </View>
                    </View>
                </View>
                {form}
                <View style={[this.props.styles.fullwidth, this.props.styles.aligncenter, this.props.styles.margintop20]}>
                  <View style={this.props.styles.loginButton}>
                    <LcButton title="Login!" onPress={this.handleSubmit} />
                  </View>
                </View>
                <Text style={[this.props.styles.margintop20, this.props.styles.link]} onPress={() => { this.props.functions.switchFormState(); }}>Register?</Text>
                {
                    (this.getErrorText(this.state.loginResult).length > 0 ?
                    <Text style={[this.props.styles.margintop10, this.props.styles.errorColor]}>
                    {this.getErrorText(this.state.loginResult)}
                    </Text>
                    : (this.getSuccessText(this.state.loginResult).length > 0 ?
                    <Text style={[this.props.styles.margintop10, this.props.styles.successColor]}>
                    {this.getSuccessText(this.state.loginResult)}
                    </Text>
                    :
                    null))
                }
            </View>
          </View>
        </View>
        );
    }
}