import { View, Text, StyleSheet, Platform, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowDown, Location, SaveAdd } from 'iconsax-react-native'
import { router } from 'expo-router'
import Colors from '../../constants/Colors'
import * as ExpoLocation from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxStore'
import { fetchAddress } from '../reduxStore/addressSlice'
import MapView, { Marker, PROVIDER_DEFAULT} from 'react-native-maps'
import { customMapStyle } from '../../mapStyle'

interface LocationData {
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
}


const Page = () => {

    const dispatch = useDispatch<any>()
    const { accessToken } = useSelector((state: RootState) => state.accessToken)

    const INITIAL_REGION = {
        latitude: 41.43917545031447,
        longitude: 22.642414349452316,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }

    const [mapRegion, setMapRegion] = useState({
        latitude: 41.43917545031447,
        longitude: 22.642414349452316,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });


    const personId = useSelector((state: RootState) => state.user.id)

    const [location, setLocation] = useState<LocationData | null>(null);

    const [addressDescription, setaddressDescription] = useState<string>('')
    const [street, setstreet] = useState<any>('')
    const [streetNumber, setstreetNumber] = useState<any>('')

    const [flat, setFlat] = useState<string>('');
    const [apartment, setApartment] = useState<string>('');

    const [errorMessage, seterrorMessage] = useState<string | null>('')

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }

                const location = await ExpoLocation.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                const addressResponse = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
                if (addressResponse.length > 0) {
                    const { city, streetNumber, street } = addressResponse[0] as any;
                    const address = `${streetNumber || street || ''}`;

                    setstreet(street);
                    setstreetNumber(streetNumber);
                    setLocation({ latitude, longitude, address, city });
                    setMapRegion({ ...mapRegion, latitude, longitude });
                }
            } catch (error) {
                console.log('address error', error);
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
            console.log('pin error', error);
            seterrorMessage('Премногу обиди за адреса, обиди се повторно')
        }

        setMapRegion(newRegion);
    };

    const handleMarkerPositionChange = (newRegion: any) => {
        setMapRegion(newRegion);
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
                
                <View className='flex  flex-row items-center ml-1 mb-2'>
                    <Text style={{ fontFamily: "medium" }} className='ml-1 text-[#0b0b0b]/80'>Име и број на улица</Text>
                </View>
                <View className='flex flex-row items-center space-x-2'>
                    <TextInput onChangeText={(text) => setstreet(text)} readOnly={true} value={street ? street : 'Нема пронајдено улица'} style={{ fontFamily: 'medium' }} className='px-5 flex-1  py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholderTextColor='#0b0b0b97' />
                    <TextInput onChangeText={(text) => setstreetNumber(text)} readOnly={true} value={streetNumber} maxLength={5} style={{ fontFamily: 'medium' }} className='p-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 ' placeholderTextColor='#0b0b0b97' />
                </View>

                <View className='rounded-3xl mt-3  overflow-hidden'>
                    <MapView
                        region={INITIAL_REGION}
                        onRegionChange={handleMarkerPositionChange}
                        onRegionChangeComplete={handleRegionChangeComplete}
                        className='w-full h-44 flex justify-center relative items-center'
                        showsCompass={false}
                        maxDelta={0.05}
                        provider={PROVIDER_DEFAULT}
                        customMapStyle={customMapStyle}
                    >
                        <Marker coordinate={{ latitude: mapRegion.latitude!, longitude: mapRegion.longitude! }}>
                            <Location size={26} color={Colors.white} variant='Bold' />
                        </Marker>
                    </MapView>
                </View>

                {/* <View className='w-full mt-6 h-[1px] bg-[#0b0b0b]/5'></View> */}

                <View className='mt-6'>
                    <View className='flex flex-row items-center ml-1 '>
                        <Text style={{ fontFamily: "medium" }} className='ml-1 text-[#0b0b0b]/80'>Зачувај адреса како</Text>
                    </View>
                    <TextInput value={addressDescription} selectionColor={Colors.primary} onChangeText={(text) => setaddressDescription(text)} style={{ fontFamily: 'medium' }} className='mt-2 px-5 py-5 border-2 border-[#fafafa]/80 rounded-2xl bg-[#fafafa]/80 focus:border-[#1BD868]' placeholder='примеp: Дома/Работа' placeholderTextColor='#0b0b0b97' />
                </View>


                <View className=' ml-1 mt-6'>
                    <Text className='text-[#0b0b0b]/60 text-[10px] mb-1' style={{ fontFamily: 'medium' }}>Опционално*</Text>

                    <View className='flex flex-row items-center'>
                        <Text style={{ fontFamily: "medium" }} className='ml-1  text-[#0b0b0b]/80'>Додатни информации</Text>
                    </View>
                </View>
                <View className='flex flex-row mt-2 space-x-2 items-center'>
                    <TextInput onChangeText={(text) => setFlat(text)} value={flat} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на кат' placeholderTextColor='#0b0b0b97' />
                    <TextInput onChangeText={(text) => setApartment(text)} value={apartment} style={{ fontFamily: 'medium' }} selectionColor={Colors.primary} className='flex-1 px-5 py-5 border-2 border-[#fafafa]/80 focus:border-2 focus:border-[#1BD868]  rounded-2xl bg-[#fafafa]/80 ' placeholder='Број на стан' placeholderTextColor='#0b0b0b97' />
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
});