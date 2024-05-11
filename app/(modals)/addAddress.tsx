import { View, Text, StyleSheet, Platform, TextInput, Keyboard, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowDown, ArrowDown2, Briefcase, Gps, Home, Home2, InfoCircle, Location, SaveAdd } from 'iconsax-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../../constants/Colors'
import * as ExpoLocation from 'expo-location'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchUserInfo } from '../reduxStore/userSlice'

interface LocationData {
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
}


const Page = () => {

    const dispatch = useDispatch<any>()
    const { accessToken } = useSelector((state: RootState) => state.accessToken)

    const person = useSelector((state: RootState) => state.user)

    const [location, setLocation] = useState<LocationData | null>(null);

    const [addressDescription, setaddressDescription] = useState<string>('')
    const [street, setstreet] = useState<string>('')
    const [streetNumber, setstreetNumber] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false);
    const [flat, setFlat] = useState<string>('');
    const [apartment, setApartment] = useState<string>('');

    const getCurrentLocation = async () => {
        setLoading(true);
        try {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            const locationData = await ExpoLocation.getCurrentPositionAsync({});
            const { latitude, longitude } = locationData.coords;

            const addressResponse = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
            if (addressResponse.length > 0) {
                const { city, streetNumber, street } = addressResponse[0] as any;
                const address = `${streetNumber || street || ''}`;

                setstreet(street)
                setstreetNumber(streetNumber)
                setLocation({ latitude, longitude, city });
            }



        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    const addAddress = async () => {
        try {
            const response = await fetch(`http://172.20.10.2:8080/address?personId=${person.id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    name: addressDescription,
                    street: street,
                    streetNumber: streetNumber,
                    flat: flat,
                    apartment: apartment,
                    latitude: location?.latitude,
                    longitude: location?.longitude
                }),
            })

            if (response.ok) {
                dispatch(fetchUserInfo(accessToken))
            }

        } catch (error) {
            console.log(error)
        }

    };


    return (
        <SafeAreaView className='bg-[#FFFFFC] px-6 flex-1'>

            <View className='flex flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                    <ArrowDown variant='Broken' size={20} color={Colors.dark} />
                </TouchableOpacity>

                <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Додај адреса</Text>
                <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
            </View>

            {location ? (

                <View className='mt-8 flex-1'>
                    <View className='flex flex-row items-center ml-1 mb-2'>
                        <Location size={18} color={Colors.primary} variant='Bulk' />
                        <Text style={{ fontFamily: "medium" }} className='ml-1 text-[#0b0b0b]/80'>Име и број на улица</Text>
                    </View>
                    <View className='flex flex-row items-center space-x-2'>
                        <TextInput onChangeText={(text) => setstreet(text)} value={street} style={{ fontFamily: 'medium' }} className='px-5 flex-1  py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholderTextColor='#0b0b0b97' />
                        <TextInput onChangeText={(text) => setstreetNumber(text)} value={streetNumber} maxLength={5} style={{ fontFamily: 'medium' }} className='p-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholderTextColor='#0b0b0b97' />
                    </View>

                    <View className=' ml-1 mt-6'>
                        <Text className='text-[#0b0b0b]/60 text-[10px] mb-1' style={{ fontFamily: 'medium' }}>Опционално*</Text>

                        <View className='flex flex-row items-center'>
                            <InfoCircle size={18} color={Colors.primary} variant='Bulk' />
                            <Text style={{ fontFamily: "medium" }} className='ml-1  text-[#0b0b0b]/80'>Додатни информации</Text>
                        </View>
                    </View>
                    <View className='flex flex-row mt-2 space-x-2 items-center'>
                        <TextInput onChangeText={(text) => setFlat(text)} value={flat} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на кат' placeholderTextColor='#0b0b0b97' />
                        <TextInput onChangeText={(text) => setApartment(text)} value={apartment} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на стан' placeholderTextColor='#0b0b0b97' />
                    </View>


                    {/* <View className='mt-5'> 
                        <Text className='text-[16px] ml-2' style={{ fontFamily: "medium" }}>Зачувај адреса како</Text>
                        
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
                        
                    </View>  */}

                    <View className='w-full mt-6 h-[1px] bg-[#0b0b0b]/5'></View>

                    <View className='mt-6'>
                        <Text style={{ fontFamily: "medium" }} className='ml-1 '>Зачувај адреса како</Text>

                        <TextInput value={addressDescription} selectionColor={Colors.primary} onChangeText={(text) => setaddressDescription(text)} style={{ fontFamily: 'medium' }} className='mt-2 px-5 py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 focus:border-[#1BD868]' placeholder='примеp: Дома/Работа' placeholderTextColor='#0b0b0b97' />
                    </View>
                </View>


            ) : (
                <View className='flex-1 py-4 justify-end'>
                    <TouchableOpacity onPress={getCurrentLocation} className='py-6 rounded-2xl flex flex-row justify-center items-center bg-[#0b0b0b]'>
                        {loading ? (
                            <>
                                <ActivityIndicator size={22} />
                                <Text style={{ fontFamily: "medium" }} className='text-[#fafafa] ml-3'>Гриц ја бара вашата адреса</Text>
                            </>
                        ) : (
                            <>
                                <Gps size={22} color={Colors.primary} variant='Bulk' />
                                <Text style={{ fontFamily: "medium" }} className='ml-3 text-[#fafafa]'>Преземи моментална адреса</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <Text className='text-center mt-4 text-[#0b0b0b]/60 text-xs' style={{ fontFamily: "medium" }}>*Притиснете на копчето за да ја детектирате вашата адреса</Text>

                </View>
            )}

            {location ?
                (<>
                    <TouchableOpacity onPress={addAddress} className='bg-[#0b0b0b] mb-2 py-6 flex justify-center flex-row  items-center rounded-2xl'>
                        <SaveAdd variant='Bulk' color={Colors.primary} size={22} />
                        <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Зачувај адреса</Text>
                    </TouchableOpacity>
                </>
                ) : (
                    <></>
                )}
        </SafeAreaView>

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