import React, { useMemo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import { ArrowLeft, CloseCircle, ExportSquare, SearchNormal1, Shop } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import * as Haptics from 'expo-haptics';

const Page = () => {

  const snapPoints = useMemo(() => ['25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | any>(null);
  const mapRef = useRef<MapView>(null);

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const { stores } = useSelector((state: RootState) => state.store)
  const { storeTypes } = useSelector((state: RootState) => state.storeType)

  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find(type => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
  };

  const handleMarkerPress = (store: any) => {
    setSelectedStoreId(store.id);
    Haptics.notificationAsync()

    const region: Region = {
      latitude: store.address.latitude,
      longitude: store.address.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 1000);
  };

  const handleRouteStoreDetails = (store: any) => {
    const storeTypeName = getStoreTypeName(store.storeTypeId);
    router.push({
      pathname: '/store/[id]',
      params: {
        id: store.id,
        name: store.name,
        storeTypeName,
        isOpen: store.isOpen,
        address: JSON.stringify(store.address)
      }
    });
  };

  return (
    <GestureHandlerRootView>
      <View className='bg-[#fffffc] flex-1'>

        <View style={styles.header} className='flex px-6 jb absolute left-0 z-20  w-full flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
            <ArrowLeft variant='Broken' size={20} color={Colors.dark} />
          </TouchableOpacity>

          {selectedStoreId !== null ? (
            <TouchableOpacity onPress={() => setSelectedStoreId(null)} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
              <CloseCircle variant='Broken' size={20} color={Colors.dark} />
            </TouchableOpacity>
            ) : null
          }
        </View>

        <View className='border-black/10 h-3/4 overflow-hidden'>
          <MapView ref={mapRef} maxDelta={0.03} className='w-full flex-1' showsCompass={false} focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >
            {stores?.map((store, index) => (
              <Marker key={index} className='' coordinate={{ latitude: store.address?.latitude, longitude: store.address?.longitude } as any}>
                <View className='flex items-center flex-1'>
                  {selectedStoreId === store.id && (
                    <TouchableOpacity onPress={() => handleRouteStoreDetails(store)} className='opacity-100 w-32  relative flex-1 flex justify-center items-start  p-2.5 bg-[#fffffc] mb-2 rounded-2xl'>
                      <View className='w-full h-16 bg-[#0b0b0b]/5 rounded-xl mb-2'>
                        <ExportSquare variant='Broken' className='absolute right-2 top-2' color={Colors.dark} size={16} />
                      </View>
                      <Text style={{ fontFamily: 'bold' }} className=' text-[10px] mb-0.5 uppercase text-[#0b0b0b]/80'>
                        {getStoreTypeName(store.storeTypeId)}
                      </Text>

                      <Text style={{ fontFamily: 'medium' }}>{store.name}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className='-z-0' onPress={() => handleMarkerPress(store)}>
                    <Shop size={24} variant='Bulk' color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </Marker>
            ))}
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
        </BottomSheet>

      </View>
    </GestureHandlerRootView>
  );
}


export default Page;



const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 40 : 64,
  }
});