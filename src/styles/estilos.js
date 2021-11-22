import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contenedorGral: {
        flex: 1,
    },
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imgLogin: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        borderRadius: 200,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '95%',
        borderWidth: 2,
        borderColor: '#585858',
        fontSize: 16,
        borderRadius: 10,
        marginVertical: 5,
    },
    boton1: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 185,
        height: 50,
        backgroundColor: '#950101',
        borderRadius: 10,
        marginVertical: 7,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
