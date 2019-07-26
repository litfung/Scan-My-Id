import React, {Component} from "react";
import {StyleSheet, Text, Image, View, Button} from "react-native";
import {w, h, totalSize} from './Dimensions';

const companyLogo = require('./logo.jpeg');
export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.icon} resizeMode="contain" source={companyLogo}/>
                <Text style={styles.text}>QR Code Scanner</Text>
                <Button
                    title={"Scan QRCode"}
                    onPress={() => this.props.navigation.navigate("QRCodeScannerScreen")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    text: {
        fontSize: 28,
        textAlign: "center",
        marginLeft: 10,
        marginRight: 10
    },
    icon: {
        width: w(70),
        height: h(30),
        marginTop: h(10),
        marginBottom: h(7),
    }
});
