import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const AppModal = (props) => {
    return (
        <View
            style={{
                display: props.show ? 'flex' : 'none',
                overflow: 'hidden',
                position: 'relative',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: props.show ? '100%' : 0,
                zIndex: 1001,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: props.layerBgColor,
                    opacity: props.layerBgOpacity,
                }}
            />

            <View
                style={{
                    backgroundColor: props.modalBgColor,
                    position: 'absolute',
                    zIndex: 2,
                    padding: 10,
                    overflow: 'hidden',
                    borderRadius: 20,
                    opacity: props.modalOpacity,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                {props.modalContent}
            </View>
        </View>
    );
};

export default AppModal;
