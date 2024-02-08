import React, { useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, Linking, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft, Call, Clock, ExportSquare, SearchNormal1, Setting4, SidebarBottom, SidebarTop, StopCircle } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { processFontFamily } from 'expo-font';

const Page = () => {


  const snapPoints = useMemo(() => ['25%', '50%', '75%', '85%'], []);

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)
  const [currentSheetIndex, setcurrentSheetIndex] = useState(0)



  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Perform any additional refreshing logic if needed.

    // Simulate a delay (you can replace this with your actual refreshing logic)
    setTimeout(() => {
      setRefreshing(false);
    }, 600); // Adjust the delay as needed
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

    <View className='bg-[#FAFAFA] flex-1 h-screen'>
      <StatusBar style='auto' />
      <View style={styles.header} className='flex px-6 absolute left-0 z-20  w-full flex-row items-center justify-start'>
        <TouchableOpacity className='bg-[#FAFAFA] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
          <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
          <Text style={{ fontFamily: 'medium' }} className='text-[#0b0b0b] ml-1'>Назад</Text>
        </TouchableOpacity>

      </View>

      <View className='border-black/10  overflow-hidden'>
        <MapView showsUserLocation={true} // Show the user location pin
          showsMyLocationButton={false} className='w-full h-full' showsCompass={false} focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >

        </MapView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        backgroundStyle={{ backgroundColor: Colors.white }}
        handleIndicatorStyle={{ backgroundColor: Colors.dark }}
        snapPoints={snapPoints}
      >
        <View className='flex py-3 flex-col'>
          <View className='px-6 flex flex-row items-center justify-between'>
            <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b]/80 text-lg'>Детали на нарачка</Text>
            <TouchableOpacity onPress={() => {
              const newIndex = currentSheetIndex === 3 ? 0 : 3; // Toggle between 0 (25%) and 2 (75%)
              snapeToIndex(newIndex);
              setcurrentSheetIndex(newIndex); // Update state to reflect new index
            }} className='w-12 h-12 flex justify-center items-center rounded-2xl bg-[#F0F1F3]/80'>
              {/* Conditionally render icons based on the currentSheetIndex */}
              {currentSheetIndex === 3 ? (
                <SidebarBottom size={24} color={Colors.dark} variant='Broken' />
              ) : (
                <SidebarTop size={24} color={Colors.dark} variant='Broken' />
              )}
            </TouchableOpacity>
          </View>

          <View className='w-full h-1 mt-3 bg-[#F0F1F3]'>

          </View>


          <ScrollView keyboardShouldPersistTaps="always" // This is the key change
            showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
            onRefresh={onRefresh} className='z-10 border' />}>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Доставувач</Text>
                <View className='flex flex-row items-center justify-between mt-3'>
                  <View className='flex flex-row space-x-3 items-center'>
                    <View className='w-16 h-16 bg-[#F0F1F3] rounded-2xl'></View>
                    <View className='space-y-1'>
                      <Text style={{ fontFamily: "medium" }}>Ѓорги Крмзов</Text>
                      <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Volkswagen Golf</Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => makeCall('+389 78 239 880')} className='w-12 h-12 flex justify-center items-center rounded-2xl bg-[#F0F1F3]/80'>
                    <Call size={24} color={Colors.dark} variant='Broken' />
                  </TouchableOpacity>

                </View>
              </View>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Проценка на пристигање</Text>
                <View className='flex flex-row items-center mt-4'>
                  <Clock size={20} color={Colors.primary} variant='Bulk' />
                  <Text style={{ fontFamily: "bold" }} className=' ml-2 text-[#0b0b0b]/80 text-lg'>30 - 45 мин</Text>
                </View>

              </View>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Состојба на нарачка</Text>
                <View className='flex flex-col space-y-1 items-start justify-center'>

                  <View className=' flex flex-row items-center mt-4'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Вашата нарачка е испратена</Text>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]/60'></View>

                  <View className=' flex flex-row items-center mt-3'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Вашата нарачка се подготвува</Text>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]/60'></View>

                  <View className=' flex flex-row items-center mt-3'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Курирот е на пат кон вас</Text>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]/60'></View>

                  <View className=' flex flex-row items-center mt-3'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Курирот стигна на вашата адреса</Text>
                  </View>
                </View>
              </View>

              <View className='w-full mt-8 px-6'>
                <TouchableOpacity onPress={handleCancelOrder} className='w-full py-6 flex justify-center items-center bg-[#0b0b0b] rounded-2xl'>
                  <Text style={{ fontFamily: "medium" }} className='text-[#fafafa]'>Откажи нарачка</Text>
                </TouchableOpacity>
              </View>


          </ScrollView>

        </View>
      </BottomSheet>

    </View>
  );
}


export default Page;



const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 64,
  }
});