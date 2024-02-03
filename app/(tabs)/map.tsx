import React, { useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft, SearchNormal1, Setting4 } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { processFontFamily } from 'expo-font';

const Page = () => {

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  const opacity = useSharedValue(isAnimating ? 1 : 0);
  const translateY = useSharedValue(isAnimating ? 0 : 100);

  const handleToggle = () => {
    const newIndex = currentSheetIndex === 0 ? 2 : 0;
    snapeToIndex(newIndex);
    setCurrentSheetIndex(newIndex);
    setIsAnimating((prev) => !prev);
  };

  const startAnimation = () => {
    setIsAnimating(true);
    opacity.value = withSpring(1, { damping: 2, stiffness: 80 });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    opacity.value = withTiming(0, { duration: 400, easing: Easing.linear });
    translateY.value = withTiming(100, { duration: 400, easing: Easing.linear });
  };


  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)



  return (

    <View className='bg-[#FAFAFA] flex-1'>

      <View className='flex px-6 absolute top-16  left-0 z-20  w-full flex-row items-center justify-start'>
        <TouchableOpacity className='bg-[#FAFAFA] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
          <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
          <Text style={{ fontFamily: 'medium' }} className='text-[#0b0b0b] ml-1'>Назад</Text>
        </TouchableOpacity>

      </View>

      <View className='border-black/10  overflow-hidden'>
        <MapView showsUserLocation={true} // Show the user location pin
        showsMyLocationButton={false} className='w-full h-full' showsCompass={false}  focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >

        </MapView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        backgroundStyle={{ backgroundColor: Colors.white }}
        handleIndicatorStyle={{ backgroundColor: Colors.dark }}
        snapPoints={snapPoints}
      >
        <View className='flex px-6 py-3 flex-row items-center justify-between'>
          <View>
            <Text style={{ fontFamily: "heavy" }} className='text-[#0b0b0b]/80'>МАПА</Text>
            <Text style={{ fontFamily: "medium" }} className='text-[#0b0b0b] mt-1'>Пребарај Ресторани</Text>
          </View>


          <View className='flex-row items-center gap-x-2'>
            <TouchableOpacity onPress={() => {
              handleToggle();
              isAnimating ? resetAnimation() : startAnimation();
            }} className='w-12 h-12 flex justify-center items-center rounded-xl border border-[#F0F1F3] bg-[#F0F1F3]'>
              <Setting4 color={Colors.dark} size={22} variant='Broken' />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/search')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-[#F0F1F3] bg-[#F0F1F3]'>
              <SearchNormal1 color={Colors.dark} size={22} variant='Broken' />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={animatedStyle} entering={FadeInDown.duration(300)} className='flex flex-col justify-between flex-1 mt-9 px-6 py-4'>


          <View>
            <View className='flex-row items-center'>
              <Setting4 variant='Bulk' color={Colors.dark} size={24} />
              <Text className='text-[#0b0b0b] text-lg ml-2' style={{ fontFamily: "extrabold" }}>Филтер</Text>
            </View>

            <View className='flex flex-row justify-between'>
              <View className='flex flex-col gap-y-3 mt-2 '>

                <Text className='text-[#0b0b0b]/60 text-xs' style={{ fontFamily: "extrabold" }}>ХРАНА</Text>
                <BouncyCheckbox
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Пица"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Тако"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Бургер"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Пастрмајлија"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Скара"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />



              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => snapeToIndex(0)} className='mt-6 py-6 flex-row flex bottom-0 relative justify-center items-center rounded-2xl bg-[#0b0b0b]'>
            <Setting4 color={Colors.primary} size={24} />
            <Text className='text-[#FAFAFA] ml-2' style={{ fontFamily: 'medium' }}>Прикажи филтри</Text>
          </TouchableOpacity>
        </Animated.View>



      </BottomSheet>

    </View>
  );
}


export default Page;


