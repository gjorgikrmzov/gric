import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, Linking, Modal, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft, Call, Clock, ExportSquare, Location, SearchNormal1, Setting4, SidebarBottom, SidebarTop, StopCircle, Trash } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {

  const [savedAddress, setSavedAddress] = useState<string>('');

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


  const [modalVisible, setModalVisible] = useState(false);
  const springAnim = useRef(new Animated.Value(0)).current; // For opacity
  const translateYAnim = useRef(new Animated.Value(20)).current; // Initial translateY position

  const toggleModal = () => {
    if (modalVisible) {
      // Animate out
      Animated.parallel([
        Animated.spring(springAnim, {
          toValue: 0, // Animate opacity to 0
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 20, // Move down slightly
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    } else {
      // Animate in
      setModalVisible(true);
      Animated.parallel([
        Animated.spring(springAnim, {
          toValue: 1, // Animate opacity to 1
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0, // Move to initial position
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

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

    <>
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
          <View className='flex py-3 flex-col h-full pb-14'>
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
                onRefresh={onRefresh} className='z-10 ' />}>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Доставувач</Text>
                <View className='flex flex-row items-center justify-between mt-3'>
                  <View className='flex flex-row space-x-3 items-center'>
                    <View className='w-16 h-16 bg-[#F0F1F3] rounded-2xl'></View>
                    <View className='space-y-1'>
                      <Text style={{ fontFamily: "medium" }}>Ѓорги Крмзов</Text>
                      <Text className='text-[#0b0b0b]/60' style={{ fontFamily: "medium" }}>Porsche Panamera</Text>
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
                  <Clock size={22} color={Colors.primary} variant='Bold' />
                  <Text style={{ fontFamily: "bold" }} className=' ml-2 text-[#0b0b0b]/80 text-lg'>30 - 45 мин</Text>
                </View>
              </View>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Состојба на нарачка</Text>
                <View className='flex flex-col space-y-0.5 items-start justify-center'>

                  <View className=' flex flex-row items-center mt-6'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <View>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:35</Text>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Вашата нарачка е испратена</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={14} color={Colors.primary} className='' variant='Bulk' />
                    <View>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:42</Text>
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60'>Вашата нарачка се подготвува</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={14} color={Colors.gray50} className='' variant='Bulk' />
                    <View>
                      {/* <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:50</Text> */}
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 '>Курирот е на пат кон вас</Text>
                    </View>
                  </View>

                  <View className='h-6 w-[1px] left-1.5 bg-[#0b0b0b]'></View>

                  <View className=' flex flex-row items-center'>
                    <StopCircle size={14} color={Colors.gray50} className='' variant='Bulk' />
                    <View>
                      {/* <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]/60 text-xs'>16:58</Text> */}
                      <Text style={{ fontFamily: "medium" }} className=' ml-2 text-[#0b0b0b]'>Курирот стигна на вашата адреса</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className='w-full h-1 mt-8 bg-[#F0F1F3]'>

              </View>

              <Text style={{ fontFamily: "semibold" }} className='px-6 mt-8 text-[#0b0b0b]'>Адреса на достава</Text>
              <View className='mt-2 px-6 w-full py-4 bg-[#F0F1F3]/10 flex flex-row items-center justify-between' >
                <View className='flex-col items-start'>
                  <View className='flex flex-row items-center'>
                    <Location size={20} variant='Bulk' color={Colors.primary} />
                    <Text className='ml-1 text-[16px]' style={{ color: 'black', fontFamily: 'medium' }}>{trimmedAdress}</Text>
                  </View>

                  <View className='flex flex-row mt-2 items-center space-x-1'>
                    <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Кат 1</Text>
                    </View>

                    <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Стан 4</Text>
                    </View>

                    <View className='p-1 px-2 bg-[#0b0b0b]/5 rounded-lg flex justify-center items-center'>
                      <Text style={{ fontFamily: "medium" }} className='text-xs text-[#0b0b0b]'>Достави на врата</Text>
                    </View>
                  </View>

                </View>
              </View>

              <View className='w-full h-1 mt-8 bg-[#F0F1F3]'>

              </View>

              <View className='mt-8 px-6'>
                <Text style={{ fontFamily: "semibold" }} className='text-[#0b0b0b]'>Нарачка</Text>

                <View className='mt-6 flex flex-row items-center justify-between'>
                  <View>
                    <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b]/80'>Bу Хаус</Text>
                    <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b] mt-1'>1x Бонапарта</Text>
                  </View>
                  <Text style={{ fontFamily: "semibold" }} className='text-[#85B4FF]'>180 ден</Text>
                </View>

                <View className='w-full mt-6 border-dashed border border-[#0b0b0b]/20'></View>

                <View className='flex flex-col'>
      
                  <View className='mt-6 flex flex-row items-center justify-between'>
                    <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b] text-[16px]'>Достава</Text>
                    <Text style={{ fontFamily: "semibold" }} className='text-[#85B4FF] text-[16px]'>80 ден</Text>
                  </View>

                  <View className='mt-6 flex flex-row items-center justify-between'>
                    <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b] text-[16px]'>Вкупно</Text>
                    <Text style={{ fontFamily: "semibold" }} className='text-[#85B4FF] text-[16px]'>260 ден</Text>
                  </View>
                </View>
              </View>

            </ScrollView>

          </View>
        </BottomSheet>


        <BlurView intensity={5} className='flex-1 items-center justify-center'>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
            className='flex-1'
          >
            <Animated.View
              className="flex-1 bg-[#0b0b0b]/60 border w-full items-center justify-center"
              style={{
                transform: [{ translateY: translateYAnim }],
                opacity: springAnim,
              }}
            >

              <View className=" w-4/5  bg-white rounded-2xl justify-center p-4 ">
                <Text className="text-center text-lg" style={{ fontFamily: "medium" }}>Откажи нарачка</Text>
                <Text className="text-center mt-2" style={{ fontFamily: "medium" }}>Дали сакаш да ја {'\n'} откажеш нарачката?</Text>

                <View className='flex mt-4 space-y-2 justify-center'>
                  <TouchableOpacity onPress={toggleModal} className=' w-full py-5 flex justify-center items-center bg-[#0b0b0b] rounded-2xl'>
                    <Text style={{ fontFamily: "medium" }} className='text-[16px] text-[#fafafa]'>Да</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={toggleModal} className=' w-full py-5 flex justify-center items-center bg-[#0b0b0b] rounded-2xl'>
                    <Text style={{ fontFamily: "medium" }} className='text-[16px] text-[#fafafa]'>Не</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </Modal>
        </BlurView>


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