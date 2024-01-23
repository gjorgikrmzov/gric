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

    <View className='bg-[#131313] flex-1'>
      <View className='flex px-6 absolute top-16  left-0 z-20  w-full flex-row items-center justify-between'>
        <TouchableOpacity className='bg-[#f7f7f7] px-3 py-2.5 flex rounded-xl flex-row items-center' onPress={() => router.back()} >
          <ArrowLeft variant='Linear' size={20} color={Colors.dark} />
          <Text style={{ fontFamily: 'medium' }} className='text-black ml-1'>Назад</Text>
        </TouchableOpacity>

        <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
      </View>

      <View className='border-black/10  overflow-hidden'>
        <MapView className='w-full h-full' showsCompass={false} showsUserLocation showsMyLocationButton focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >

        </MapView>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        backgroundStyle={{ backgroundColor: Colors.dark }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        snapPoints={snapPoints}
      >
        <View className='flex px-6 py-3 flex-row items-center justify-between'>
          <View>
            <Text style={{ fontFamily: "heavy" }} className='text-white/60'>МАПА</Text>
            <Text style={{ fontFamily: "medium" }} className='text-white mt-1'>Пребарај Ресторани</Text>
          </View>


          <View className='flex-row items-center gap-x-2'>
            <TouchableOpacity onPress={() => {
              handleToggle();
              isAnimating ? resetAnimation() : startAnimation();
            }} className='w-12 h-12 flex justify-center items-center rounded-xl border border-white/30'>
              <Setting4 color={Colors.primary} size={22} variant='Broken' />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/search')} className='w-12 h-12 flex justify-center items-center rounded-xl border border-white/30'>
              <SearchNormal1 color={Colors.primary} size={22} variant='Broken' />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={animatedStyle} entering={FadeInDown.duration(300)} className='opacity-0 mt-9 px-6 py-4'>
          <Text className='text-white text-lg' style={{ fontFamily: "heavy" }}>Филтер</Text>

          <View className='flex flex-col gap-y-3 mt-3'>
            <BouncyCheckbox
              fillColor={Colors.primary}
              unfillColor={Colors.white}
              text="Пица"
              iconStyle={{ borderColor: Colors.white, borderRadius: 6 }}
              innerIconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
              onPress={(isChecked: boolean) => { }}
              textStyle={{ textDecorationLine: 'none' }}
            />

            <BouncyCheckbox
              fillColor={Colors.primary}
              unfillColor={Colors.white}
              text="Бургер"
              iconStyle={{ borderColor: Colors.white, borderRadius: 6 }}
              innerIconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
              onPress={(isChecked: boolean) => { }}
              textStyle={{ textDecorationLine: 'none' }}
            />

            <BouncyCheckbox
              fillColor={Colors.primary}
              unfillColor={Colors.white}
              text="Паста"
              iconStyle={{ borderColor: Colors.white, borderRadius: 6 }}
              innerIconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
              onPress={(isChecked: boolean) => { }}
              textStyle={{ textDecorationLine: 'none' }}
            />

            <BouncyCheckbox
              fillColor={Colors.primary}
              unfillColor={Colors.white}
              text="Сендвичи"
              iconStyle={{ borderColor: Colors.white, borderRadius: 6 }}
              innerIconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
              onPress={(isChecked: boolean) => { }}
              textStyle={{ textDecorationLine: 'none' }}
            />

            <BouncyCheckbox
              fillColor={Colors.primary}
              unfillColor={Colors.white}
              text="Салата"
              iconStyle={{ borderColor: Colors.white, borderRadius: 6 }}
              innerIconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
              onPress={(isChecked: boolean) => { }}
              textStyle={{ textDecorationLine: 'none' }}
            />
          </View>

          <TouchableOpacity onPress={() => snapeToIndex(0)} className='mt-6 py-5 w-1/2 flex justify-center items-center rounded-xl bg-[#ff4b19]'>
            <Text className='text-white' style={{ fontFamily: 'medium' }}>Прикажи филтри</Text>
          </TouchableOpacity>
        </Animated.View>



      </BottomSheet>

    </View>
  );
}


export default Page;


