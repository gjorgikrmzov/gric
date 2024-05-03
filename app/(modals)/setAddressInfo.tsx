import { View, Text, StyleSheet, Platform, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowDown, ArrowDown2, Briefcase, Gps, Home, Home2, Location, SaveAdd } from 'iconsax-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import * as ExpoLocation from 'expo-location'

interface LocationState {
    latitude?: number;
    longitude?: number;
    address?: string;
}

const Page = () => {

    const [location, setLocation] = useState<LocationState>({});
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [locationLoading, setLocationLoading] = useState(false);

    const getOpenCageAddress = async (latitude: number, longitude: number) => {
        const API_KEY = '54f5b2dbe0874bdcbf135f64a3667235';  // Use your actual API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
                const { components } = data.results[0];
                const { house_number, road } = components;
                return `${house_number || ''} ${road || ''}`;
            }
        } catch (error) {
            console.error("Failed to fetch address:", error);
            setErrorMsg('Failed to fetch address');
        } finally {
            setLocationLoading(false);
        }
        return '';
    };

    const getCurrentLocation = async () => {
        setLocationLoading(true);
        setErrorMsg('');
        let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLocationLoading(false);
            return;
        }

        let { coords } = await ExpoLocation.getCurrentPositionAsync({});
        const address = await getOpenCageAddress(coords.latitude, coords.longitude);
        setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            address,
        });

    };

    const addAddress = () => {
        router.push({ pathname: '/(modals)/manageAddresses', params: {address: location.address}} as any)
    }


    const [selectHome, setselectHome] = useState(true)
    const [selectJob, setselectJob] = useState(false)


    const handleSelectHome = () => {
        setselectHome(true)
        setselectJob(false)
    }

    const handleSelectJob = () => {
        setselectJob(true)
        setselectHome(false)
    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} className='flex-1 bg-[#FFFFFC]'>
            <View style={styles.header} className='bg-[#FFFFFC] px-6 flex-1 '>

                <View className='flex flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                        <ArrowDown variant='Broken' size={20} color={Colors.dark} />
                    </TouchableOpacity>

                    <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Додај адреса</Text>
                    <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
                </View>

                <View className='mt-8 flex-1'>

                    <TouchableOpacity onPress={getCurrentLocation} className='mb-4 py-5 rounded-2xl flex-row flex w-full justify-center items-center bg-[#0b0b0b]'>
                        <Gps size={22} color={Colors.primary} variant='Broken' />
                        <Text className='ml-3 text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Детектирај адреса</Text>
                    </TouchableOpacity>

                    <View className='flex flex-row items-center ml-1 mb-2'>
                        <Location size={18} color={Colors.primary} variant='Bulk' />
                        <Text style={{ fontFamily: "medium" }} className='ml-1 text-[#0b0b0b]/80'>Име на адреса</Text>
                    </View>
                    <TextInput style={{ fontFamily: "medium" }} className='px-5 py-5 rounded-2xl bg-[#fafafa]/80 ' value={location.address} editable={false} placeholder='Детектирана адреса' placeholderTextColor='#0b0b0b97' />
                    <View className='flex flex-row mt-3 space-x-2 items-center'>
                        <TextInput style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Кат' placeholderTextColor='#0b0b0b97' />
                        <TextInput style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на стан' placeholderTextColor='#0b0b0b97' />
                    </View>

                    <View className='mt-5 ml-1'>
                        <BouncyCheckbox
                            size={20}
                            fillColor={Colors.dark}
                            unfillColor={Colors.white}
                            text="Достави до врата"
                            textStyle={{ fontFamily: "medium", fontSize: 15, color: Colors.dark, textDecorationLine: 'none' }}
                            iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                            innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                            onPress={(isChecked: boolean) => { }}
                        />
                    </View>

                    <View className='mt-10'>
                        {/* <SaveAdd variant='Bulk' color={Colors.primary} size={22} /> */}
                        <Text className='text-lg ml-2' style={{ fontFamily: "medium" }}>Зачувај адреса како</Text>

                        <View className='mt-4 flex flex-row gap-x-3'>

                            <TouchableOpacity onPress={handleSelectHome} className={selectHome ? ' p-3.5 flex flex-col justify-between border-2 border-[#1BD868] flex-1  rounded-2xl' : ' border-2 border-[#0b0b0b]/5 p-3.5 flex flex-col justify-between flex-1  rounded-2xl'}>
                                <View className='justify-between items-center flex-row'>
                                    <Home2 size={22} color={selectHome ? Colors.primary : Colors.dark} variant={selectHome ? 'Bold' : 'Linear'} />
                                </View>
                                <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>Дома</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSelectJob} className={selectJob ? ' p-3.5 flex flex-col justify-between border-2 border-[#1BD868] flex-1  rounded-2xl' : ' border-2 border-[#0b0b0b]/5 p-3.5 flex flex-col justify-between flex-1  rounded-2xl'}>
                                <View className='justify-between items-center flex-row'>
                                    <Briefcase size={22} color={selectJob ? Colors.primary : Colors.dark} variant={selectJob ? 'Bold' : 'Linear'} />
                                </View>
                                <Text className='text-[#0B0B0B] mt-6' style={{ fontFamily: 'medium' }}>Работа</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <TouchableOpacity onPress={addAddress} className='bg-[#0b0b0b] mb-8 py-6 flex justify-center flex-row  items-center rounded-2xl'>
                    <SaveAdd variant='Bulk' color={Colors.primary} size={22} />
                    <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Додај адреса</Text>
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 40 : 30,
    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    },
});