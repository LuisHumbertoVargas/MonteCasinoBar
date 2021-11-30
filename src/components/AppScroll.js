import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';

export default class AppScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    showModal = () => this.setState({ visible: true });

    hideModal = () => this.setState({ visible: false });

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={this.showModal}
                    style={{
                        alignSelf: 'center',
                        marginTop: 50,
                        backgroundColor: 'grey',
                    }}
                >
                    <Text>Touch Me</Text>
                </TouchableOpacity>
                <Modal
                    style={styles.modal}
                    isVisible={this.state.visible}
                    onBackdropPress={this.hideModal}
                >
                    <ScrollView horizontal={true}>
                        {/* place your buttons here */}
                        <Text> Very Very Long String </Text>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        backgroundColor: 'white',
        height: 100,
        flex: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
    },
});
