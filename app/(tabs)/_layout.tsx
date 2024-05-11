import React, { useEffect } from 'react'
import { Tabs, usePathname } from 'expo-router'
import Colors from '../../constants/Colors'
import { Archive, DirectboxNotif, Home2, Map, Map1, Shop, ShoppingCart, User } from 'iconsax-react-native';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { fetchUserInfo } from '../reduxStore/userSlice';

const Layout = () => {

    const currentPath = usePathname();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.user);
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

            }} redirect={user.role === 'DELIVERER'}  />

            <Tabs.Screen name='stores' options={{
                tabBarHideOnKeyboard: true,
                tabBarLabel: 'Храна',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Shop variant={currentPath === '/stores' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} redirect={user.role === 'DELIVERER'}  />

            <Tabs.Screen name='map' options={{
                tabBarLabel: 'Мапа',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Map1 variant={currentPath === '/map' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} redirect={user.role === 'DELIVERER'}  />

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
            }} redirect={user.role === 'DELIVERER'}  />


            <Tabs.Screen name='(deliverer)/orders' options={{
                tabBarLabel: 'Нарачки',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <DirectboxNotif variant={currentPath === '/orders' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} redirect={user.role === 'CUSTOMER'}  />

            <Tabs.Screen name='(deliverer)/map' options={{
                tabBarLabel: 'Мапа',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Map variant={currentPath === '/map' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} redirect={user.role === 'CUSTOMER'} />

            <Tabs.Screen name='(deliverer)/profile' options={{
                tabBarLabel: 'Профил',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <User variant={currentPath === '/profile' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} redirect={user.role === 'CUSTOMER'} />
        </Tabs>
    )
}

export default Layout