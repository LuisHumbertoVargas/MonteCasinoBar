import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView, Image } from 'react-native';
import { getDoc, onSnapshot, collection, doc } from '@firebase/firestore';
import db from './../../../../database/firebase';
import estilos from './../../../../styles/estilos';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Mesas = (props) => {
    useEffect(() => {
        obtenerMesas();
    }, []);

    const [data, setData] = useState([]);
    const [id, setId] = useState([]);

    const obtenerMesas = async () => {
        const consulta = await onSnapshot(
            collection(db.db, 'mesa'),
            (snapshot) => {
                console.log(snapshot.docs.map((doc) => doc.data()));
                setData(snapshot.docs.map((doc) => doc.data()));
                setId(snapshot.docs.map((id) => id.id));
                // console.log(snapshot.docs.map((id) => id.id));
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
                MESAS
            </Text>
            {/* <Modal></Modal> */}
            <FlatList
                data={data}
                renderItem={(item) => (
                    <>
                        <TouchableOpacity>
                            <View
                                style={{
                                    margin: 10,
                                    flexDirection: 'row',
                                    flex: 1,
                                }}
                            >
                                <Image
                                    source={require('./.././../../../../assets/images/Logo.png')}
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

                                    <Text>Mesa: {item.item.nombre} </Text>
                                    <Text>Estado: {item.item.estado} </Text>
                                    <Text>
                                        bloqueado: {item.item.bloqueado}{' '}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
                keyExtractor={() => {
                    id;
                }}
            ></FlatList>
            {/* <Button title='get mesas' onPress={obtenerMesas}></Button> */}
        </View>
    );
};

export default Mesas;
