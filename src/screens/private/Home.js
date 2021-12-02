import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from './perfil/Perfil';
import Mesas from './mesas/comandas/Mesas';
import CrearComanda from './mesas/CrearComanda';
import VerCuenta from './mesas/VerCuenta';
import getOrden, { obtenerDatos } from './mesas/getOrden';
import { LogBox } from 'react-native';
import getProductos from './productos/getProductos';
import Comandas from './mesas/Comandas';
import NuevaOrden from './mesas/comandas/NuevaOrden';
// import ModalComanda from '../../components/ModalComanda';
// import AppScroll from '../../components/Compo_Scroll';

const Drawer = createDrawerNavigator();

const Home = () => {
    useEffect(() => {
        // indicamos los tipos de warnings que queremos dejar de ver

        // TODOS
        LogBox.ignoreAllLogs();

        // Solo algunos warnings
        // LogBox.ignoreLogs([
        //     'Animated: `useNativeDriver`',
        //     'Setting a timer for a long period of time',
        //     'AsyncStorage has been extracted from react-native core',
        //     'Unhandled promise rejection: FirebaseError: Expected first argument to collection()',
        // ]);
    }, []);

    // console.log();

    return (
        <Drawer.Navigator>
            {/* <Drawer.Screen name='ModalComanda' component={ModalComanda} /> */}
            <Drawer.Screen name='Comandas' component={Comandas} />
            <Drawer.Screen name='CrearComandas' component={CrearComanda} />
            <Drawer.Screen name='Productos' component={getProductos} />
            <Drawer.Screen name='Mesas' component={Mesas} />
            <Drawer.Screen name='getOrden' component={getOrden} />
            <Drawer.Screen name='NuevaOrden' component={NuevaOrden} />
            <Drawer.Screen name='Perfil' component={Perfil} />
            <Drawer.Screen name='VerCuenta' component={VerCuenta} />
        </Drawer.Navigator>
    );
};

export default Home;
