import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import estilos from '../../../styles/estilos';

const CrearComanda = () => {
    const [alertaPago, setAlertaPago] = useState(0);
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [folio, setFolio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('');
    const [numeroMesa, setNumeroMesa] = useState('');
    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [orden, setOrden] = useState([{}]);
    const [referenciaTarjeta, setReferenciaTarjeta] = useState();
    const [tipoPago, setTipoPago] = useState(1);
    const [total, setTotal] = useState(0.0);

    const [tiVisible, setTiVisible] = useState(true);

    const comanda = [
        {
            alertaPago: 0,
            cliente: 'cliente',
            fecha: 'fecha',
            folio: 'folio',
            horaFin: '00:00',
            horaInicio: '00:00',
            idEmpleado: 'id_empleado',
            numeroMesa: '#_mesa',
            numeroPersonas: 0,
            orden: [
                {
                    cantidad: 0,
                    idProducto: 'id_prod',
                },
                {
                    cantidad: 0,
                    idProducto: 'id_prod',
                },
            ],
            referenciaTarjeta: 1000,
            tipoPago: 1,
            total: 0.0,
        },
    ];

    return (
        <ScrollView>
            <View style={{ ...estilos.contenedorGral, margin: 10 }}>
                <TextInput
                    style={estilos.input}
                    placeholder='alertaPago'
                    value={alertaPago}
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
                    keyboardType='number-pad'
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
                    keyboardType='number-pad'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Número Personas'
                    value={numeroPersonas}
                    onChangeText={(event) => setNumeroPersonas(event)}
                    keyboardType='number-pad'
                    maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Orden'
                    value={orden}
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
                    keyboardType='number-pad'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Tipo de Pago'
                    value={tipoPago}
                    onChangeText={(event) => setTipoPago(event)}
                    keyboardType='number-pad'
                    maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>
                <TextInput
                    style={estilos.input}
                    placeholder='Total'
                    value={total}
                    onChangeText={(event) => setTotal(event)}
                    keyboardType='number-pad'
                    // maxLength={3}
                    autoCapitalize='none'
                    editable={tiVisible}
                ></TextInput>

                <Button title='ENVIAR' onPress={''}></Button>
            </View>
        </ScrollView>
    );
};

export default CrearComanda;
