import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import estilos from '../../../styles/estilos';
// import getOrden from './../mesas/getOrden';
// import addOrden from './../mesas/addOrden';
import db from './../../../database/firebase';
import { getDocs, addDoc, collection, onSnapshot } from '@firebase/firestore';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

const CrearComanda = () => {
    const [alertaPago, setAlertaPago] = useState(0);
    const [cliente, setCliente] = useState('Humberto Vargas');
    const [fecha, setFecha] = useState('23/11/2021');
    const [folio, setFolio] = useState('012');
    const [horaFin, setHoraFin] = useState('4:15');
    const [horaInicio, setHoraInicio] = useState('2:00');
    const [idEmpleado, setIdEmpleado] = useState('10');
    const [numeroMesa, setNumeroMesa] = useState('5');
    const [numeroPersonas, setNumeroPersonas] = useState(4);
    const [orden, setOrden] = useState([]);
    const [referenciaTarjeta, setReferenciaTarjeta] = useState(55347901427);
    const [tipoPago, setTipoPago] = useState('Tarjeta');
    const [total, setTotal] = useState('780');
    const [data, setData] = useState([]);

    const [tiVisible, setTiVisible] = useState(true);

    const obtenerDatos = async () => {
        await onSnapshot(collection(db.db, 'orden'), (snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.data()));
            setData(snapshot.docs.map((doc) => doc.data()));
        });

        return data;
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

    return (
        <ScrollView>
            <View style={{ ...estilos.contenedorGral, margin: 10 }}>
                <TextInput
                    style={estilos.input}
                    placeholder='alertaPago'
                    value={alertaPago.toString()}
                    onChangeText={(event) => setAlertaPago(event)}
                    keyboardType='number-pad'
                    maxLength={1}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='cliente'
                    value={cliente}
                    onChangeText={(event) => setCliente(event)}
                    keyboardType='default'
                    maxLength={40}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='fecha'
                    value={fecha}
                    onChangeText={(event) => setFecha(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='folio'
                    value={folio}
                    onChangeText={(event) => setFolio(event)}
                    keyboardType='default'
                    // maxLength={}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='hora Fin'
                    value={horaFin}
                    onChangeText={(event) => setHoraFin(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='hora Inicio'
                    value={horaInicio}
                    onChangeText={(event) => setHoraInicio(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='ID empleado'
                    value={idEmpleado}
                    onChangeText={(event) => setIdEmpleado(event)}
                    keyboardType='default'
                    // maxLength={}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Número Mesa'
                    value={numeroMesa}
                    onChangeText={(event) => setNumeroMesa(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Número Personas'
                    value={numeroPersonas}
                    onChangeText={(event) => setNumeroPersonas(event)}
                    keyboardType='default'
                    maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Orden'
                    value={{ orden }}
                    onChangeText={(event) => setOrden(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Referencia Tarjeta'
                    value={referenciaTarjeta}
                    onChangeText={(event) => setReferenciaTarjeta(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Tipo de Pago'
                    value={tipoPago}
                    onChangeText={(event) => setTipoPago(event)}
                    keyboardType='default'
                    maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Total'
                    value={total}
                    onChangeText={(event) => setTotal(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <Text></Text>
                <Button
                    title='Console.log(ordenes)'
                    onPress={obtenerDatos}
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

export default CrearComanda;
