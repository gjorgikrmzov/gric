import { View, Text, Platform, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft } from 'iconsax-react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStoresByCategory } from './reduxStore/storeSlice'
import StoreCard from '../components/storeCard'
import { RootState } from './reduxStore'

const Page = () => {

  const { name, id } = useLocalSearchParams<{ name: string, id: any }>()
  const { accessToken } = useSelector((state: RootState) => state.accessToken)
  const storesByCategory = useSelector((state: RootState) => state.store.storesByCategory);
  const dispatch = useDispatch<any>()

  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await dispatch(fetchStoresByCategory({ id, accessToken }));
      setisLoading(false);
    };

    fetchData();
  }, [])


  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-[#0b0b0b]'>

        <StatusBar style='light' />

        <View className='flex w-full flex-col px-6 bg-[#0b0b0b]' style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} className='w-14 h-14 flex justify-center items-center bg-[#fafafa]/10 rounded-full' >
            <ArrowLeft variant='Broken' size={20} color={Colors.white} />
          </TouchableOpacity>

          <View className='mt-6'>
            <Text className='text-2xl text-white' style={{ fontFamily: "medium" }}>{name}</Text>
          </View>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <View className='flex-1 flex bg-[#fffffc] justify-center items-center'>
          <ActivityIndicator className='' color={Colors.dark} />
        </View>
      ) : (
        <View className='flex-1 bg-[#fffffc]'>

          {
            storesByCategory?.length === 0 ? (
              <View className='flex-1 flex justify-center items-center'>
                <Text style={{ fontFamily: "medium" }}>Нема пронајдено резултати</Text>
              </View>
            ) : (
              <FlatList
                data={storesByCategory}
                className='px-6'
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <StoreCard item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 20,
                  paddingTop: 20,
                  backgroundColor: '#FFFFFC',
                }}
              />
            )}
        </View>
      )}
    </GestureHandlerRootView>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    paddingTop: (Platform.OS === 'android') ? 20 : 16
  },
  input: {
    paddingVertical: (Platform.OS === 'android') ? 16 : 22,
    fontFamily: 'medium',
  }
});