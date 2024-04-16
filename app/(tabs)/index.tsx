import { Animated as RNAnimated, View, Text, TouchableOpacity, ScrollView, RefreshControl, Dimensions, AppState, StyleSheet, Platform, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Notification1, SearchNormal1, User, Location, Shop, ArrowDown2, Heart, Element, ArrowLeft, CloseSquare, ArrowCircleRight, RecordCircle, Timer, Clock } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { Image } from 'expo-image'
import Animated, { Easing, FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStores } from '../reduxStore/storeSlice'
import { fetchStoresTypes } from '../reduxStore/storeTypeSlice'
import { RootState } from '../reduxStore'
import { fetchCategories } from '../reduxStore/categorySlice'

const Page = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [savedAddress, setSavedAddress] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [close, setClose] = useState<boolean>(false);
    const [orderExists, setorderExists] = useState(false)

    const inputRef = useRef<TextInput>(null);
    const overlayOpacity = useSharedValue(1);
    const searchResult = useSharedValue(0);
    const inputY = useSharedValue(0);

    const dispatch = useDispatch<any>()

    const {stores} = useSelector((state: RootState) => state.store)
    const {storeTypes} = useSelector((state: RootState) => state.storeType)
    const {categories} = useSelector((state: RootState) => state.category)

    useEffect(() => {
        dispatch(fetchStores())
        dispatch(fetchStoresTypes())
        dispatch(fetchCategories())
    }, [])


    const onFocus = () => {
        setIsFocused(true);
        inputY.value = withSpring(-70, {
            duration: 1500,
            stiffness: 20,
        });
        overlayOpacity.value = withSpring(0, {
            duration: 200,
        });
        searchResult.value = withSpring(1);
    };

    const onBlur = () => {
        Keyboard.dismiss();
        setIsFocused(false);
        inputY.value = withSpring(10, {
            duration: 1500,
            stiffness: 20,
        });
        overlayOpacity.value = withSpring(1);
        searchResult.value = withSpring(0);
    };

    const animatedInputStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: inputY.value }],
    }));

    const animatedOverlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));


    const onSearch = (text: string) => {
        setSearch(text);
        setClose(text !== '');
    };


    const maxLength = 20;
    const trimmedAdress = savedAddress.length > maxLength ? `${savedAddress.substring(0, maxLength)}...` : savedAddress;


    useEffect(() => {
        const loadAddress = async () => {
            try {
                const storedAddress = await AsyncStorage.getItem('savedAddress');
                if (storedAddress) {
                    setSavedAddress(storedAddress);
                }
            } catch (error) {
            }
        };

        loadAddress();
    }, []);


    const spinValue = useRef(new RNAnimated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            spinValue.setValue(0);
            RNAnimated.timing(spinValue, {
                toValue: 1,
                duration: 1300,
                easing: Easing.circle,
                useNativeDriver: true,
            }).start(() => {
                spinValue.setValue(1);
                animate();
            });
        };
        animate();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });


   
    const getStoreTypeName = (storeTypeId: string) => {
        const storeType = storeTypes.find(type => type.id === storeTypeId);
        return storeType ? storeType.name : "Unknown Type";
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchStores()
        setTimeout(() => {
            setRefreshing(false);
        }, 600);
    };

    const handleRouteStoreDetails = (store: any) => {
        const storeTypeName = getStoreTypeName(store.storeTypeId);
        router.push({
            pathname: '/storeDetails/[id]',
            params: {
                id: store.id,
                name: store.name,
                storeTypeName,
                isOpen: store.isOpen
            }
        });
    };


    return (
        <>
            <View className='w-screen  h-screen absolute z-0 left-0 top-0 bg-[#FFFFFC]'>
            </View>


            <Animated.View style={styles.header} className='h-full' entering={FadeIn.springify().duration(400)}>
                <StatusBar style='dark' />

                <View className='bg-[#FFFFFC] z-0 border-b  border-[#757780]/5 px-6 py-1 pb-6 flex justify-between items-center flex-row '>
                    <TouchableOpacity onPress={() => router.push('/(modals)/manageAddresses')}>
                        <View className='flex items-center flex-row'>
                            <Location size={16} color={Colors.primary} variant='Bulk' />
                            <Text className='text-[#0b0b0b]/60 ml-1' style={{ fontFamily: "medium" }}>Достави на</Text>
                            <ArrowDown2 className='ml-0.5' size={14} color={Colors.dark} variant='Linear' />
                        </View>
                        {savedAddress ?
                            (
                                <Text className='text-[#0b0b0b] mt-1 ' style={{ fontFamily: 'medium' }}>{trimmedAdress}</Text>

                            ) :

                            (
                                <Text className='text-[#0b0b0b] mt-1 ' style={{ fontFamily: 'medium' }}>Внесете адреса</Text>
                            )
                        }
                    </TouchableOpacity>

                    <View className='flex flex-row items-center gap-x-2'>
                        <TouchableOpacity onPress={() => router.push('/(user)/notifications')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                            {/* <View className='rounded-full absolute z-10 right-3.5 top-3 flex justify-center items-center'>
                                <RecordCircle variant='Bulk' size={16} color={Colors.primary} />
                            </View> */}
                            <Notification1 color={Colors.dark} size={20} variant='Broken' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(user)/profile')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
                            <User color={Colors.dark} size={20} variant='Broken' />
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView keyboardShouldPersistTaps="always" removeClippedSubviews showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
                    onRefresh={onRefresh} className='' />}>
                    <Animated.View style={animatedOverlayStyle} className='mt-4 mb-2 px-6'>

                        <View className='z-0 w-full items-start flex-col flex justify-between'>
                            <View className='flex flex-col mt-2'>
                                <Animated.Text entering={FadeInDown.springify().duration(300).delay(200)} className='text-4xl text-[#1dd868]' style={{ fontFamily: 'heavy' }} >GRIC</Animated.Text>
                                <Animated.Text entering={FadeInDown.springify().duration(300).delay(200)} className='mt-[-3px] text-[#0b0b0b]/80' style={{ fontFamily: 'heavy' }} >DELIVERY</Animated.Text>
                            </View>
                        </View>


                    </Animated.View>

                    <Animated.View style={animatedInputStyle}>
                        <View className='mx-6 bg-[#fafafa]/80 z-[999] items-center flex-row px-5 rounded-2xl'>
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

                            <TextInput style={styles.input} onChangeText={onSearch} onFocus={onFocus}
                                onBlur={onBlur} className='text-[#0b0b0b] px-3 flex-1 ' placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />
                            <TouchableOpacity onPress={() => { setSearch(''); inputRef.current?.clear(); setClose(false) }} className={close ? 'flex justify-center items-center opacity-100' : ' opacity-0'}>
                                <CloseSquare size={24} color={Colors.dark} variant='Bold' />
                            </TouchableOpacity>

                        </View>

                        <KeyboardAvoidingView>
                            <View className={isFocused ? 'flex h-full mt-8 px-6' : 'hidden h-full mt-8 px-6'}>
                                <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "semibold" }}>Популарни Ресторани</Text>
                                <ScrollView keyboardShouldPersistTaps="always"
                                    showsVerticalScrollIndicator={false} className='flex flex-col mt-3' >
                                    {stores.map((store, index) => (
                                        <TouchableOpacity key={index} className='w-full flex-row  flex items-center justify-between'>
                                            <View className='flex items-center flex-row gap-x-4'>
                                                <Shop color={Colors.primary} size={25} variant='Bulk' />
                                                <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                                                    <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>{store.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </KeyboardAvoidingView>
                    </Animated.View>


                    <Animated.View style={animatedOverlayStyle} className='w-full mt-4 px-6 justify-between items-end flex flex-row'>
                        <View className='flex flex-col ml-1'>
                            <View className='flex items-center flex-row gap-x-2'>
                                <Element size={19} color={Colors.primary} variant='Bulk' />
                                <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>Категории</Text>
                            </View>
                            <Text className='text-xs text-[#0b0b0b]/60 ' style={{ fontFamily: 'medium' }}>Популарни Категории</Text>
                        </View>

                    </Animated.View>


                    <ScrollView removeClippedSubviews horizontal contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} className='flex-row' snapToInterval={324} decelerationRate={'fast'}
                        snapToAlignment='end'
                        showsHorizontalScrollIndicator={false} >
                        <Animated.View entering={FadeIn.springify().duration(300).delay(100)} className='flex flex-row items-center px-6 gap-x-2'>
                            {categories.map((category, index) => (
                                index < 12 && (
                                    <TouchableOpacity onPress={() => router.push("/category")} key={index} className='flex justify-center'>
                                        <Image style={{ tintColor: '#0b0b0b' }} className='w-9 h-9 z-10 top-4 self-center' contentFit='contain' source={require('../../assets/images/burger.png')} />
                                        <View className='bg-[#fafafa]/80  w-20 py-3 rounded-2xl flex justify-center items-center'>
                                            <Text className='text-[#0b0b0b]/80 mt-4 text-xs' style={{ fontFamily: 'semibold' }}>{category.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            ))}
                        </Animated.View>
                    </ScrollView>


                    <Animated.View style={animatedOverlayStyle} className='mt-4'>
                        <View className='w-full px-6 justify-between items-center flex flex-row'>
                            <View className='flex flex-col ml-1'>
                                <View className='flex items-center flex-row gap-x-2'>
                                    <Shop size={19} color={Colors.primary} variant='Bulk' />
                                    <Text className='text-xl text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>Ресторани</Text>
                                </View>
                                <Text className='text-xs text-[#0b0b0b]/60 ' style={{ fontFamily: 'medium' }}>Популарни Ресторани</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/(tabs)/stores')} >
                                <ArrowCircleRight size={25} color={Colors.dark} variant='Linear' />
                            </TouchableOpacity>
                        </View>

                        <View className='w-full mt-3 '>

                            <ScrollView
                                removeClippedSubviews
                                horizontal
                                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                                className='flex-row '
                                snapToAlignment='start'
                                showsHorizontalScrollIndicator={false}
                                decelerationRate={'fast'}
                                snapToInterval={290 + 12}
                            >
                                <View className='flex px-6 flex-row items-center gap-x-3'>
                                    {stores.map((store, index) => (
                                        index < 6 && (

                                            <TouchableOpacity key={index} onPress={() => handleRouteStoreDetails(store)} className='flex-1 items-start'>
                                                <View
                                                    className='w-[290px] h-32 p-5 bg-[#fafafa] rounded-3xl'
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <View className='flex flex-row items-center justify-between w-full'>


                                                    </View>
                                                </View>

                                                <View className='ml-1 mt-2'>
                                                    <View className='flex w-full flex-row justify-between items-center'>
                                                        <Text className='text-lg ' style={{ fontFamily: "semibold" }}>{store.name}</Text>
                                                        <View>
                                                            <View className='px-2.5 py-1.5 bg-[#fafafa] flex items-center justify-center rounded-full'>
                                                                <Text style={{ fontFamily: "semibold" }} className='text-xs'>25-30 мин</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className='flex flex-row items-center'>
                                                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }}>{getStoreTypeName(store.storeTypeId)} · </Text>
                                                        <Text className='text-[#0b0b0b]/60 text-sm' style={{ fontFamily: "medium" }} >{store.isOpen ? 'Отворено' : 'Затворено'}</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        )
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                    </Animated.View>
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

                        <RNAnimated.View style={{ transform: [{ rotate: spin }] }}>
                            <Timer variant='Bulk' color={Colors.primary} size={36} />
                        </RNAnimated.View>
                    </TouchableOpacity>
                </View>


            </Animated.View >


        </>
    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 58 : 52,
    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    }
});