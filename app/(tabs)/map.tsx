import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Easing, ScrollView, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import { ArrowLeft, Bag2, CloseCircle, Coffee, Element4, ExportSquare, HomeHashtag, MessageQuestion, SearchNormal1, Shop } from 'iconsax-react-native';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { customMapStyle } from '../../mapStyle'
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {

  const snapPoints = useMemo(() => ['25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | any>(null);
  const mapRef = useRef<MapView>(null);
  const inputRef = useRef<TextInput>(null);
  const [search, setSearch] = useState<string>('');

  const [isFocused, setIsFocused] = useState(false);
  const searchBarResult = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const [selectedType, setselectedType] = useState<string>('Сите')

  const INITIAL_REGION = {
    latitude: 41.43917545031447,
    longitude: 22.642414349452316,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }

  const { stores } = useSelector((state: RootState) => state.store)
  const { storeTypes } = useSelector((state: RootState) => state.storeType)
  const [filteredStores, setfilteredStores] = useState(stores)
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
        address: JSON.stringify(store.address),
        imageUrl: store.imageUrl
      }
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: -40,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 0,
        easing: Easing.circle,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
    Animated.parallel([
      Animated.spring(searchBarResult, {
        toValue: 0,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    if (search.trim() === '') {
      setfilteredStores(stores);
    } else {
      const lowercasedQuery = search.toLowerCase();
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(lowercasedQuery)
      );
      setfilteredStores(filtered);
    }
  }, [search, stores]);


  useEffect(() => {
    filterStores();
  }, [stores, selectedType]);

  const filterStores = () => {
    let filtered = stores;

    if (selectedType === 'Храна') {
      filtered = filtered.filter(store => {
        const storeTypeName = getStoreTypeName(store.storeTypeId);
        return storeTypeName !== 'Кафе' && storeTypeName !== 'Тобако';
      });
    } else if (selectedType === 'Сите') {
      setfilteredStores(stores)
    } else if (selectedType) {
      filtered = filtered.filter(store => getStoreTypeName(store.storeTypeId) === selectedType);
    }

    if (search.trim() !== '') {
      const lowercasedQuery = search.toLowerCase();
      filtered = filtered.filter(store => store.name.toLowerCase().includes(lowercasedQuery));
    }


    setfilteredStores(filtered);
  };


  const handleTypeFilter = (type: string) => {
    Haptics.selectionAsync()
    setselectedType(type);
    setSearch('');
  };


  return (
    <GestureHandlerRootView>
      <View className='bg-[#fffffc] flex-1'>

        <View className='flex absolute left-0 z-20  w-full '>

          <View style={styles.header} className='flex px-4  left-0 z-20  w-full flex-row items-center justify-between'>
            {isFocused ? null : (
              <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                <ArrowLeft variant='Broken' size={20} color={Colors.dark} />
              </TouchableOpacity>
            )}

              

            <Animated.View className=' mx-2 flex flex-row flex-1 items-center  '>
              <View className=' bg-[#fafafa]/90  py-5 flex-1 items-center flex-row px-4  rounded-full'>
                {
                  isFocused ?
                    (
                      <TouchableOpacity onPress={handleBlur} className=' flex justify-center items-center'>
                        <ArrowLeft size={18} color={Colors.dark} variant='Broken' />
                      </TouchableOpacity>

                    ) :

                    (
                      <SearchNormal1 size={18} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
                }

                <TextInput onChangeText={handleSearchChange} style={{ fontFamily: 'medium' }}
                  ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} value={search} className='text-[#0b0b0b] px-3 text-md flex-1 ' placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />

              </View>
            </Animated.View>

              {selectedStoreId !== null ? (
                <TouchableOpacity onPress={() => setSelectedStoreId(null)} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/90 rounded-full' >
                <CloseCircle variant='Broken' size={20} color={Colors.dark} />
                </TouchableOpacity>
              ) : null
            }
          </View>

          {isFocused &&
            <View className='absolute left-0 top-0 z-0 bg-[#fffffc] w-screen h-screen'></View>
          }

          {isFocused ? null : (

            <View className='px-4'>
            <View className='mt-2 z-[999] flex-row justify-evenly items-center'>
              <Pressable onPress={() => handleTypeFilter('Сите')} className={selectedType === 'Сите' ? 'rounded-xl  flex-row px-3 py-2.5  flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-3 py-2.5  flex justify-center items-center bg-[#fafafa]/90'}>
                <Element4 variant='Bold' size={16} color={selectedType === 'Сите' ? Colors.white : Colors.dark} />
                <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Сите' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Сите</Text>
              </Pressable>

              <Pressable onPress={() => handleTypeFilter('Храна')} className={selectedType === 'Храна' ? 'rounded-xl  flex-row px-3 py-2.5  flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-3 py-2.5  flex justify-center items-center bg-[#fafafa]/90'}>
                <Bag2 variant='Bold' size={16} color={selectedType === 'Храна' ? Colors.white : Colors.dark} />
                <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Храна' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Храна</Text>
              </Pressable>


              <Pressable onPress={() => handleTypeFilter('Кафе')} className={selectedType === 'Кафе' ? 'rounded-xl  flex-row px-3 py-2.5  flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-3 py-2.5  flex justify-center items-center bg-[#fafafa]/90'}>
                <Coffee variant='Bold' size={16} color={selectedType === 'Кафе' ? Colors.white : Colors.dark} />
                <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Кафе' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Кафе</Text>
              </Pressable>

              <Pressable onPress={() => handleTypeFilter('Тобако')} className={selectedType === 'Тобако' ? 'rounded-xl  flex-row px-3 py-2.5  flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-3 py-2.5  flex justify-center items-center bg-[#fafafa]/90'}>
                <HomeHashtag variant='Bold' size={16} color={selectedType === 'Тобако' ? Colors.white : Colors.dark} />
                <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Тобако' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Тобако</Text>
              </Pressable>


            </View>

          </View>
          )}


          <Animated.View style={{ transform: [{ translateY: searchBarResult }] }} className={isFocused ? 'flex h-full mt-10 px-6 relative' : 'hidden'}>

            <ScrollView keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false} className='flex flex-1 flex-col ' >
              {filteredStores.map((store, index) => (
                index < 5 && (
                  <TouchableOpacity onPress={() => handleRouteStoreDetails(store)} key={index} className='w-full flex-row  flex items-center justify-between'>
                    <View className='flex items-center flex-row gap-x-4'>
                      <Shop color='#757780' size={25} variant='Broken' />
                      <View className='py-6 border-b border-[#0b0b0b]/10  w-full'>
                        <Text className='text-[#0b0b0b] text-[16px] ' style={{ fontFamily: 'medium' }}>{store.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              ))}

              {filteredStores.length === 0 ? (
                <View className='flex-1 mt-6 justify-center items-center flex '>
                  <View className='w-14 h-14 bg-[#fafafa]/80 flex justify-center items-center rounded-lg'>
                    <MessageQuestion size={26} color={Colors.dark} variant='Bulk' />
                  </View>
                  <Text className='text-center mt-2 text-[#0b0b0b]/60 text-[16px]' style={{ fontFamily: "medium" }}>Нема пронајдено {'\n'} резултати</Text>
                </View>
              ) : null}
            </ScrollView>
          </Animated.View>
        </View>

        <View className='border-black/10 h-3/4 overflow-hidden'>
          <MapView ref={mapRef}
            className='w-full flex-1' showsCompass={false} focusable initialRegion={INITIAL_REGION} provider={PROVIDER_DEFAULT} customMapStyle={customMapStyle} >
            {filteredStores?.map(store => (
              <Marker key={store.id} coordinate={{ latitude: store.address?.latitude, longitude: store.address?.longitude } as any}>
                <View className='flex items-center flex-1'>
                  {selectedStoreId === store.id && (
                    <TouchableOpacity onPress={() => handleRouteStoreDetails(store)} className='opacity-100 border-2 border-[#0b0b0b]/40 w-32  relative flex-1 flex justify-center items-start bg-[#fffffc] mb-2 rounded-2xl'>
                      <View className='w-full h-16 bg-[#0b0b0b]/5 rounded-xl mb-2'>
                        <Image source={store.imageUrl} className='w-full z-0 h-full absolute left-0 top-0 rounded-xl rounded-bl-none rounded-br-none' />
                      </View>

                      <Text style={{ fontFamily: 'bold' }} className='ml-2.5 mr-2.5 text-[10px] mb-0.5 uppercase text-[#0b0b0b]/80'>
                        {getStoreTypeName(store.storeTypeId)}
                      </Text>

                      <Text style={{ fontFamily: 'medium' }} className='ml-2.5 mr-2.5 mb-2.5'>{store.name}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className={selectedStoreId === store.id ? '-z-0 p-2 justify-center items-center flex rounded-xl bg-[#0b0b0b]' : '-z-0 p-2 justify-center items-center flex rounded-2xl bg-[#fafafa]'} onPress={() => handleMarkerPress(store)}>
                    <Shop size={19} variant='Bulk' color={selectedStoreId === store.id ? Colors.white : Colors.dark} />
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
    paddingTop: (Platform.OS === 'android') ? 40 : 58,
  }
});