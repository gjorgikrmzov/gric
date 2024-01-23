import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft2, User } from 'iconsax-react-native';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Page = () => {

  const { signOut, isSignedIn } = useAuth();

  const { user } = useUser()

  const showAlert = () => {
    Alert.alert(
      'Одјави се',
      'Дали сакаш да се одјавиш',
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
    <SafeAreaView className='bg-[#131313]'>
      <View className='px-6 py-4 h-full bg-[#131313]'>
        <View className='flex flex-row gap-x-3 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()} >
            <ArrowLeft2 variant='Linear' size={26} color={Colors.white} />
          </TouchableOpacity>
          <Text className='text-lg text-white' style={{ fontFamily: 'medium' }}>Профил</Text>

          <Text className='text-4xl text-[#ff4b19]' style={{ fontFamily: "heavy" }}>G</Text>
        </View>


        <View className='flex-1 mt-10 flex-col justify-between'>

          <View className='flex flex-row items-center gap-x-3'>
            <View className='w-14 h-14 flex justify-center items-center rounded-xl border bg-white/5 border-white/10'>
              <User size={28} color={Colors.primary} variant='Broken' />
            </View>
            <View>
              <Text className='text-lg text-white' style={{ fontFamily: 'medium' }}>{user?.fullName}</Text>
              <Text className='text-md text-white/70' style={{ fontFamily: 'medium' }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={showAlert} className='py-3 justify-center items-center border-2 border-white/60 rounded-2xl mt-4'>
              <Text className='text-lg text-white' style={{ fontFamily: 'medium' }} >Одјави се</Text>
          </TouchableOpacity>

        </View>

        {/* <View className=''>

          {!isSignedIn && (
            <Link href={'/(auth)/signin'}>
              <Text>Login</Text>
            </Link>
          )}

        </View> */}

      </View>
    </SafeAreaView >
  )
}

export default Page