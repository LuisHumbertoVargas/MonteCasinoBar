import React from 'react';
import { View, Text, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../database/firebase';

const addOrden = (props) => {
    const agregarDatos = async () => {
        try {
            const docRef = await addDoc(collection(db.db, 'orden'), {
                hola: 'hola',
                nada: 'nada',
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <View>
            <Text>AGREGAR ORDEN</Text>
            <Button title='Add Orden' onPress={agregarDatos}></Button>
        </View>
    );
};

export default addOrden;

// const comanda = [
//     {
//         alertaPago: 0,
//         cliente: 'cliente',
//         fecha: 'fecha',
//         folio: 'folio',
//         horaFin: '00:00',
//         horaInicio: '00:00',
//         idEmpleado: 'id_empleado',
//         numeroMesa: '#_mesa',
//         numeroPersonas: 0,
//         orden: [
//             {
//                 cantidad: 0,
//                 idProducto: 'id_prod',
//             },
//             {
//                 cantidad: 0,
//                 idProducto: 'id_prod',
//             },
//         ],
//         referenciaTarjeta: 1000,
//         tipoPago: 1,
//         total: 0.0,
//     },
// ];
