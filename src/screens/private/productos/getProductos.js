import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import { getDoc, onSnapshot, collection, doc } from '@firebase/firestore';
import db from '../../../database/firebase';
import estilos from '../../../styles/estilos';

const getProductos = () => {
    const [nombre, setNombre] = useState('Heineken XX');
    const [imagen, setImagen] = useState(
        require('../../../../assets/images/Logo.png')
    );
    const [precio, setPrecio] = useState('$35.00');

    const [data, setData] = useState([]);
    const [id, setId] = useState([]);

    const obtenerProductos = async () => {
        const consulta = await onSnapshot(
            collection(db.db, 'productos'),
            (snapshot) => {
                console.log(snapshot.docs.map((doc) => doc.data()));
                setData(snapshot.docs.map((doc) => doc.data()));
                setId(snapshot.docs.map((id) => id.id));
            }
        );

        return data, consulta, id;
    };

    return (
        <View>
            <Text
                style={{
                    ...estilos.titulo,
                    marginVertical: 30,
                    backgroundColor: '#000',
                    paddingVertical: 10,
                    color: '#fff',
                }}
            >
                PRODUCTOS
            </Text>
            <FlatList
                data={data}
                renderItem={(item) => (
                    <>
                        <View
                            style={{
                                margin: 10,
                                flexDirection: 'row',
                                flex: 1,
                            }}
                        >
                            <Image
                                source={require('./../../../../assets/images/Logo.png')}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                    marginHorizontal: 10,
                                }}
                            ></Image>
                            <View
                                style={{
                                    margin: 10,

                                    flex: 1,
                                }}
                            >
                                {/* TODO: darle un id único */}

                                <Text>Nombre: {item.item.nombre} </Text>
                                <Text>Precio: {item.item.precio} </Text>
                                {/* <Text>bloqueado: {item.item.bloqueado} </Text> */}
                            </View>
                        </View>
                    </>
                )}
                keyExtractor={() => {
                    id;
                }}
            ></FlatList>
            <Button title='get Productos' onPress={obtenerProductos}></Button>
        </View>
    );
};

export default getProductos;
