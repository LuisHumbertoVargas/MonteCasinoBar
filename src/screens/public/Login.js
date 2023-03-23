import React, { useState, useEffect } from 'react';
GLOBAL = require('./../../components/global');
import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    LogBox,
} from 'react-native';
import estilos from '../../styles/estilos';
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';
// import { not } from 'react-native-reanimated';
// import sjcl from 'sjcl';

const Login = (props) => {
    useEffect(() => {
        // indicamos los tipos de warnings que queremos dejar de ver

        // TODOS
        LogBox.ignoreAllLogs();

        // Solo algunos warnings
        // LogBox.ignoreLogs([
        //     'Animated: `useNativeDriver`',
        //     'Setting a timer for a long period of time',
        //     'AsyncStorage has been extracted from react-native core',
        // ]);
    }, []);

    // Hooks de los inputs
    const [email, setEmail] = useState('juanrodriguez@montecasinobar.com');
    const [password, setPassword] = useState('juanr123');

    // Hooks de los elementos visuales
    const [aiVisible, setAiVisible] = useState(false);
    const [btnVisible, setBtnVisible] = useState(true);
    const [tiVisible, setTiVisible] = useState(true);

    // Autenticación con Google
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const encryptSHA256 = async (message) => {
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray
            .map((b) => ('00' + b.toString(16)).slice(-2))
            .join('');
        return console.log(hashHex);
    };
    // encryptSHA256('Hola');

    const hashSHA256 = (password) => {
        const myBitArray = sjcl.hash.sha256.hash(myString);
        const myHash = sjcl.codec.hex.fromBits(myBitArray);
        setPassword(myhash);
        console.log(password);
        return myHash, password;
    };

    const cyrb53 = (password, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed,
            h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < password.length; i++) {
            ch = password.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 =
            Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
            Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 =
            Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
            Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        var pass = 4294967296 * (2097151 & h2) + (h1 >>> 0);
        setPassword(pass);
        console.log(pass);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

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
        if (password.length < 7) {
            Alert.alert(
                'Inicio de Sesión Fallido1',
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
                cyrb53(password)
            );

            // TODO : usarla como Global
            console.log('Datos del usuario Auth : ', usuarioAuth.user.uid);
            GLOBAL.UID = usuarioAuth.user.uid;

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
            <View
                style={{
                    ...estilos.contenedor,
                    marginBottom: 40,
                    backgroundColor: '#232323',
                }}
            >
                <Image
                    style={{ ...estilos.imgLogin, marginBottom: 40 }}
                    source={require('./../../../assets/images/Logo.png')}
                />
                <Text
                    style={{
                        ...estilos.titulo,
                        display: aiVisible ? 'none' : 'flex',
                        fontSize: 28,
                        color: '#fff',
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
                        color: '#fff',
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
                        color: '#fff',
                    }}
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={(event) => setPassword(event)}
                    keyboardType='default'
                    secureTextEntry={true}
                    // maxLength={8}
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
                    // onPress={signInGoogle}
                    onPress={''}
                >
                    <Text style={{ ...estilos.textoBoton, fontSize: 21 }}>
                        Google
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontWeight: '600',
                        display: aiVisible ? 'none' : 'flex',
                        color: '#fff',
                    }}
                >
                    Sign In with Google
                </Text>
            </View>
        </View>
    );
};

export default Login;
