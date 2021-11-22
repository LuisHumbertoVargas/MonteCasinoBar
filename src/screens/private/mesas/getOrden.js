import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getDocs, collection, onSnapshot } from '@firebase/firestore';
import db from '../../../database/firebase';
import estilos from '../../../styles/estilos';

const getOrden = (props) => {
    const [data, setData] = useState([]);

    const obtenerDatos = async () => {
        await onSnapshot(collection(db.db, 'orden'), (snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.data()));
            setData(snapshot.docs.map((doc) => doc.data()));
        });

        return data;
    };

    return (
        <View>
            <Text>GET DATOS</Text>
            <Button title='GET DATA' onPress={obtenerDatos}></Button>
            {/* <Button
                title='ADD DATA'
                onPress={props.navigation.navigate('addOrden')}
            ></Button> */}
            {/* <TextInput></TextInput> */}
        </View>
    );
};

export default getOrden;
