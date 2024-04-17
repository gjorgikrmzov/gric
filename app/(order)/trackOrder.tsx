import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, Linking, Modal, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft, Call, Clock, ExportSquare, Location, LocationAdd, SearchNormal1, Setting4, Shop, SidebarBottom, SidebarTop, StopCircle, TickCircle, Trash } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)
  const [currentSheetIndex, setcurrentSheetIndex] = useState(0)
  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);
  const [savedAddress, setSavedAddress] = useState<string>('');

  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const loadAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('savedAddress');
        if (storedAddress) {
          setSavedAddress(storedAddress);
          console.log('Address loaded from AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to fetch the address from AsyncStorage', error);
      }
    };

    loadAddress();
  }, []);

  const maxLength = 20;
  const trimmedAdress = savedAddress.length > maxLength ? `${savedAddress.substring(0, maxLength)}...` : savedAddress;

  
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 600); 
  };


  const makeCall = (number: string) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported: boolean) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err: any) => console.error(err));
  };


  const handleCancelOrder = () => {
    Alert.alert(
      'Откажи нарачка',
      'Дали сакате да ја откажете нарачката',
      [
        {
          text: 'Не',
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: () => {
            router.push('/(tabs)/')
          },
        },
      ],
    );
  };

  return (

    <>
      <View className='bg-[#FFFFFC] flex-1 h-screen'>
        <StatusBar style='auto' />
        <View style={styles.header} className='flex px-6 absolute left-0 z-20  w-full flex-row items-center justify-start'>
          <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
            <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
          </TouchableOpacity>

        </View>

        <View className='border-black/10  overflow-hidden'>
          <MapView 
            showsMyLocationButton={false} className='w-full h-full' showsCompass={false} focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >
              <Marker title='Bucks Pizza' description='Pizza Restaurant' coordinate={INITIAL_REGION}>
                <View className='w-6 h-6'>
                  <Shop size={24} variant='Bulk' color={Colors.white} />
                </View>
              </Marker>
          </MapView>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          backgroundStyle={{ backgroundColor: Colors.white }}
          handleIndicatorStyle={{ backgroundColor: Colors.dark }}
          snapPoints={snapPoints}
        >
          <View className='flex py-3 flex-col h-full pb-14'>
            <View className='px-6 flex flex-row items-center justify-between'>
              <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b]/80 text-lg'>Детали на нарачка</Text>
              <TouchableOpacity onPress={() => {
                const newIndex = currentSheetIndex === 2 ? 0 : 2; 
                snapeToIndex(newIndex);
                setcurrentSheetIndex(newIndex);
              }} className='w-12 h-12 flex justify-center items-center rounded-2xl bg-[#fafafa]/90'>
                
                {currentSheetIndex === 2 ? (
                  <SidebarBottom size={24} color={Colors.dark} variant='Broken' />
                ) : (
                  <SidebarTop size={24} color={Colors.dark} variant='Broken' />
                )}
              </TouchableOpacity>
            </View>

            <View className='w-full h-1 mt-3 bg-[#757780]/10'>

            </View>


            <BottomSheetScrollView keyboardShouldPersistTaps="always" 
              showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
                onRefresh={onRefresh} className='z-10 ' />}>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Доставувач</Text>
                <View className='flex flex-row items-center justify-between mt-3'>
                  <View className='flex flex-row space-x-3 items-center'>
                    <View className='w-16 h-16 bg-[#7577804C]/10 rounded-2xl'></View>
                    <View className='space-y-1'>
                      <Text style={{ fontFamily: "medium" }}>Ѓорги Крмзов</Text>
                      <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Porsche Panamera</Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => makeCall('+389 78 239 880')} className='w-12 h-12 flex justify-center items-center rounded-2xl bg-[#fafafa]/90'>
                    <Call size={24} color={Colors.dark} variant='Broken' />
                  </TouchableOpacity>

                </View>
              </View>

              <View className='mt-8 px-6 flex items-start flex-row justify-between'>
                <View className='flex flex-row items-start'>
                  <Text className='text-4xl' style={{ fontFamily: 'medium' }}>25-30</Text>
                  <Text className='text-[#0b0b0b]/70 text-xs' style={{ fontFamily: "medium" }}>мин</Text>
                </View>
                <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b]/60 text-xs text-right'>Проценка на пристигање {'\n'} на нарачката</Text>
              </View>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Состојба на нарачка</Text>
                <View className='flex flex-col items-start justify-center'>

                  <View className=' flex flex-row items-center mt-6'>
                    <StopCircle size={16} color={Colors.primary} className='' variant='Bulk' />
                    <View>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:35</Text>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Вашата нарачка е испратена</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={16} color={Colors.primary} className='' variant='Bulk' />
                    <View>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:42</Text>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Вашата нарачка се подготвува</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={16} color={Colors.gray50} className='' variant='Bulk' />
                    <View>
                      {/* <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:50</Text> */}
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 '>Курирот е на пат кон вас</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={16} color={Colors.gray50} className='' variant='Bulk' />
                    <View>
                      {/* <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:58</Text> */}
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60'>Курирот стигна на вашата адреса</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className='w-full h-1 mt-8 bg-[#757780]/10'>

              </View>

              <Text style={{ fontFamily: "semibold" }} className='px-6 mt-8 text-[#0b0b0b]'>Адреса на достава</Text>
              <View className='mt-2 px-6 w-full py-4 bg-[#F0F1F3]/10 flex flex-row items-center justify-between' >
                <View className='flex-col items-start'>
                  <View className='flex flex-row items-center'>
                    <Location size={20} variant='Bulk' color={Colors.primary} />
                    <Text className='ml-1 text-[16px]' style={{ color: 'black', fontFamily: 'medium' }}>{trimmedAdress}</Text>
                  </View>

                  <View className='flex flex-row mt-2 items-center space-x-1'>
                    <View className='p-1 px-2 bg-[#FAFAFA]/90 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Кат 1</Text>
                    </View>

                    <View className='p-1 px-2 bg-[#FAFAFA]/90 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Стан 4</Text>
                    </View>

                    <View className='p-1 px-2 bg-[#FAFAFA]/90 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Достави на врата</Text>
                    </View>
                  </View>

                </View>
              </View>
            </BottomSheetScrollView>
          </View>
        </BottomSheet>


      </View>
    </>
  );
}


export default Page;


const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 64,
  }
});