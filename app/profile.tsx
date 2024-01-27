import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft2, DirectboxNotif, Edit, Edit2, Information, Lifebuoy, LogoutCurve, Trash, User } from 'iconsax-react-native';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Page = () => {

  const { signOut, isSignedIn } = useAuth();

  const { user } = useUser()

  const showAlert = () => {
    Alert.alert(
      'Одјава',
      'Дали сакате да се одјавите',
      [
        {
          text: 'Не',
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: () => {
            signOut()
            router.replace('/(auth)/signin')
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className='bg-[#0b0b0b]'>
      <View className='px-6 py-4 h-full bg-[#0b0b0b]'>
        <View className='flex flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl' >
            <ArrowLeft2 variant='Linear' size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text className='text-lg text-[#e0e0e0]' style={{ fontFamily: 'medium' }}>Профил</Text>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>



        <View className='flex flex-col mt-10'>
          <View className='flex flex-row items-center justify-between'>
            <View>
              <Text className='text-2xl text-[#e0e0e0]' style={{ fontFamily: 'medium' }}>{user?.fullName}</Text>
              <Text className='text-md text-[#e0e0e0]/70' style={{ fontFamily: 'medium' }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>

            <TouchableOpacity className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl'>
              <Edit color={Colors.white} size={20} variant='Broken' />
            </TouchableOpacity>
          </View>
        </View>


        <View className='mt-10 mb-4 flex-1 flex flex-col'>

          <View className='flex flex-col'>
            <Text className='text-[#e0e0e0]/60 uppercase' style={{ fontFamily: 'extrabold' }}>поставки</Text>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/orders')} className='py-6 flex-row items-center  border-b border-[#e0e0e0]/20  flex'>
              <View className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl'>
                <DirectboxNotif variant="Bulk" size={24} color={Colors.primary} />
              </View>
              <View className='flex-col mt-2 ml-3'>
                <Text className='text-[#e0e0e0]/60 text-[14px]' style={{ fontFamily: "medium" }}>Вашите нарачки</Text>
                <Text className='text-[#e0e0e0] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Нарачки</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/(tabs)/orders')} className='py-6 flex-row items-center  border-b border-[#e0e0e0]/20  flex'>
              <View className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl'>
                <Lifebuoy variant="Bulk" size={24} color={Colors.primary} />
              </View>
              <View className='flex-col mt-2 ml-3'>
                <Text className='text-[#e0e0e0]/60 text-[14px]' style={{ fontFamily: "medium" }}>Испрати порака</Text>
                <Text className='text-[#e0e0e0] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Помош</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/(tabs)/orders')} className='py-6 flex-row items-center  border-b border-[#e0e0e0]/20  flex'>
              <View className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl'>
                <Information variant="Bulk" size={24} color={Colors.primary} />
              </View>
              <View className='flex-col mt-2 ml-3'>
                <Text className='text-[#e0e0e0]/60 text-[14px]' style={{ fontFamily: "medium" }}>Детални информации</Text>
                <Text className='text-[#e0e0e0] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>За Нас</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/(tabs)/orders')} className='py-6 flex-row items-center  border-b border-[#e0e0e0]/20  flex'>
              <View className='w-10 h-10 flex justify-center items-center bg-[#e0e0e0]/10 rounded-xl'>
                <LogoutCurve variant="Bulk" size={24} color={Colors.primary} />
              </View>
              <View className='flex-col mt-2 ml-3'>
                <Text className='text-[#e0e0e0]/60 text-[14px]' style={{ fontFamily: "medium" }}>Излези од профилот</Text>
                <Text className='text-[#e0e0e0] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Одјави се</Text>
              </View>
            </TouchableOpacity>
          </View>


        </View>

      </View>
    </SafeAreaView >
  )
}

export default Page