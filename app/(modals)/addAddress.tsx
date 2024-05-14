import { View, Text, StyleSheet, Platform, TextInput, Alert, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowDown, Edit, InfoCircle, Location, SaveAdd } from 'iconsax-react-native'
import { router } from 'expo-router'
import Colors from '../../constants/Colors'
import * as ExpoLocation from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchAddress } from '../reduxStore/addressSlice'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import { customMapStyle } from '../../mapStyle'

const Page = () => {

    const dispatch = useDispatch<any>()
    const { accessToken } = useSelector((state: RootState) => state.accessToken)

    const INITIAL_REGION = {
        latitude: 41.43917545031447,
        longitude: 22.642414349452316,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }

    const [mapRegion, setMapRegion] = useState(INITIAL_REGION);;


    const personId = useSelector((state: RootState) => state.user.id)

    const [addressDescription, setaddressDescription] = useState<string>('')
    const [street, setstreet] = useState<any>(null)
    const [streetNumber, setstreetNumber] = useState<any>(null)
    const [flat, setFlat] = useState<string>('');
    const [apartment, setApartment] = useState<string>('');


    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                const location = await ExpoLocation.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                const addressResponse = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
                if (addressResponse.length > 0) {
                    setstreet(street);
                    setstreetNumber(streetNumber);
                    setMapRegion({ ...mapRegion, latitude, longitude });
                }
            } catch (error) {
            }
        };

        getCurrentLocation();
    }, []);

    const handleRegionChangeComplete = async (newRegion: any) => {
        
        try {
            const addressResponse = await ExpoLocation.reverseGeocodeAsync({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
            });

            if (addressResponse.length > 0) {
                const { street, streetNumber } = addressResponse[0];
                const newAddress = `${street || ''} ${streetNumber || ''}`;
                setstreet(street);
                setstreetNumber(streetNumber)

            }
        } catch (error) {
        }

        setMapRegion(newRegion);
    };

    const geocodeAddress = async () => {
        if (!street || !streetNumber) {
            return;
        }

        try {
            const address = `${street} ${streetNumber}`;
            const geocodeResponse = await ExpoLocation.geocodeAsync(address);

            if (geocodeResponse.length > 0) {
                const { latitude, longitude } = geocodeResponse[0];
                const newRegion = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                };
                setMapRegion(newRegion);
            }
        } catch (error) {
        }
    };

    const addAddress = async () => {
        try {

            if (!addressDescription) {
                Alert.alert(
                    "Адреса на достава",
                    "Полето 'зачувај адреса како' е празно.",
                    [
                        { text: "Океј", style: "cancel" },
                    ]
                );

            } else if (street === null) {
                Alert.alert(
                    "Адреса на достава",
                    "Внесете име и број на улица.",
                    [
                        { text: "Океј", style: "cancel" },
                    ]
                );
            } else {
                const response = await fetch(`http://172.20.10.2:8080/address?personId=${personId}`, {
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
                        latitude: mapRegion?.latitude,
                        longitude: mapRegion?.longitude
                    }),
                })

                if (response.ok) {
                    dispatch(fetchAddress({ personId, accessToken }))
                    router.back()
                }
            }
        } catch (error) {
            console.log(error)
        }

    };



    return (
        <View style={styles.header} className='bg-[#FFFFFC] px-6 flex-1'>

            <View className='flex flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                    <ArrowDown variant='Broken' size={20} color={Colors.dark} />
                </TouchableOpacity>

                <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Додај адреса</Text>
                <Text className='text-4xl text-[#1BD868]' style={{ fontFamily: "heavy" }}>G</Text>
            </View>



            <View className='mt-5 flex-1'>
            
                <View className='flex  flex-row items-center ml-1'>
                    <Location variant='Bulk' color={Colors.dark} size={18} />
                    <Text style={{ fontFamily: "medium" }} className='ml-1 text-[15px] text-[#0b0b0b]'>Податоци на адреса</Text>
                </View>
                <View className='flex flex-row items-center space-x-2 mt-2'>
                    <TextInput onChange={geocodeAddress} onChangeText={(text) => setstreet(text)} value={street !== null ? street : ''} style={{ fontFamily: 'medium' }} className='px-5 flex-1  py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholder='Име на улица' placeholderTextColor='#0b0b0b97' />
                    <TextInput onChange={geocodeAddress} onChangeText={(text) => setstreetNumber(text)} value={streetNumber} maxLength={5} style={{ fontFamily: 'medium' }} className='p-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholder='Број' placeholderTextColor='#0b0b0b97' />
                </View>


                <View className='mt-3'>
                    <TextInput value={addressDescription} selectionColor={Colors.primary} onChangeText={(text) => setaddressDescription(text)} style={{ fontFamily: 'medium' }} className=' px-5 py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80' placeholder='Зачувај како:  Дома/Работа..' placeholderTextColor='#0b0b0b97' />
                </View>


                <View className='mt-3'>
                    <Text className='text-[#0b0b0b]/60 text-[10px] ml-2 mb-1.5' style={{ fontFamily: 'medium' }}>Опционално*</Text>
                    <View className='flex flex-row space-x-2 items-center'>
                        <TextInput onChangeText={(text) => setFlat(text)} value={flat} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на кат' placeholderTextColor='#0b0b0b97' />
                        <TextInput onChangeText={(text) => setApartment(text)} value={apartment} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2  rounded-2xl bg-[#fafafa]/80' placeholder='Број на стан' placeholderTextColor='#0b0b0b97' />
                    </View>
                </View>


                <View className='rounded-3xl my-3 border-2 border-[#0b0b0b] flex-1  overflow-hidden'>
                    <MapView
                        region={mapRegion}
                        onRegionChangeComplete={handleRegionChangeComplete}
                        className='w-full flex h-full justify-center relative items-center'
                        showsCompass={false}
                        maxDelta={0.05}
                        provider={PROVIDER_DEFAULT}
                        customMapStyle={customMapStyle}
                    />
                    <View pointerEvents="none" style={styles.markerFixed}>
                        <Location size={26} color={Colors.white} variant='Bold' />
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={addAddress} className='bg-[#0b0b0b] mb-2 py-6 flex justify-center flex-row  items-center rounded-2xl'>
                <SaveAdd variant='Bulk' color={Colors.primary} size={22} />
                <Text style={{ fontFamily: "medium" }} className='text-[#FFFFFC] ml-2'>Зачувај адреса</Text>
            </TouchableOpacity>
        </View >

    )
}

export default Page

const styles = StyleSheet.create({
    header: {
        paddingTop: (Platform.OS === 'android') ? 48 : 28,
        paddingBottom: (Platform.OS === 'android') ? 20 : 28,

    },
    input: {
        paddingVertical: (Platform.OS === 'android') ? 16 : 22,
        fontFamily: 'medium',
    },
    markerFixed: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -13,
        marginTop: -13,
    },
});