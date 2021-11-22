import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import estilos from '../../styles/estilos';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = (props) => {
    const [email, setEmail] = useState('humberto@montecasinobar.com');
    const [password, setPassword] = useState('123456');

    const [aiVisible, setAiVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    const [tiVisible, setTiVisible] = useState(true);

    const validarLogin = async () => {
        if (email.length < 7 && !email.match('@')) {
            Alert.alert(
                'Atención',
                'la contraseña o el correo es incorrecto, vuelve a intentarlo',
                [
                    {
                        text: 'Entendido',
                        onPress: () => {
                            setEmail('');
                        },
                    },
                    { cancelable: false },
                ]
            );
            return;
        }
        if (password.length !== 6) {
            Alert.alert(
                'Atención',
                'la contraseña o el correo es incorrecto, vuelve a intentarlo',
                [
                    {
                        text: 'Entendido',
                        onPress: () => {
                            setPassword('');
                        },
                    },
                    { cancelable: false },
                ]
            );
            return;
        }
        // Si todo sale bien con las validaciones
        setAiVisible(true);
        setBtnVisible(false);
        setTiVisible(false);

        try {
            const auth = getAuth();
            const usuarioAuth = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            // console.log('Datos del usuario Auth : ', usuarioAuth.user);

            // Mensaje
            let mensaje = `${usuarioAuth.user.email}.`;
            mensaje += usuarioAuth.user.emailVerified
                ? '\n\nCuenta vericada'
                : '\n\nCuenta sin verificar';

            // Alerta con el mensaje
            Alert.alert('Bienvenido', mensaje, [
                {
                    text: 'Continuar',
                    onPress: () => {
                        setAiVisible(false);
                        setBtnVisible(true);
                        setTiVisible(true);
                        props.navigation.navigate('Home');
                    },
                },
            ]);
        } catch (e) {
            console.log(e.code);
            Alert.alert('ERROR', e.code, [
                {
                    text: 'Corregir',
                    onPress: () => {
                        setAiVisible(false);
                        setBtnVisible(true);
                        setTiVisible(true);
                    },
                },
            ]);
        }
    };

    return (
        <View style={estilos.contenedorGral}>
            <View style={{ ...estilos.contenedor, flex: 2 }}>
                <Image
                    style={estilos.imgLogin}
                    source={require('./../../../assets/images/Logo.png')}
                />
            </View>

            <View style={estilos.contenedor}>
                <ActivityIndicator
                    color='black'
                    size='large'
                    style={{ display: aiVisible ? 'flex' : 'none' }}
                />
                <TextInput
                    style={estilos.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={(event) => setEmail(event)}
                    keyboardType='email-address'
                    maxLength={40}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={(event) => setPassword(event)}
                    keyboardType='default'
                    secureTextEntry={true}
                    maxLength={8}
                    editable={tiVisible}
                ></TextInput>
            </View>

            <View
                style={{
                    ...estilos.contenedor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: btnVisible ? 'flex' : 'none',
                }}
            >
                <TouchableOpacity style={estilos.boton1} onPress={validarLogin}>
                    <Text style={estilos.textoBoton}>INGRESAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
