import { Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard, Animated, Platform, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router'
import { ArrowLeft, Bag2, Coffee, Element4, Graph, Heart, Home2, HomeHashtag, MessageQuestion, SearchNormal1, Shop, ShoppingCart } from 'iconsax-react-native'
import Colors from '../../constants/Colors'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { Easing } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../reduxStore';
import { fetchStores } from '../reduxStore/storeSlice';
import StoreCard from '../../components/storeCard';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics'

const Page = () => {

  const dispatch = useDispatch<any>()

  const { stores } = useSelector((state: RootState) => state.store)
  const { storeTypes } = useSelector((state: RootState) => state.storeType)
  const { accessToken } = useSelector((state: RootState) => state.accessToken)

  const [search, setSearch] = useState<string>('');

  const [filteredStores, setFilteredStores] = useState(stores);
  const inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const searchBarResult = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const numberOfCartItems = useSelector((state: RootState) => state.cart.items.length);
  const [selectedType, setselectedType] = useState<string>('Сите')

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredStores(stores);
    } else {
      const lowercasedQuery = search.toLowerCase();
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredStores(filtered);
    }
  }, [search, stores]);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };


  const getStoreTypeName = (storeTypeId: string) => {
    const storeType = storeTypes.find(type => type.id === storeTypeId);
    return storeType ? storeType.name : "Unknown Type";
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


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchStores(accessToken))
    setTimeout(() => {
      setRefreshing(false);
    });
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
      setFilteredStores(stores)
    } else if (selectedType) {
      filtered = filtered.filter(store => getStoreTypeName(store.storeTypeId) === selectedType);
    }

    if (search.trim() !== '') {
      const lowercasedQuery = search.toLowerCase();
      filtered = filtered.filter(store => store.name.toLowerCase().includes(lowercasedQuery));
    }


    setFilteredStores(filtered);
  };


  const handleTypeFilter = (type: string) => {
    Haptics.selectionAsync()
    setselectedType(type);
    setSearch('');
  };

  return (
    <GestureHandlerRootView>

      <View style={styles.header} className='bg-[#fffffc] flex-1'>
        <Animated.View className='px-6 flex flex-row items-center mt-4 mb-2.5 '>
          <View className=' bg-[#fafafa]/90 flex-1 items-center flex-row px-5 rounded-2xl'>
            {
              isFocused ?
                (
                  <TouchableOpacity onPress={handleBlur} className=' flex justify-center items-center'>
                    <ArrowLeft size={22} color={Colors.dark} variant='Broken' />
                  </TouchableOpacity>

                ) :

                (
                  <SearchNormal1 size={22} color='#0b0b0b97' className='flex justify-center items-center' variant='Broken' />)
            }

            <TextInput onChangeText={handleSearchChange}
              ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} value={search} className='text-[#0b0b0b] px-3 flex-1 ' style={styles.input} placeholder='Пребарај' placeholderTextColor='#0b0b0b97' />

          </View>
        </Animated.View>

        <View className='space-x-1 px-6 flex flex-row justify-center items-center'>

          <Pressable onPress={() => handleTypeFilter('Сите')} className={selectedType === 'Сите' ? 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#fafafa]/90'}>
            <Element4 variant='Bold' size={16} color={selectedType === 'Сите' ? Colors.white : Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Сите' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Сите</Text>
          </Pressable>

          <Pressable onPress={() => handleTypeFilter('Храна')} className={selectedType === 'Храна' ? 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#fafafa]/90'}>
            <Bag2 variant='Bold' size={16} color={selectedType === 'Храна' ? Colors.white : Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Храна' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Храна</Text>
          </Pressable>


          <Pressable onPress={() => handleTypeFilter('Кафе')} className={selectedType === 'Кафе' ? 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#fafafa]/90'}>
            <Coffee variant='Bold' size={16} color={selectedType === 'Кафе' ? Colors.white : Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Кафе' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Кафе</Text>
          </Pressable>

          <Pressable onPress={() => handleTypeFilter('Тобако')} className={selectedType === 'Тобако' ? 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#0b0b0b]' : 'rounded-xl flex-row px-4 py-2.5 flex-1 flex justify-center items-center bg-[#fafafa]/90'}>
            <HomeHashtag variant='Bold' size={16} color={selectedType === 'Тобако' ? Colors.white : Colors.dark} />
            <Text style={{ fontFamily: 'medium' }} className={selectedType === 'Тобако' ? 'ml-1.5 text-xs text-white' : 'ml-1.5 text-xs'} >Тобако</Text>
          </Pressable>

        </View>

        <Animated.View style={{ transform: [{ translateY: searchBarResult }] }} className={isFocused ? 'flex h-full mt-12 px-6' : 'hidden'}>
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

        <ScrollView keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={Colors.dark} refreshing={refreshing}
            onRefresh={onRefresh} />} className='h-full bg-[#FFFFFC] mt-2'>
          <View className='h-full  mb-4'>

            <View className={cartItems?.length !== 0 ? 'pb-20 w-full' : 'w-full'}>
                <FlatList
                  data={filteredStores}
                  scrollEnabled={false}
                  className='px-6 pb-4'
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <StoreCard item={item} />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 6,
                    backgroundColor: '#FFFFFC',
                  }}
                />
            </View>
          </View>
        </ScrollView>


        {
          cartItems?.length !== 0 && (
            <LinearGradient
              className='px-6 flex absolute py-4 bottom-0 w-full justify-center'
              colors={['rgba(255, 255, 252, 0.01)', 'rgba(255, 255, 252, 0.8)', '#fffffc']}        >
              <Animated.View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className='w-full flex-row py-6 bg-[#0b0b0b] flex justify-center items-center rounded-2xl'>
                  <ShoppingCart variant='Bulk' size={22} color={Colors.primary} />
                  <Text style={{ fontFamily: "medium" }} className=' text-[#FFFFFC] ml-2'>Корпа <Text style={{ fontFamily: 'extrabold' }}>·</Text> {numberOfCartItems}</Text>
                </TouchableOpacity>
              </Animated.View>
            </LinearGradient>
          )}
      </View>
    </GestureHandlerRootView>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 44 : 38,
  },
  input: {
    paddingVertical: (Platform.OS === 'android') ? 16 : 22,
    fontFamily: 'medium',
  }

});