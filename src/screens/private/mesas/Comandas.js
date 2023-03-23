import React from 'react';
import { View, Text, Dimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import NuevaOrden from './comandas/NuevaOrden';
import Perfil from '../perfil/Perfil';
import Mesas from './comandas/Mesas';
import getProductos from '../productos/getProductos';

const Tab = createMaterialTopTabNavigator();

const Comandas = () => {
    return (
        <Tab.Navigator
            initialRouteName='NuevaOrden'
            tabBarPosition='top'
            initialLayout={{ width: Dimensions.get('window').width }}
            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#252525' },
                tabBarActiveTintColor: 'aqua',
            }}
        >
            <Tab.Screen
                name='Nueva Orden'
                component={NuevaOrden}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name='post-add' size={28} color='#fff' />
                    ),
                }}
            />
            <Tab.Screen
                name='Mesas'
                component={Mesas}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons
                            name='restaurant'
                            size={28}
                            color='#fff'
                        />
                    ),
                }}
            />

            <Tab.Screen
                name='Productos'
                component={getProductos}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='user' size={28} color='#fff' />
                    ),
                }}
            />
        </Tab.Navigator>
        // <Tab.Navigator
        //     initialRouteName='NuevaOrden'
        //     tabBarOptions={{
        //         activeTintColor: 'aqua',
        //         activeBackgroundColor: '#252525',
        //         inactiveTintColor: '#fff',
        //         inactiveBackgroundColor: '#777777',
        //         // style: { backgroundColor: '#000' },
        //         showLabel: true,
        //     }}
        //     screenOptions={{
        //         tabBarStyle: { position: 'absolute' },
        //     }}
        // >
        //     <Tab.Screen
        //         name='Nueva Orden'
        //         component={NuevaOrden}
        //         options={{
        //             tabBarIcon: () => (
        //                 <FontAwesome5 name='plus' size={30} color='#fff' />
        //             ),
        //         }}
        //     />
        //     <Tab.Screen
        //         name='Mesas'
        //         component={Mesas}
        //         options={{
        //             tabBarIcon: () => (
        //                 <MaterialIcons
        //                     name='add-shopping-cart'
        //                     size={30}
        //                     color='#fff'
        //                 />
        //             ),
        //         }}
        //     />
        //     <Tab.Screen
        //         name='Perfil'
        //         component={Perfil}
        //         options={{
        //             tabBarIcon: () => (
        //                 <Entypo name='text' size={30} color='#fff' />
        //             ),
        //         }}
        //     />
        // </Tab.Navigator>
    );
};

export default Comandas;
