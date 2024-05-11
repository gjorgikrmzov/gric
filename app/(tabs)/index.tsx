import { Animated as RNAnimated, View, Text, TouchableOpacity, ScrollView, RefreshControl, Dimensions, AppState, StyleSheet, Platform, TextInput, Keyboard, KeyboardAvoidingView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User, Location, Shop, ArrowDown2, Heart, Element, ArrowLeft, CloseSquare, ArrowCircleRight, RecordCircle, Timer, Clock, MessageQuestion } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import Animated, { Easing, FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStores } from '../reduxStore/storeSlice'
import { fetchStoresTypes } from '../reduxStore/storeTypeSlice'
import { RootState } from '../reduxStore'
import { fetchCategories } from '../reduxStore/categorySlice'
import { fetchUserInfo } from '../reduxStore/userSlice'

const Page = () => {

    const dispatch = useDispatch<any>()

    const { stores } = useSelector((state: RootState) => state.store)
    const { storeTypes } = useSelector((state: RootState) => state.storeType)
    const { categories } = useSelector((state: RootState) => state.category)
    const { accessToken } = useSelector((state: RootState) => state.accessToken)
    const addresses = useSelector((state: RootState) => state.user.addresses)

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const [savedAddress, setSavedAddress] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [filteredStores, setFilteredStores] = useState(stores);

    const overlayOpacity = useSharedValue(1);
    const searchResult = useSharedValue(0);
    const inputY = useSharedValue(0);

    const [orderExists, setorderExists] = useState(false)

    useEffect(() => {
        if (accessToken) {
            Promise.all([
                dispatch(fetchStores(accessToken)),
                dispatch(fetchStoresTypes(accessToken)),
                dispatch(fetchCategories(accessToken)),
            ]).then(() => {
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
        }
    }, [accessToken, dispatch]);


    const onFocus = () => {
        setIsFocused(true);
        inputY.value = withTiming(-70, {
            easing: Easing.elastic(),
            duration: 350
        });
        overlayOpacity.value = withTiming(0, {
            duration: 100
        });

        searchResult.value = withTiming(1);
    };

    const onBlur = () => {
        Keyboard.dismiss();
        setIsFocused(false);
        inputY.value = withTiming(10, {
            duration: 350,
            easing: Easing.elastic()
        });

        overlayOpacity.value = withTiming(1);
        searchResult.value = withTiming(0);
    };

    const animatedInputStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: inputY.value }],
    }));

    const animatedOverlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));


    useEffect(() => {
        if (search.trim() === '') {
            setFilteredStores(stores);
        } else {
            const lowercasedQuery = search.toLowerCase();
            const filtered = stores.filter(store =>
                store.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredStores(filtered);
        }
    }, [search, stores]);

    const handleSearchChange = (text: string) => {
        setSearch(text);
    };


    const getStoreTypeName = (storeTypeId: string) => {
        const storeType = storeTypes?.find(type => type.id === storeTypeId);
        return storeType ? storeType.name : "Unknown Type";
    };

    const onRefresh = () => {
        setRefreshing(true);
        setIsLoading(true)
        dispatch(fetchStores(accessToken))
        dispatch(fetchStoresTypes(accessToken))
        dispatch(fetchCategories(accessToken))
        setTimeout(() => {
            setRefreshing(false);
            setIsLoading(false)
        }, 600);
    };

    const handleRouteStoreDetails = (store: any) => {
        const storeTypeName = getStoreTypeName(store.storeTypeId);
        router.push({
            pathname: '/storeDetails/[id]',
            params: {
                id: store.id,
                name: store.name,
                isOpen: store.isOpen,
                storeTypeName,
                accessToken
            }
        } as any);
    };


    return (
        <>
            <View className='w-screen  h-screen absolute z-0 left-0 top-0 bg-[#FFFFFC]'>
            </View>


            <SafeAreaView className='flex-1' style={styles.header}>
                <StatusBar style='dark' />

                <View className='bg-[#FFFFFC] z-0 border-b  border-[#757780]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row '>



                    <TouchableOpacity onPress={() => router.push('/(modals)/manageAddresses')}>
                        <View className='flex items-center flex-row ml-1'>
                            <Location size={14} color={Colors.primary} variant='Bulk' />
                            <Text className='text-[#0b0b0b]/60 ml-1 text-xs' style={{ fontFamily: "medium" }}>Достави на</Text>
                            <ArrowDown2 className='ml-0.5' size={12} color={Colors.dark} variant='Linear' />
                        </View>
                        <View className='rounded-2xl mt-1 px-6 py-2.5 flex items-center justify-center bg-[#fafafa]'>
                            {addresses.length > 0 ? (
                                    <Text className='text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>{addresses[0].street}</Text>
                            ) : (
                                <Text className='text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Внесете адреса</Text>
                            )}
                        </View>
                    </TouchableOpacity>


                    <View className='flex flex-row items-center gap-x-2'>

                        <TouchableOpacity onPress={() => router.push('/(user)/notifications')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                            <View className='rounded-full absolute z-10 right-3.5 top-3 flex justify-center items-center'>
                                <RecordCircle variant='Bulk' size={16} color={Colors.primary} />
                            </View>
                            <Notification1 color={Colors.dark} size={20} variant='Broken' />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/(user)/profile')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                            <User color={Colors.dark} size={20} variant='Broken' />
                        </TouchableOpacity>
                    </View>
                </View>



                <ScrollView
                    keyboardShouldPersistTaps="always"
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.dark}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >

                    <Animated.View style={animatedOverlayStyle} className='mt-4 px-6'>
                        <View className='flex flex-col'>

                            <Animated.Text entering={FadeInDown.springify().duration(600).delay(100)} className='text-4xl text-[#1BD868]' style={{ fontFamily: 'heavy' }} >GRIC</Animated.Text>
                            <Animated.Text entering={FadeInDown.springify().duration(600).delay(200)} className='mt-[-3px] text-[#0b0b0b]/80' style={{ fontFamily: 'heavy' }} >DELIVERY</Animated.Text>
                        </View>
                    </Animated.View>


                    <View>
                        <Animated.View className='mt-3' style={animatedInputStyle}>
                            <View className='mx-6  bg-[#fafafa] z-[999] items-center flex-row px-5 rounded-2xl'>
                                {
                                    isFocused ?
                                        (
                                            <TouchableOpacity onPress={onBlur} className=' flex justify-center items-center'>
                                                <ArrowLeft size={20} color={Colors.dark} variant='Broken' />
                                            </TouchableOpacity>

                                        ) :

                                        (
                                            <SearchNormal1 size={20} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
                                }

                                <TextInput style={styles.input} onChangeText={handleSearchChange} onFocus={onFocus}
                                    onBlur={onBlur} className='text-[#0b0b0b] px-3 flex-1 ' placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />
                            </View>

                            <View className={isFocused ? 'flex h-full px-6' : 'hidden h-full px-6'}>
                                <ScrollView keyboardShouldPersistTaps="always"
                                    showsVerticalScrollIndicator={false} className='flex flex-col' >
                                    <Text className={search == '' ? 'text-[#0b0b0b]/60  mt-5' : 'hidden'} style={{ fontFamily: "semibold" }}>Препорачани</Text>
                                    {filteredStores.map((store, index) => (
                                        index < 5 && (
                                            <TouchableOpacity onPress={() => handleRouteStoreDetails(store)} key={index} className='w-full flex-row  flex items-center justify-between'>
                                                <View className='flex items-center flex-row gap-x-4'>
                                                    <Shop color='#757780' size={25} variant='Broken' />
                                                    <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>{store.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    ))}

                                    {filteredStores.length === 0 ? (
                                        <View className='flex-1 mt-6 justify-center items-center flex '>
                                            <View className='w-14 h-14 bg-[#fafafa] flex justify-center items-center rounded-lg'>
                                                <MessageQuestion size={26} color={Colors.primary} variant='Bulk' />
                                            </View>
                                            <Text className='text-center mt-2 text-[#0b0b0b]/60 text-[16px]' style={{ fontFamily: "medium" }}>Нема пронајдено {'\n'} резултати</Text>
                                        </View>
                                    ) : null}
                                </ScrollView>
                            </View>
                        </Animated.View>


                        <ScrollView removeClippedSubviews horizontal contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} className='flex-row mt-2' snapToInterval={324} decelerationRate={'fast'}
                            snapToAlignment='end'
                            showsHorizontalScrollIndicator={false} >
                            <Animated.View entering={FadeIn.springify().duration(300).delay(100)} className='flex flex-row  items-center px-6 gap-x-2'>
                                {categories && categories.map((category, index) => (
                                    index < 8 && (
                                        <TouchableOpacity key={index} className='flex justify-center'>
                                            <Image
                                                style={{ tintColor: '#0b0b0b' }}
                                                className='w-10 h-10 z-10 top-4 self-center'
                                                contentFit='fill'
                                                source={require('../../assets/images/pizza.svg')}
                                            />
                                            <View className='bg-[#fafafa] w-20 py-3 rounded-2xl flex justify-center items-center'>
                                                <Text className='text-[#0b0b0b]/80 mt-4 text-xs' style={{ fontFamily: 'semibold' }}>{category.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                ))}
                            </Animated.View>
                        </ScrollView>
                    </View>

                    <Animated.View style={animatedOverlayStyle} className='mt-4'>
                        <View className='w-full px-6 justify-between items-center flex flex-row'>
                            <View className='flex flex-row items-center'>
                                <Shop size={18} color={Colors.primary} variant='Bulk' />
                                <Text className='text-[16px] text-[#0b0b0b] ml-1' style={{ fontFamily: 'semibold' }}>Препорачано</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/(tabs)/stores')} >
                                <ArrowCircleRight size={22} color={Colors.dark} variant='Broken' />
                            </TouchableOpacity>
                        </View>


                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            decelerationRate={'fast'}
                            snapToAlignment='end'
                            data={stores.slice(0, 4)}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={index} onPress={() => handleRouteStoreDetails(item)} style={index === stores.length - 1 ? { marginRight: 0 } : { marginRight: 10 }}
                                    className={index === stores.length - 1 ? '' : 'mr-3'}>
                                    <View className='w-[290px] mt-3  h-32 p-5 bg-[#fafafa] rounded-3xl' style={{ overflow: 'hidden' }}>
                                    </View>
                                    <View className='ml-1 mt-2'>
                                        <View className='flex flex-row items-center justify-between'>
                                            <Text className='text-lg ' style={{ fontFamily: "semibold" }}>{item.name}</Text>

                                            <View className='px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-full'>
                                                <Text style={{ fontFamily: "semibold" }} className='text-xs'>25-30 мин</Text>
                                            </View>
                                        </View>

                                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{getStoreTypeName(item.storeTypeId)} · {item.isOpen ? 'Отворено' : 'Затворено'}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingHorizontal: 24 }}
                        />


                    </Animated.View>

                    <View>
                        <View className='w-full mb-4 mt-6 bg-[#0b0b0b]/5 h-[1px]'></View>

                        <FlatList
                            data={stores}
                            scrollEnabled={false}
                            className='px-6 pb-4'
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (

                                <TouchableOpacity className='mt-3 pb-1' onPress={() => handleRouteStoreDetails(item)}>
                                    <View className='flex overflow-hidden relative'>
                                        <View className='w-full h-40 p-5 bg-[#fafafa] rounded-2xl overflow-hidden'>
                                            <View className='flex flex-row items-center justify-end w-full'>
                                                <TouchableOpacity className='flex flex-row items-center'>
                                                    <Heart color={Colors.dark} size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <View className='ml-1 mt-2'>
                                        <View className='flex flex-row w-full justify-between items-center'>
                                            <Text className='text-lg ' style={{ fontFamily: "semibold" }}>{item.name}</Text>
                                            <View className='px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-full'>
                                                <Text style={{ fontFamily: "semibold" }} className='text-xs'>25-30 мин</Text>
                                            </View>
                                        </View>
                                        <View className='flex flex-row items-center'>
                                            <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{getStoreTypeName(item.storeTypeId)} · </Text>
                                            <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{item.isOpen ? 'Отворено' : 'Затворено'}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 6,
                                backgroundColor: '#FFFFFC',
                            }}
                        />
                    </View>

                </ScrollView>

                <View className={orderExists ? 'px-6 flex w-full justify-center items-center absolute bottom-4' : 'hidden'}>
                    <TouchableOpacity onPress={() => router.push('/(order)/trackOrder')} className='w-full p-4 rounded-2xl flex items-center justify-between flex-row bg-[#FFFFFC] shadow-md'>
                        <View className='flex flex-row items-center  space-x-3'>
                            <View className=' flex justify-center items-center w-20 h-20 bg-[#7577804C]/10 rounded-2xl overflow-hidden'></View>
                            <View className='flex flex-col'>
                                <Text className=' text-[#0b0b0b]/80 uppercase' style={{ fontFamily: "semibold" }}>Бу Хаус</Text>
                                <Text className=' mt-1 text-[#0b0b0b]' style={{ fontFamily: "medium" }}>x1 Бонапарата</Text>
                            </View>
                        </View>

                        <Timer variant='Bulk' color={Colors.primary} size={36} />
                    </TouchableOpacity>
                </View>


            </SafeAreaView>


        </>
    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 44 : 0,
    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    }
});