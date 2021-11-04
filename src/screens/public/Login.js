import React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import estilos from '../../styles/estilos';

const Login = () => {
    return (
        <View style={estilos.contenedorGral}>
            <View style={estilos.contenedor}>
                <Image source={require('./../../../assets/images/Logo.png')} />
            </View>

            <View>
                <TextInput defaultValue='Usuario o Email'></TextInput>
                <TextInput defaultValue='Contraseña'></TextInput>
            </View>

            <View>
                <Button title='Ingresar'></Button>
                <Button title='YA TENGO UNA CUENTA'></Button>
            </View>
        </View>
    );
};

export default Login;
