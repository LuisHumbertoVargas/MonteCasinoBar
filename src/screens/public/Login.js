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
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';
import { not } from 'react-native-reanimated';

const Login = (props) => {
    // Hooks de los inputs
    const [email, setEmail] = useState('humberto@montecasinobar.com');
    const [password, setPassword] = useState('12345678');

    // Hooks de los elementos visuales
    const [aiVisible, setAiVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    const [tiVisible, setTiVisible] = useState(true);

    // Autenticación con Google
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const validarLogin = async () => {
        if (email.length < 7 && !email.match('@')) {
            Alert.alert(
                'Inicio de Sesión Fallido',
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
        if (password.length !== 8) {
            Alert.alert(
                'Inicio de Sesión Fallido',
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
                ? '\n\nBIENVENIDO'
                : '\n\nConfirmar correo de verificación';

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
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(email, credential);
            Alert.alert(
                'Acceso Restringido',
                'Solicita a un administrador tu registro.',
                [
                    {
                        text: 'Volver a intentar',
                        onPress: () => {
                            setAiVisible(false);
                            setBtnVisible(true);
                            setTiVisible(true);
                        },
                    },
                ]
            );
        }
    };

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user, token);
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(email, credential);
            });
    };
    return (
        <View style={estilos.contenedorGral}>
            <View style={{ ...estilos.contenedor, marginBottom: 40 }}>
                <Image
                    style={{ ...estilos.imgLogin, marginBottom: 40 }}
                    source={require('./../../../assets/images/Logo.png')}
                />
                <Text
                    style={{
                        ...estilos.titulo,
                        display: aiVisible ? 'none' : 'flex',
                        fontSize: 28,
                        color: '#000',
                        marginBottom: 40,
                    }}
                >
                    MONTE CASINO BAR
                </Text>
                <ActivityIndicator
                    style={{ display: aiVisible ? 'flex' : 'none' }}
                    color='black'
                    size='large'
                />
                <Text
                    style={{
                        ...estilos.titulo,
                        display: aiVisible ? 'flex' : 'none',
                        fontSize: 16,
                    }}
                >
                    INGRESANDO...
                </Text>

                <TextInput
                    style={{
                        ...estilos.input,
                        marginTop: 1,
                        display: aiVisible ? 'none' : 'flex',
                    }}
                    placeholder='Email'
                    value={email}
                    onChangeText={(event) => setEmail(event)}
                    keyboardType='email-address'
                    maxLength={40}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={{
                        ...estilos.input,
                        marginBottom: 25,
                        display: aiVisible ? 'none' : 'flex',
                    }}
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={(event) => setPassword(event)}
                    keyboardType='default'
                    secureTextEntry={true}
                    maxLength={8}
                    editable={tiVisible}
                ></TextInput>
                <TouchableOpacity
                    style={{
                        ...estilos.boton1,
                        marginBottom: 9,
                        borderColor: '#535353',
                        borderWidth: 2.5,
                        display: aiVisible ? 'none' : 'flex',
                    }}
                    onPress={validarLogin}
                >
                    <Text
                        style={{
                            ...estilos.textoBoton,
                            color: '#000',
                            display: aiVisible ? 'none' : 'flex',
                        }}
                    >
                        INGRESAR
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...estilos.boton1,
                        backgroundColor: '#1a73e8',
                        display: aiVisible ? 'none' : 'flex',
                    }}
                    onPress={signInGoogle}
                >
                    <Text style={{ ...estilos.textoBoton, fontSize: 21 }}>
                        Google
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontWeight: '600',
                        display: aiVisible ? 'none' : 'flex',
                    }}
                >
                    Sign In with Google
                </Text>
            </View>
        </View>
    );
};

export default Login;
