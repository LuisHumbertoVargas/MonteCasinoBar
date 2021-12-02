import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import estilos from '../../../styles/estilos';
import db from './../../../database/firebase';
import { getDocs, addDoc, collection, onSnapshot } from '@firebase/firestore';
// import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';

const CrearComanda = () => {
    const [alertaPago, setAlertaPago] = useState(0);
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('fecha');
    const [folio, setFolio] = useState('Folio');
    // TODO: Función que cuando la alerta de pago sea 2 se ingrese la hora
    const [horaFin, setHoraFin] = useState('00:00');
    //
    const [horaInicio, setHoraInicio] = useState('');
    // TODO: Funcion para traer el uid del empleado
    const [idEmpleado, setIdEmpleado] = useState('UID Empleado');
    // TODO: El número es el nombre de la mesa, traelo
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
            <View style={{ ...estilos.contenedorGral, margin: 10 }}>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='alertaPago'
                    value={alertaPago.toString()}
                    onChangeText={(event) => setAlertaPago(event)}
                    keyboardType='number-pad'
                    maxLength={1}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text style={estilos.picker}>Alerta Pago: {alertaPago}</Text>
                <TextInput
                    style={estilos.picker}
                    placeholder='Nombre del cliente'
                    value={cliente}
                    onChangeText={(event) => setCliente(event)}
                    keyboardType='default'
                    maxLength={40}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='fecha'
                    value={fecha}
                    onChangeText={(event) => setFecha(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text style={{ fontWeight: 'bold' }}>{fecha}</Text>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='folio'
                    value={folio}
                    onChangeText={(event) => setFolio(event)}
                    keyboardType='default'
                    // maxLength={}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text>Folio: {folio}</Text>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='hora Inicio'
                    value={horaInicio}
                    onChangeText={(event) => setHoraInicio(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text>Hora Inicio: {horaInicio} Hrs.</Text>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='hora Fin'
                    value={horaFin}
                    onChangeText={(event) => setHoraFin(event)}
                    keyboardType='default'
                    maxLength={10}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text>Hora Termino: {horaFin} Hrs.</Text>

                {/* <TextInput
                    style={estilos.input}
                    placeholder='ID empleado'
                    value={idEmpleado}
                    onChangeText={(event) => setIdEmpleado(event)}
                    keyboardType='default'
                    // maxLength={}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text></Text>
                <Text>ID Empleado: {idEmpleado}</Text>
                <Text></Text>
                <Text>ID Mesa: {idMesa}</Text>
                <Text></Text>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='Número Mesa'
                    value={numeroMesa}
                    onChangeText={(event) => setNumeroMesa(event)}
                    keyboardType='number-pad'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <View style={estilos.picker}>
                    <Picker
                        style={{ padding: 15 }}
                        selectedValue={selectPicker}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectPicker(itemValue);
                            setNumeroMesa(itemValue);
                        }}
                        prompt='Selecciona la mesa'
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

                {/* <Text>Número Mesa: {numeroMesa}</Text> */}
                {/* <TextInput
                    style={estilos.input}
                    placeholder='Número Personas'
                    value={numeroPersonas}
                    onChangeText={(event) => setNumeroPersonas(event)}
                    keyboardType='number-pad'
                    maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <View style={estilos.picker}>
                    <Picker
                        style={{ padding: 15 }}
                        selectedValue={selectPicker}
                        onValueChange={(itemValue) => {
                            setSelectPicker(itemValue);
                            setNumeroPersonas(itemValue);
                        }}
                        prompt='Número de Personas'
                    >
                        <Picker.Item label='1 Persona' value='1 Persona' />
                        <Picker.Item label='2 Personas' value='2 Persona' />
                        <Picker.Item label='3 Personas' value='3 Personas' />
                        <Picker.Item label='4 Personas' value='4 Personas' />
                        <Picker.Item label='5 Personas' value='5 Personas' />
                        <Picker.Item label='6 Personas' value='6 Personas' />
                        <Picker.Item label='7 Personas' value='7 Personas' />
                        <Picker.Item label='8 Personas' value='8 Personas' />
                        <Picker.Item label='9 Personas' value='9 Personas' />
                        <Picker.Item label='10 Personas' value='10 Personas' />
                        <Picker.Item label='11 Personas' value='11 Personas' />
                        <Picker.Item label='12 Personas' value='12 Personas' />
                        <Picker.Item label='13 Personas' value='13 Personas' />
                        <Picker.Item label='14 Personas' value='14 Personas' />
                        <Picker.Item label='15 Personas' value='15 Personas' />
                    </Picker>
                </View>

                <TextInput
                    style={estilos.picker}
                    placeholder='Orden PENDIENTE'
                    value={{ orden }}
                    onChangeText={(event) => setOrden(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.picker}
                    placeholder='Referencia Tarjeta'
                    value={referenciaTarjeta}
                    onChangeText={(event) => setReferenciaTarjeta(event)}
                    keyboardType='number-pad'
                    maxLength={16}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                {/* <TextInput
                    style={estilos.input}
                    placeholder='Tipo de Pago'
                    value={tipoPago}
                    onChangeText={(event) => setTipoPago(event)}
                    keyboardType='number-pad'
                    maxLength={1}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <View style={estilos.picker}>
                    <Picker
                        style={{ padding: 15 }}
                        selectedValue={selectPicker}
                        onValueChange={(itemValue) => {
                            setSelectPicker(itemValue);
                            setTipoPago(itemValue);
                        }}
                        prompt='Tipo de Pago'
                    >
                        <Picker.MODE_DROPDOWN
                            label='1. Efectivo'
                            value='1. Efectivo'
                        />
                        <Picker.Item label='2. Tarjeta' value='2. Tarjeta' />
                        <Picker.Item
                            label='3. Transferencia'
                            value='3. Transferencia'
                        />
                    </Picker>
                </View>

                {/* <TextInput
                    style={estilos.input}
                    placeholder='Total'
                    value={total}
                    onChangeText={(event) => setTotal(event)}
                    keyboardType='default'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput> */}
                <Text
                    style={{
                        ...estilos.input,
                        width: '95%',
                        textAlign: 'right',
                        paddingHorizontal: 20,
                        fontWeight: 'bold',
                    }}
                >
                    Total a pagar: ${total}.00
                </Text>
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
                        getEmpleados()
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

export default CrearComanda;
