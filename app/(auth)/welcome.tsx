import React from 'react';
import { Platform, StyleSheet, Text, Pressable, View,TouchableOpacity  } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableScale  } from 'react-native-pressable-scale'

const Page = () => {

  return (
    <SafeAreaView className='bg-[#0b0b0b] h-full'>

      <View className='bg-[#0b0b0b] pb-4 flex flex-col justify-between items-stretch pt-28 flex-1 px-6 z-20'>
        <StatusBar style='light' />

        <View className=''>
          <Text className='text-xl text-center mt-8 text-[#fffffc]/80' style={{ fontFamily: 'bold' }}>Добредојде на</Text>
          <Text className='text-7xl text-[#1BD868] text-center' style={{ fontFamily: 'heavy' }}>GRIC</Text>
        </View>

        <View >
          <View className='mb-3'>
            <Text className='text-[#fffffc]/70 text-lg mt-2 text-center' style={{ fontFamily: 'medium' }}>Добредојдовте на нашата апликација за достава на храна!</Text>
          </View>

          <PressableScale onPress={() => router.push('/(auth)/setUsername')} className='w-full mt-3  py-5 flex flex-row justify-center items-center border-2 border-[#1BD868] bg-[#121212]/90 rounded-3xl'>
            <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Креирај профил</Text>
          </PressableScale >

          <PressableScale onPress={() => router.push('/(auth)/signIn')} className='w-full mt-3  py-5 flex flex-row justify-center items-center border-2 border-[#1BD868] bg-[#121212]/90 rounded-3xl'>
            <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Најави се</Text>
          </PressableScale>
        </View>
      </View>
    </SafeAreaView>
  );
};  

export default Page;


const styles = StyleSheet.create({
  input: {
    paddingVertical: (Platform.OS === 'android') ? 20 : 24,
    fontFamily: 'medium',
  },

});