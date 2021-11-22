import React from 'react';
import { View, Text, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../database/firebase';

const addOrden = (props) => {
    const agregarOrden = async () => {
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
            <Button title='Add Orden' onPress={agregarOrden}></Button>
        </View>
    );
};

export default addOrden;
