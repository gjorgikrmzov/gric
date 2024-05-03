import React, { useMemo, useRef } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft, Location, SearchNormal1, Setting4 } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Page = () => {
  const snapPoints = useMemo(() => ['25%'], []);

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  // const snapeToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)

  return (

    <View className='bg-[#FFFFFC] flex-1'>

      <View style={styles.header} className='flex px-6 absolute left-0 z-20  w-full flex-row items-center justify-start'>
        <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
          <ArrowLeft variant='Broken' size={20} color={Colors.dark} />
        </TouchableOpacity>

      </View>

      <View className='border-black/10  overflow-hidden'>
        <MapView showsUserLocation={true} 
          showsMyLocationButton={false} className='w-full h-full' showsCompass={false} focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT}  customMapStyle={customMapStyle} >
          <Marker title='Bucks Pizza' description='Pizza Restaurant' coordinate={INITIAL_REGION}>
            <View className=''>
              <Location size={26} variant='Bulk' color={Colors.white} />
            </View>
          </Marker>
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

            <TouchableOpacity onPress={() => router.push('/stores')} className='w-14 h-14 flex justify-center items-center rounded-full border border-[#0b0b0b]/5'>
              <SearchNormal1 color={Colors.dark} size={20} variant='Broken' />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View className='flex flex-col justify-between flex-1 mt-9 px-6 py-4'>


          <View>
            <View className='flex-row items-center'>
              <Setting4 variant='Bulk' color={Colors.dark} size={24} />
              <Text className='text-[#0b0b0b] text-lg ml-2' style={{ fontFamily: "extrabold" }}>Филтер</Text>
            </View>

            <View className='flex flex-row justify-between'>
              <View className='flex flex-col gap-y-3 mt-2 '>

                <Text className='text-[#0b0b0b]/60 text-xs' style={{ fontFamily: "extrabold" }}>ХРАНА</Text>
                <BouncyCheckbox
                  size={22}
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Пица"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  size={22}
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Тако"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  size={22}
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Бургер"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  size={22}
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Пастрмајлија"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

                <BouncyCheckbox
                  size={22}
                  fillColor={Colors.dark}
                  unfillColor={Colors.white}
                  text="Скара"
                  textStyle={{ fontFamily: "medium", color: Colors.dark, textDecorationLine: 'none' }}
                  iconStyle={{ borderColor: Colors.primary, borderRadius: 6 }}
                  innerIconStyle={{ borderColor: Colors.dark, borderRadius: 6 }}
                  onPress={(isChecked: boolean) => { }}
                />

              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => snapeToIndex(0)} className='mt-6 py-6 flex-row flex bottom-0 relative justify-center items-center rounded-2xl bg-[#0b0b0b]'>
            <Setting4 color={Colors.primary} size={24} />
            <Text className='text-[#FFFFFC] ml-2' style={{ fontFamily: 'medium' }}>Прикажи филтри</Text>
          </TouchableOpacity>
        </View> */}



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