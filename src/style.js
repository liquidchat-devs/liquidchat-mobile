import { StyleSheet } from "react-native"

export default StyleSheet.create({
    App: {
        width: "100%",
        height: "100%"
    },

    bg: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    full: {
        width: "100%",
        height: "100%"
    },

    fullwidth: {
        width: "100%"
    },

    notch: {
        height: 55,
        backgroundColor: "#232323",
    },

    aligncenter: {
        display: "flex",
        alignItems: "center"
    },

    loginSection1: {
        display: "flex",
        flexDirection: "row",
        width: "60%",
        height: 48,
        marginTop: 10
    },

    loginAvatarWrapper: {
        width: 48,
        height: "100%",
        backgroundColor: "#333",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    loginAvatar: {
        width: "80%",
        height: "80%",
        borderRadius: 25,
    },

    loginPanel: {
        backgroundColor: "#333",
        width: "80%",
        height: "100%",
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },

    loginTextWrapper: {
        height: "100%",
        width: "100%",
        marginLeft: -13,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    loginText: {
        color: "#ffffff",
        fontSize: 16
    },

    loginInputfield: {
        width: "80%",
        height: 42,
        backgroundColor: "#333",
        borderRadius: 15,
        padding: 10,
        color: "#ffffff"
    },

    margintop5: {
        marginTop: 5
    },

    margintop10: {
        marginTop: 10
    },

    margintop20: {
        marginTop: 20
    },

    loginButton: {
        width: "60%",
        height: 42
    },

    lcButton: {
        backgroundColor: "#333333",
        borderRadius: 25,
        height: 42,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    lcButtonText: {
        color: "#6767ff",
        fontSize: 15
    },

    lcMenuButton: {
        backgroundColor: "#333333",
        height: 42,
        width: 42,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    lcMenuButtonText: {
        color: "#6767ff",
        fontSize: 15
    },

    link: {
        color: "#6767ff",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#6767ff"
    },

    errorColor: {
        color: "#ff6161"
    },

    successColor: {
        color: "#56e456"
    },

    channelHeader: {
        width: "100%",
        height: 48,
        backgroundColor: "#333333",

        display: "flex",
        flexDirection: "row"
    },

    menuButton: {

    },

    chatWrapper: {
        backgroundColor: "#3c3c3c",
        width: "100%",
        height: "100%"
    },

    chatContainer: {
        width: "100%",
        height: "85%"
    },

    messagesWrapper: {
        width: "100%",
        height: "92%"
    },

    sendWrapper: {
        backgroundColor: "#333333",
        width: "100%",
        height: "8%"
    },

    channelNameText: {
        color: "#ffffff",
        fontSize: 15
    },

    mainView: {
        width: 700,
        height: "100%",

        display: "flex",
        flexDirection: "row"
    },

    mainContainer: {
        width: 700,
        height: "100%",

        display: "flex",
        flexDirection: "row"
    },

    mainContainerContent: {

    },

    mainScrollVoid: {
        width: 300,
        height: "100%",

        backgroundColor: "transparent"
    },

    mainScreenWrapper: {
        width: 700,
        height: "100%",

        backgroundColor: "#ffff00"
    },

    leftMenu: {
        width: 300,
        height: "100%",

        backgroundColor: "#3c3c3c",
        display: "flex",
        flexDirection: "row"
    },

    leftMenuAbsolute: {
        position: "absolute",
        width: 300,
        height: "100%",

        backgroundColor: "#3c3c3c",
        display: "flex",
        flexDirection: "row"
    },

    serversList: {
        height: "100%",
        width: "20%",

        backgroundColor: "#333333",
        display: "flex",
        alignItems: "center",
        padding: 10
    },

    channelsList: {
        height: "100%",
        width: "80%",
        padding: 5,

        backgroundColor: "#3c3c3c"
    },

    sendInputfield: {
        width: "100%",
        height: "100%",
        padding: 10
    },

    lcServerButton: {
        width: 42,
        height: 42,
        backgroundColor: "#3c3c3c",
        borderRadius: 15,
        marginBottom: 10,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    serverIcon: {
        width: "100%",
        height: "100%",
        borderRadius: 15
    },

    serverIcon2: {
        width: "60%",
        height: "60%",
        borderRadius: 15
    },

    channel: {
        width: "100%",
        height: 42,

        backgroundColor: "#333333",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 6
    },

    dmChannel: {
        width: "100%",
        height: 42,

        backgroundColor: "#333333",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 6
    },

    selectedColor: {

    },

    channelSign: {
        color: "#b8b8b8",
        fontSize: 18,
        marginLeft: 10
    },

    channelName: {
        color: "#ffffff",
        fontSize: 14,
        marginLeft: 5 
    },

    noChannelWrapper: {

    },

    noChannelText: {

    },

    message: {
        width: "100%",
        height: 52
    },

    messageText: {
        fontSize: 14,
        color: "#ffffff"
    },

    messageContent: {
        width: "100%",
        height: "100%"
    },

    messagesWrapper: {
        width: "100%",
        height: "100%"
    },

    messagesWrapperContainer: {
        width: "100%",
        height: "100%"
    },

    messageContentWrapper: {
        width: "100%",
        height: "100%"
    },

    messageObject: {
        display: "flex",
        flexDirection: "row"
    },

    messageData: {
        display: "flex",
        flexDirection: "row"
    },

    messageUsername: {
        fontSize: 15,
        color: "#ecf542",
        alignSelf: "flex-start"
    },

    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 10,
        marginLeft: 5
    },

    messageDate: {
        fontSize: 10,
        color: "#ffffff",
        alignSelf: "flex-start"
    }
})