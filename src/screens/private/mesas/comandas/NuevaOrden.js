import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import estilos from '../../../../styles/estilos';
import {
    FontAwesome5,
    MaterialIcons,
    Entypo,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import db from './../../../../database/firebase';

const NuevaOrden = (props) => {
    const [alertaPago, setAlertaPago] = useState(0);
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('Fecha');
    const [folio, setFolio] = useState('Folio');
    // TODO: Función que cuando la alerta de pago sea 2 se ingrese la hora
    const [horaInicio, setHoraInicio] = useState('00:00');
    const [horaFin, setHoraFin] = useState('00:00');
    const [idEmpleado, setIdEmpleado] = useState('UID Empleado');
    const [numeroMesa, setNumeroMesa] = useState('5');
    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [orden, setOrden] = useState([]);
    // TODO: CAMBIARLO A STRING
    const [referenciaTarjeta, setReferenciaTarjeta] = useState('');
    // TODO: Preguntar que son los números
    const [tipoPago, setTipoPago] = useState(1);
    // TODO: Cambiar al flotante
    const [total, setTotal] = useState('780');

    const [data, setData] = useState([]);
    const [idMesa, setIdMesa] = useState([]);
    const [producto, setProducto] = useState([]);
    const [tiVisible, setTiVisible] = useState(true);
    const [selectPicker, setSelectPicker] = useState(0);

    const getFechaComanda = () => {
        var fechaComanda = new Date().toDateString();
        setFecha(fechaComanda);
        // Alert.alert(fechaComanda);
        return fechaComanda;
    };

    const getTiempo = () => {
        let hoy = new Date();
        let hora = hoy.getHours();
        let minuto = hoy.getMinutes();
        hora < 10 ? (hora = `0${hora}`) : ``;
        minuto < 10 ? (minuto = `0${minuto}`) : ``;
        let tiempo = `${hora}:${minuto}`;
        setHoraInicio(tiempo);
        return tiempo;
    };

    const getFolio = () => {
        let hoy = new Date();
        let hora = hoy.getHours();
        let minuto = hoy.getMinutes();
        let segundo = hoy.getSeconds();
        let dia = hoy.getDate();
        let mes = hoy.getMonth();
        let anio = hoy.getYear();
        hora < 10 ? (hora = `0${hora}`) : ``;
        minuto < 10 ? (minuto = `0${minuto}`) : ``;
        segundo < 10 ? (segundo = `0${segundo}`) : ``;
        dia < 10 ? (dia = `0${dia}`) : ``;
        mes < 10 ? (mes = `0${mes}`) : ``;
        anio < 10 ? (anio = `0${anio}`) : ``;
        var foli = `${anio}${mes}${dia}${hora}${minuto}${segundo}`;
        setFolio(foli);
        return foli;
    };

    const getProductos = async () => {
        const consultaProductos = await onSnapshot(
            collection(db.db, 'productos'),
            (snapshot) => {
                console.log(snapshot.docs.map((doc) => doc.data().imagen));
                // setProducto(snapshot.docs.map((doc) => doc.data().imagen));
            }
        );
        return consultaProductos;
    };

    const getEmpleados = async () => {
        const consulta = await onSnapshot(
            collection(db.db, 'empleados'),
            (snapshot) => {
                console.log(snapshot.docs.map((doc) => doc.data().uid));
                setIdEmpleado(snapshot.docs.map((doc) => doc.data().uid));
            }
        );
        console.log(consulta);
        return consulta;
    };

    const getOrden = async () => {
        await onSnapshot(collection(db.db, 'orden'), (snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.data()));
            setData(snapshot.docs.map((doc) => doc.data()));
        });

        return data;
    };

    const getMesas = async () => {
        const queryMesas = await onSnapshot(
            collection(db.db, 'mesa'),
            (snapshot) => {
                setIdMesa(snapshot.docs.map((id) => id.id));
                setNumeroMesa(
                    snapshot.docs.map((valor) => valor.data().nombre)
                );
            }
        );
        return queryMesas;
    };

    const agregarDatos = async () => {
        try {
            const docRef = await addDoc(collection(db.db, 'orden'), {
                alertaPago: alertaPago,
                cliente: cliente,
                fecha: fecha,
                folio: folio,
                horaFin: horaFin,
                horaInicio: horaInicio,
                idEmpleado: idEmpleado,
                numeroMesa: numeroMesa,
                numeroPersonas: parseInt(numeroPersonas),
                orden: [
                    {
                        cantidad: 4,
                        idProducto: 'id_prod',
                    },
                    {
                        cantidad: 4,
                        idProducto: 'id_prod',
                    },
                ],
                referenciaTarjeta: parseInt(referenciaTarjeta),
                tipoPago: parseInt(tipoPago),
                total: parseFloat(total),
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const horaTermino = async () => {
        if (alertaPago == 0) {
            var hFin = getTiempo();
            setHoraFin(hFin.toString());
            // Alert.alert(hFin.toString());
        }
        return hFin;
    };

    return (
        <ScrollView>
            <View
                style={{
                    ...estilos.contenedorGral,
                    margin: 10,
                    padding: 15,
                }}
            >
                <Text style={estilos.titulo}>
                    Alerta Pago: {alertaPago}
                    {/* {alertaPago == 0 ? 'Abierta' : 'Proceso de pago'} */}
                </Text>
                {/* <View style={{ alignItems: 'flex-end' }}> */}
                <Text style={{ fontWeight: 'bold' }}>{fecha}</Text>
                <Text>Folio: {folio}</Text>
                <Text>Inicio: {horaInicio} Hrs.</Text>
                <Text>Termino: {horaFin} Hrs.</Text>
                <Text></Text>
                {/* </View> */}

                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        style={{ marginHorizontal: 10, marginVertical: 15 }}
                        name='face-profile'
                        size={35}
                        color='black'
                    />
                    <TextInput
                        style={{
                            ...estilos.picker,
                            // marginTop: 15,
                            paddingVertical: 8,
                        }}
                        placeholder='Nombre del cliente'
                        value={cliente}
                        onChangeText={(event) => setCliente(event)}
                        keyboardType='default'
                        maxLength={40}
                        autoCapitalize='words'
                        editable={tiVisible}
                    ></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        style={{ marginHorizontal: 10, marginVertical: 15 }}
                        name='table-chair'
                        size={35}
                        color='black'
                    />
                    <View style={estilos.picker}>
                        <Picker
                            style={{ color: '#000' }}
                            selectedValue={selectPicker}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectPicker(itemValue);
                                setNumeroMesa(itemValue);
                            }}
                            prompt='Selecciona la mesa'
                            // dropdownIconColor='#000'
                            dropdownIconRippleColor='green'
                        >
                            <Picker.Item label='Mesa 1' value='Mesa 1' />
                            <Picker.Item label='Mesa 2' value='Mesa 2' />
                            <Picker.Item label='Mesa 3' value='Mesa 3' />
                            <Picker.Item label='Mesa 4' value='Mesa 4' />
                            <Picker.Item label='Mesa 5' value='Mesa 5' />
                            <Picker.Item label='Mesa 6' value='Mesa 6' />
                            <Picker.Item label='Mesa 7' value='Mesa 7' />
                            <Picker.Item label='Mesa 8' value='Mesa 8' />
                            <Picker.Item label='Mesa 9' value='Mesa 9' />
                            <Picker.Item label='Mesa 10' value='Mesa 10' />
                            <Picker.Item label='Mesa 11' value='Mesa 11' />
                            <Picker.Item label='Mesa 12' value='Mesa 12' />
                            <Picker.Item label='Mesa 13' value='Mesa 13' />
                            <Picker.Item label='Mesa 14' value='Mesa 14' />
                            <Picker.Item label='Mesa 15' value='Mesa 15' />
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        style={{ marginHorizontal: 10, marginVertical: 15 }}
                        name='people'
                        size={35}
                        color='black'
                    />
                    <View style={estilos.picker}>
                        <Picker
                            style={{ padding: 15 }}
                            selectedValue={selectPicker}
                            onValueChange={(itemValue) => {
                                setSelectPicker(itemValue);
                                setNumeroPersonas(itemValue);
                            }}
                            prompt={'Número de Personas'}
                            dropdownIconColor='#252525'
                            dropdownIconRippleColor='green'
                        >
                            <Picker.Item label='1 Persona' value='1 Persona' />
                            <Picker.Item
                                label='2 Personas'
                                value='2 Personas'
                            />
                            <Picker.Item
                                label='3 Personas'
                                value='3 Personas'
                            />
                            <Picker.Item
                                label='4 Personas'
                                value='4 Personas'
                            />
                            <Picker.Item
                                label='5 Personas'
                                value='5 Personas'
                            />
                            <Picker.Item
                                label='6 Personas'
                                value='6 Personas'
                            />
                            <Picker.Item
                                label='7 Personas'
                                value='7 Personas'
                            />
                            <Picker.Item
                                label='8 Personas'
                                value='8 Personas'
                            />
                            <Picker.Item
                                label='9 Personas'
                                value='9 Personas'
                            />
                            <Picker.Item
                                label='10 Personas'
                                value='10 Personas'
                            />
                            <Picker.Item
                                label='11 Personas'
                                value='11 Personas'
                            />
                            <Picker.Item
                                label='12 Personas'
                                value='12 Personas'
                            />
                            <Picker.Item
                                label='13 Personas'
                                value='13 Personas'
                            />
                            <Picker.Item
                                label='14 Personas'
                                value='14 Personas'
                            />
                            <Picker.Item
                                label='15 Personas'
                                value='15 Personas'
                            />
                        </Picker>
                    </View>
                </View>

                <Text
                    style={{
                        ...estilos.titulo,
                        marginTop: 20,
                        // backgroundColor: '#1a73e8',
                        // color: '#000',
                        // paddingVertical: 10,
                    }}
                >
                    Ingresa tus productos
                </Text>
                <Text
                    style={{
                        ...estilos.titulo,
                        marginTop: 5,
                        marginBottom: 1,
                        textAlign: 'left',
                    }}
                >
                    Bebidas
                </Text>

                <ScrollView horizontal={true}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor: '#252525',
                            paddingVertical: 20,
                            paddingHorizontal: 5,
                            borderRadius: 25,
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <Text></Text>
                <Text
                    style={{
                        ...estilos.titulo,
                        marginBottom: 1,
                        textAlign: 'left',
                    }}
                >
                    Botana
                </Text>

                <ScrollView horizontal={true}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // backgroundColor: '#252525',
                            paddingVertical: 20,
                            paddingHorizontal: 5,
                            borderRadius: 25,
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity
                                style={{
                                    ...estilos.imgDrinks,
                                    backgroundColor: 'orange',
                                    marginHorizontal: 10,

                                    // display: aiVisible ? 'none' : 'flex',
                                }}
                                // onPress={signInGoogle}
                            >
                                {/* <ImageBackground
                                style={estilos.imgDrinks}
                                // source={require('./../../../../../assets/images/')}
                                source={producto.map((val) => val.imagen)}
                            /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    fontWeight: 'bold',
                                    color: '#000',
                                }}
                            >
                                Cerveza
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <Text></Text>
                <Button
                    title='GET DATOS'
                    onPress={() => (
                        getOrden(),
                        getMesas(),
                        getFechaComanda(),
                        getFolio(),
                        getTiempo(),
                        horaTermino(),
                        getEmpleados(),
                        getProductos()
                    )}
                ></Button>
                <Text></Text>
                <Button
                    title='AGREGAR DATOS'
                    onPress={agregarDatos}
                    color='green'
                ></Button>
            </View>
        </ScrollView>
    );
};

export default NuevaOrden;
