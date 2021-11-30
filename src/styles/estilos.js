import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contenedorGral: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    imgLogin: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        borderRadius: 200,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        width: '90%',
        borderWidth: 2.5,
        borderColor: '#898989',
        fontSize: 17,
        borderRadius: 15,
        marginVertical: 5,
        fontWeight: '900',
    },
    boton1: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 185,
        height: 52,
        // backgroundColor: '#950101',
        backgroundColor: '#fff',
        borderRadius: 11,
        marginVertical: 5,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
