import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Home = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Perfil' component={Perfil} />
            <Drawer.Screen name='Mesas' component={Mesas} />
        </Drawer.Navigator>
    );
};

export default Home;
