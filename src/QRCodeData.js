import React, {Component} from "react";
import {StyleSheet, Image, Text, View, Button} from "react-native";
import {w, h, totalSize} from './Dimensions';

let u = ""
import axios from 'axios'

export default class QRCodeData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qrCodeData: " ",
            scanner: undefined,
            email: '',
            name: '',
            url: ""
        };
    }

// const u=this.state.url;
    componentDidMount() {
        //The code bellow will receive the props passed by QRCodeScannerScreen

        const qrCodeData = this.props.navigation.getParam("data", "No data read");
        const scanner = this.props.navigation.getParam("scanner", () => false);
        // console.warn("1", qrCodeData)
        this.setState({qrCodeData: qrCodeData, scanner: scanner});
        // console.warn("2", qrCodeData)
        this.extractData(qrCodeData)
    }

    extractData = (qrCodeData) => {
        // let str = "Name:Sourav\nVerifiedEmail id:sfsdjn@gmail.com\nLocation:dsfsdsdg\nProfile_pic_url:sdfsdgad"
        let str = qrCodeData + ""
        let n0 = str.lastIndexOf("Name:")
        let n1 = str.lastIndexOf("VerifiedEmail id:")

        let n2 = str.lastIndexOf("Location:")
        let n3 = str.lastIndexOf("Time:")
        let n4 = str.lastIndexOf("Profile_pic_url:")
        u = str.substring(n4 + 16, str.length)
        console.warn("ui   ", u)
        this.setState({
            name: str.substring(n0 + 5, n1),
            email: str.substring(n1 + 17, n2),
            url: str.substring(n4 + 16, str.length)
        })
        // console.warn(this.state.url.length)
        // let name = str.substring(n0 + 5, n1)
        // let email = str.substring(n1 + 17, n2)
        // let location = str.substring(n2 + 9, n3)
        // let time = str.substring(n3 + 5, n4)
        // let url = str.substring(n4 + 16, str.length)
        // console.warn(str.substring(n0 + 5, n1))
        // console.warn(str.substring(n1 + 17, n2))
        // console.warn(str.substring(n2 + 9, n3))
        // console.warn(str.substring(n3 + 5, n4))
        // console.warn(str.substring(n4 + 17, str.length))
    }
    startTime = () => {
        console.warn(this.state.email)
        axios({
            method: 'post',
            url: 'https://us-central1-verdant-abacus-186311.cloudfunctions.net/addtime',
            data: {
                email: this.state.email,
                name: this.state.name
            }
        })
            .then((response) => {
                console.warn("Time has started")
                // console.warn(response)

            }).catch((error) => {
            console.warn("Error", error)
        })
    }
    stopTime = () => {
        axios({
            method: 'post',
            url: 'https://us-central1-verdant-abacus-186311.cloudfunctions.net/stoptime',
            data: {
                email: this.state.email
            }
        })
            .then((response) => {
                console.warn("Time is recorded")
                console.warn(response)

            }).catch((error) => {
            console.warn("Error", error)
        })
    }

    scanQRCodeAgain() {
        this.state.scanner.reactivate();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Text style={styles.text}>{this.state.qrCodeData}</Text>*/}
                <Image style={styles.icon} source={{uri: this.state.url}}/>
                <Text style={styles.text}>Name: {this.state.name}</Text>
                <Text style={styles.text}>Email: {this.state.email}</Text>
                <Text style={styles.text}>{u}</Text>

                <Button
                    title={"Start Time"}
                    onPress={() => this.startTime()}
                />
                <Button
                    title={"End Time"}
                    onPress={() => this.stopTime()}
                />
                <Button
                    title={"Scan QRCode Again"}
                    onPress={() => this.scanQRCodeAgain()}
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
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    icon: {
        width: w(70),
        height: h(30),
        marginTop: h(10),
        marginBottom: h(7),
    }
});
