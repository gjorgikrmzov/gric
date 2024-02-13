import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft2, DirectboxNotif, Edit, Edit2, Heart, Information, Lifebuoy, Location, LogoutCurve, Trash, User } from 'iconsax-react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {

  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('@userEmail');
        const savedFirstName = await AsyncStorage.getItem('@userFirstName');
        const savedLastName = await AsyncStorage.getItem('@userLastName');

        if (savedEmail !== null) {
          setEmail(savedEmail);
        }
        if (savedFirstName !== null) {
          setFirstName(savedFirstName);
        }
        if (savedLastName !== null) {
          setLastName(savedLastName);
        }
      } catch (error) {
        console.error('Failed to fetch user data.', error);
      }
    };

    getUserData();
  }, []);

  const { signOut, isSignedIn } = useAuth();


  const handleSignOut = () => {
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
            router.replace('/(auth)/welcome')
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className='bg-[#fafafa]'>
      <View className=' py-4 bg-[#fafafa]'>
        <View className='px-6 flex flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl' >
            <ArrowLeft2 variant='Linear' size={22} color={Colors.dark} />
          </TouchableOpacity>
          <Text className='text-lg text-[#0b0b0b]' style={{ fontFamily: 'medium' }}>Профил</Text>

          <Text className='text-4xl text-[#85B4FF]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>



        <View className='flex flex-col mt-10 pb-3'>
          <View className='flex flex-row px-6 items-center justify-between'>
            <View>
              <Text className='text-2xl text-[#0b0b0b]' style={{ fontFamily: 'semibold' }}>{firstName} {lastName}</Text>
              <Text className='text-md text-[#0b0b0b]/70' style={{ fontFamily: 'medium' }}>{email}</Text>
            </View>

            <TouchableOpacity className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <Edit color={Colors.dark} size={20} variant='Broken' />
            </TouchableOpacity>
          </View>
        </View>
      </View>


      <View className='h-full flex flex-col'>

        <View className='flex flex-col'>
          <TouchableOpacity onPress={() => router.replace('/orders')} className='py-6 px-6  flex-row items-center border-b border-[#0b0b0b]/10  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <DirectboxNotif variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Вашите нарачки</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Нарачки</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/manageAdresses')} className='py-6 px-6  flex-row items-center  border-b border-[#0b0b0b]/10  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <Location variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Адреса на достава</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Адреси</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className='py-6 px-6  flex-row items-center  border-b border-[#0b0b0b]/10  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <Heart variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Омилени Ресторани</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Омилени</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/orders')} className='py-6 px-6 flex-row items-center  border-b border-[#0b0b0b]/10  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <Lifebuoy variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Испрати порака</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Помош</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/orders')} className='py-6 px-6  flex-row items-center  border-b border-[#0b0b0b]/10  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <Information variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Информации</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>За Нас</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignOut} className='py-6 px-6  flex-row items-center  flex'>
            <View className='w-10 h-10 flex justify-center items-center bg-[#F0F1F3]/60 rounded-xl'>
              <LogoutCurve variant="Bulk" size={24} color={Colors.primary} />
            </View>
            <View className='flex-col ml-3'>
              <Text className='text-[#0b0b0b]/60 text-[14px]' style={{ fontFamily: "medium" }}>Излези од профилот</Text>
              <Text className='text-[#0b0b0b] text-lg mt-[1px]' style={{ fontFamily: 'medium' }}>Одјави се</Text>
            </View>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView >
  )
}

export default Page