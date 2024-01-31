import React from 'react'
import { Tabs, usePathname } from 'expo-router'
import Colors from '../../constants/Colors'
import { Bag, DirectboxNotif, Home2, Map, Map1, SearchNormal1, Shop, User } from 'iconsax-react-native';

const Layout = () => {

    const currentPath = usePathname();


    return (

        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarStyle: { backgroundColor: Colors.white, borderTopColor: Colors.gray50, height: 110, paddingTop: 10, },
            tabBarItemStyle: { alignItems: 'center', justifyContent: 'center', display: 'flex', height: 60 },
            tabBarLabelStyle: { flex: 1, fontSize: 12 },
            tabBarIconStyle: { position: 'relative', backgroundColor: Colors.gray50, }
        }}>

            <Tabs.Screen name='index' options={{
                tabBarLabel: 'Дома',
                tabBarLabelStyle: { fontFamily: 'medium', fontSize: 12 },
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Home2 color={color} variant={currentPath === '/' ? 'Bold' : 'Broken'} size={size} />
                )
            }} />

            <Tabs.Screen name='restaurants' options={{
                tabBarLabel: 'Храна',
                tabBarLabelStyle: { fontFamily: 'medium', fontSize: 12 },
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Shop variant={currentPath === '/restaurants' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name='map' options={{
                tabBarLabel: 'Мапа',
                tabBarLabelStyle: { fontFamily: 'medium', fontSize: 12 },
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Map1 variant={currentPath === '/map' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />

            <Tabs.Screen name='cart' options={{
                tabBarLabel: 'Корпа',
                tabBarLabelStyle: { fontFamily: 'medium', fontSize: 12 },
                headerShown: false,
                tabBarBadge: 1,
                tabBarBadgeStyle: {
                    backgroundColor: Colors.dark,
                    fontFamily: 'extrabold', fontSize: 10,
                },
                tabBarIcon: ({ color, size }) => (
                    <Bag variant={currentPath === '/cart' ? 'Bold' : 'Broken'} size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}

export default Layout