import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {

  return (
    <SafeAreaView className='bg-[#FFFFFC] h-full'>

      <View className='bg-[#FFFFFC] pb-4 flex flex-col justify-between items-stretch pt-28 flex-1 px-6 z-20'>
        <StatusBar style='dark' />

        <View className=''>
          <Text className='text-xl text-center mt-8 text-[#0b0b0b]/80' style={{ fontFamily: 'bold' }}>Добредојде на</Text>
          <Text className='text-7xl text-[#1BD868] text-center' style={{ fontFamily: 'heavy' }}>GRIC</Text>
        </View>


        <View >
          <View className='mb-3'>
            <Text className='text-[#0b0b0b]/70 text-lg mt-2 text-center' style={{ fontFamily: 'medium' }}>Добредојдовте на нашата апликација за достава на храна!</Text>
          </View>

          <TouchableOpacity style={styles.input} onPress={() => router.push('/(auth)/setUsername')} className='w-full  py-6 mt-3 flex flex-row justify-center items-center bg-[#0b0b0b] rounded-2xl'>
            <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Креирај Профил</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input} onPress={() => router.push('/(auth)/signIn')} className='w-full mt-3  py-6 flex flex-row justify-center items-center bg-[#0b0b0b] rounded-2xl'>
            <Text className='text-lg text-[#FFFFFC]' style={{ fontFamily: 'medium' }}>Најави се</Text>
          </TouchableOpacity>
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
  }
});