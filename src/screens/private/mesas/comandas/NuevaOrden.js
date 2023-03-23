import { Picker } from '@react-native-picker/picker';
GLOBAL = require('./../../../../components/global');
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    // TouchableOpacity,
    ImageBackground,
    Image,
    Button,
    Alert,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import estilos from '../../../../styles/estilos';
import {
    FontAwesome5,
    MaterialIcons,
    Entypo,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    getDocs,
} from '@firebase/firestore';
// import { getDownloadURL, ref} from 'firebase/storage';
import db from './../../../../database/firebase';
import sjcl from 'sjcl';
import AppModal from './../../../../components/AppModal';
import { color } from 'react-native-reanimated';
// import { MiUid2 } from './../../../public/Login';<<<

const NuevaOrden = (props) => {
    const [alertaPago, setAlertaPago] = useState(1);
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
    const [total, setTotal] = useState('$0.00');
    const [cantidad, setCantidad] = useState([{}]);
    const [datosMesa, setDatosMesa] = useState([]);
    const [listaMesa, setListaMesa] = useState([]);
    const [uidEmpleado, setUidEmpleado] = useState('');
    const [producto, setProducto] = useState([]);
    const [idMesa, setIdMesa] = useState('');
    const [idProducto, setIdProducto] = useState([]);
    const [color1, setColor1] = useState('green');
    const [color2, setColor2] = useState('#232323');

    const [data, setData] = useState([]);
    const [tiVisible, setTiVisible] = useState(true);
    const [selectPickerMesa, setSelectPickerMesa] = useState(0);
    const [selectPickerPersona, setSelectPickerPersona] = useState(0);
    const [modalImg, setModalImg] = useState(false);
    const [listaCerveza, setListaCerveza] = useState([
        'Tecate',
        'Tecate Light',
        'XX Lager',
        'Bohemia CLara',
        'Bohemia Oscura',
        'Heineken',
        'Stella Artois',
        'Michelada',
    ]);
    const [precioCerveza, setPrecioCerveza] = useState([
        '35',
        '35',
        '35',
        '45',
        '45',
        '45',
        '45',
        '45',
    ]);
    // const [image, setImage] = useState(false);

    // useEffect(() => {
    //     let imageRef = firebase.storage().ref('/ankit/');
    //     imageRef
    //         .getDownloadURL()
    //         .then((url) => {
    //             setImage(url);
    //         })
    //         .catch((e) =>
    //             console.log('getting downloadURL of image error => ', e)
    //         );
    // }, []);

    useEffect(() => {
        getOrden(),
            getMesas(),
            getFechaComanda(),
            getFolio(),
            getTiempo(),
            horaTermino(),
            getEmpleados(),
            comparaciones(),
            getProductos();
    }, []);

    const getFechaComanda = () => {
        let hoy = new Date();
        let dia = hoy.getDate();
        let mes = hoy.getMonth();
        mes = mes + 1;
        let anio = hoy.getFullYear();
        dia < 10 ? (dia = `0${dia}`) : ``;
        mes < 10 ? (mes = `0${mes}`) : ``;
        var fechaComanda = `${dia}/${mes}/${anio}`;
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
        //setCantidad([{ id: 0, cant: 0 }]);
        const consultaProductos = await onSnapshot(
            collection(db.db, 'productos'),
            (snapshot) => {
                console.log(snapshot.docs.map((doc) => doc.data()));
                setProducto(snapshot.docs.map((doc) => doc.data().nombre));

                var arregloProd = [];
                snapshot.docs.map((doc) => {
                    arregloProd.push({
                        id: doc.id,
                        nombre: doc.data().nombre,
                    });
                });
                setProducto(arregloProd);
            }
        );

        return consultaProductos;
    };

    const sumar = (id) => {
        var y = 0;
        if (!cantidad.length) {
            setCantidad([{ id: id, cant: 1 }]);
        }

        let arreglo2 = cantidad;
        let agregar = true;
        let bandera = true;

        cantidad.map((doc) => {
            arreglo2.map((doc2) => {
                if (doc2.idProducto == id) {
                    agregar = false;
                    if (bandera) {
                        doc2.cantidad = doc2.cantidad + 1;
                        bandera = false;
                    }
                }
            });

            if (agregar == true) {
                arreglo2.push({ idProducto: id, cantidad: y });
            }
        });
        setCantidad(arreglo2);

        console.log(cantidad);
        //Alert.alert(cantidad.toString());
        return cantidad;
    };

    const restar = () => {
        setCantidad(cantidad - 1);
        // return cantidad;
    };

    const getEmpleados = async () => {
        const consulta = await onSnapshot(
            collection(db.db, 'empleados'),
            (snapshot) => {
                // console.log(snapshot.docs.map((doc) => doc.data().uid));
                setIdEmpleado(snapshot.docs.map((doc) => doc.data().uid));
            }
        );

        return consulta;
    };

    const comparaciones = async () => {
        const q = query(
            collection(db.db, 'empleados'),
            where('uid', '==', GLOBAL.UID)
        );

        const compararID = await getDocs(q);
        compararID.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data().uid);
            setUidEmpleado(doc.id);
        });
    };

    const getOrden = async () => {
        await onSnapshot(collection(db.db, 'orden'), (snapshot) => {
            // console.log(snapshot.docs.map((doc) => doc.data()));
            setData(snapshot.docs.map((doc) => doc.data()));
        });
        return data;
    };

    const getMesas = async () => {
        const queryMesas = await onSnapshot(
            collection(db.db, 'mesa'),
            (snapshot) => {
                setIdMesa(snapshot.docs.map((id) => id.id));
                setDatosMesa(snapshot.docs.map((valor) => valor.data()));

                var arreglo = [];
                snapshot.docs.map((doc) => {
                    arreglo.push({
                        id: doc.id,
                        nombre: doc.data().nombre,
                    });
                });
                setListaMesa(arreglo);
            }
        );
        console.log(listaMesa);
        // return
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
                idEmpleado: uidEmpleado,
                idMesa: idMesa,
                numeroPersonas: parseInt(numeroPersonas),
                orden: cantidad,
                referenciaTarjeta: parseInt(referenciaTarjeta),
                tipoPago: parseInt(tipoPago),
                total: parseFloat(total),
            });
            Alert.alert(
                'TODO PERFECTO',
                'Tus productos han sido agregados exitosamente',
                [
                    {
                        text: 'Salir',
                        // onPress: () => {
                        //     props.navigation.navigate('Mesas');
                        // },
                    },
                    { cancelable: false },
                ]
            );
            // console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const horaTermino = () => {
        if (alertaPago == 3) {
            var hFin = getTiempo();
            setHoraFin(hFin.toString());
            // Alert.alert(hFin.toString());
        }
        return hFin;
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    style={{
                        ...estilos.contenedorGral,
                        // margin: 10,
                        // padding: 15,
                    }}
                >
                    <Text
                        style={{
                            ...estilos.titulo,
                            marginVertical: 30,
                            backgroundColor: '#000',
                            paddingVertical: 10,
                            color: '#fff',
                        }}
                    >
                        COMANDAS
                    </Text>
                    {modalImg ? (
                        <AppModal
                            show={modalImg}
                            layerBgColor='#232323'
                            layerBgOpacity={(0, 5)}
                            modalBgColor='#fff'
                            modalOpacity={0.8}
                            modalContent={
                                <View>
                                    <Text
                                        style={{
                                            alignSelf: 'center',
                                            marginBottom: 20,
                                            fontSize: 20,
                                            fontWeight: '500',
                                        }}
                                    >
                                        <FontAwesome5 name='beer' size={22} />{' '}
                                        Seleccionar cerveza
                                    </Text>

                                    <FlatList
                                        data={listaCerveza}
                                        renderItem={(item) => (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    // flex: 1,
                                                    marginVertical: 20,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            marginHorizontal: 10,
                                                        }}
                                                    >
                                                        {item.item}
                                                        {/* {'  '} */}
                                                        {/* {item.index} */}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginLeft: 10,
                                                        // marginVertical: 20,
                                                    }}
                                                >
                                                    <Button
                                                        title='quitar'
                                                        onPress={restar}
                                                    ></Button>
                                                    <Text
                                                        style={{
                                                            margin: 6,
                                                        }}
                                                    >
                                                        {cantidad}
                                                    </Text>
                                                    <Button
                                                        title='Agregar'
                                                        onPress={sumar}
                                                    ></Button>
                                                </View>
                                            </View>
                                        )}
                                        // keyExtractor={(item) =>
                                        //     item.id.toString()
                                        // }
                                    ></FlatList>

                                    {Platform.OS === 'android' ? (
                                        <View
                                            style={{
                                                marginVertical: 4,
                                            }}
                                        ></View>
                                    ) : null}

                                    <Button
                                        title='Cancelar'
                                        color='red'
                                        onPress={() => {
                                            setModalImg(false);
                                        }}
                                    />
                                </View>
                            }
                        />
                    ) : null}
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>{fecha}</Text>
                        <Text>Folio: {folio}</Text>
                        <Text>Inicio: {horaInicio} Hrs.</Text>
                        <Text>Termino: {horaFin} Hrs.</Text>
                        <Text>
                            Alerta Pago: {alertaPago}
                            {/* {alertaPago == 0 ? 'Abierta' : 'Proceso de pago'} */}
                        </Text>
                        <Text></Text>
                    </View>

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
                        <View>
                            <FlatList
                                data={listaMesa}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{
                                            // ...estilos.imgDrinks,
                                            backgroundColor:
                                                item.id == idMesa
                                                    ? color1
                                                    : color2,
                                            marginHorizontal: 10,
                                            margin: 10,
                                            padding: 10,
                                        }}
                                        onPress={() => {
                                            setIdMesa(item.id);
                                        }}
                                    >
                                        {/* <Text>{item.id}</Text> */}
                                        <Text
                                            style={{
                                                marginHorizontal: 50,
                                                color: '#fff',
                                            }}
                                        >
                                            Mesa: {item.nombre}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            ></FlatList>
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
                                selectedValue={selectPickerPersona}
                                onValueChange={(itemValue) => {
                                    setSelectPickerPersona(itemValue);
                                    setNumeroPersonas(itemValue);
                                }}
                                prompt={'Número de Personas'}
                                dropdownIconColor='#252525'
                                dropdownIconRippleColor='green'
                            >
                                <Picker.Item
                                    label='1 Persona'
                                    value='1 Persona'
                                />
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
                    {/* <Text
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
                                    onPress={() => setModalImg(true)}
                                >
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Cervezas
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity
                                    style={{
                                        ...estilos.imgDrinks,
                                        backgroundColor: 'orange',
                                        marginHorizontal: 10,
                                    }}
                                >
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Licores
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity
                                    style={{
                                        ...estilos.imgDrinks,
                                        backgroundColor: 'orange',
                                        marginHorizontal: 10,
                                    }}
                                >
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Cocteles
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity
                                    style={{
                                        ...estilos.imgDrinks,
                                        backgroundColor: 'orange',
                                        marginHorizontal: 10,
                                    }}
                                >
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Refrescos
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
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Caldo de Camarón
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
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Tacos
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
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Tostadas
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
                                    <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        paddingVertical: 5,
                                        fontWeight: 'bold',
                                        color: '#000',
                                    }}
                                >
                                    Papas
                                </Text>
                            </View>
                        </View>
                    </ScrollView> */}

                    {/* <Text></Text>
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
                ></Button> */}
                    <View
                        style={{
                            flexDirection: 'column',
                            marginLeft: 55,
                            width: '100%',
                        }}
                    >
                        <FlatList
                            data={producto}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={estilos.picker}
                                    onPress={() => {
                                        setIdProducto(item.id);
                                    }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={{
                                                ...estilos.imgDrinks,
                                                backgroundColor: 'orange',
                                                marginHorizontal: 10,
                                                margin: 10,

                                                // display: aiVisible ? 'none' : 'flex',
                                            }}
                                            // onPress={signInGoogle}
                                        >
                                            <ImageBackground
                                                style={estilos.imgDrinks}
                                                source={require('./../../../../../assets/images/MCB.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                paddingVertical: 15,
                                                fontWeight: 'bold',
                                                color: '#000',
                                                alignSelf: 'center',
                                            }}
                                        >
                                            {item.nombre}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            margin: 15,
                                            marginRight: 15,
                                        }}
                                    >
                                        <Button
                                            title='+'
                                            onPress={() => {
                                                sumar(item.id);
                                            }}
                                        ></Button>
                                        <Text></Text>
                                        <Button
                                            title='-'
                                            // onPress={() => {
                                            //     sumar(item.id);
                                            // }}
                                        ></Button>
                                    </View>
                                </TouchableOpacity>
                                /* <ImageBackground
                                        style={estilos.imgDrinks}
                                        source={require('./../../../../../assets/images/MCB.png')}
                                    />
                                    <Text>{item.nombre}</Text> */
                            )}
                        ></FlatList>
                    </View>

                    {/* <Text></Text>
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
                            comparaciones(),
                            getProductos()
                        )}
                    ></Button> */}
                    <Text></Text>
                    <Button
                        title='INGRESAR COMANDA'
                        onPress={agregarDatos}
                        color='green'
                    ></Button>
                    <Text></Text>
                    {/* <Button
                        title='RESETEAR DATOS'
                        // onPress={}
                        color='red'
                    ></Button> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NuevaOrden;
