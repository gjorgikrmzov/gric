import React from 'react'
import { Tabs, usePathname } from 'expo-router'
import Colors from '../../constants/Colors'
import { Bag, DirectboxNotif, Home2, Map, Map1, SearchNormal1, Shop, ShoppingCart, User } from 'iconsax-react-native';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';

const Layout = () => {

    const currentPath = usePathname();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const numberOfCartItems: number = cartItems.length

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.dark,
            tabBarStyle: { backgroundColor: Colors.white, borderTopColor: '#0b0b0b2c', height: (Platform.OS === 'android') ? 90 : 110, paddingTop: 10 },
            tabBarItemStyle: { alignItems: 'center', justifyContent: 'center', display: 'flex', height: 60 },
            tabBarLabelStyle: { fontFamily: "medium", fontSize: 12 },
            tabBarIconStyle: { position: 'relative', backgroundColor: Colors.gray50, }
        }}>

            <Tabs.Screen name='index' options={{
                tabBarLabel: 'Дома',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Home2 color={color} variant={currentPath === '/' ? 'Bold' : 'Broken'} size={size} />
                )
            }} />

            <Tabs.Screen name='stores' options={{
                tabBarHideOnKeyboard: true,
                tabBarLabel: 'Храна',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Shop variant={currentPath === '/stores' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name='map' options={{
                tabBarLabel: 'Мапа',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Map1 variant={currentPath === '/map' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name='cart' options={{
                tabBarLabel: 'Корпа',
                headerShown: false,
                tabBarBadge: numberOfCartItems,
                tabBarBadgeStyle: {
                    display: numberOfCartItems === 0 ? 'none' : 'flex',
                    backgroundColor: Colors.dark,
                    fontFamily: 'extrabold', fontSize: 10,
                },
                tabBarIcon: ({ color, size }) => (
                    <ShoppingCart variant={currentPath === '/cart' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}

export default Layout