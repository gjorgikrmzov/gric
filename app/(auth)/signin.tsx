import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Google } from "iconsax-react-native";
import Colors from "../../constants/Colors";

WebBrowser.maybeCompleteAuthSession();

const Signin = () => {

  // Warm up the android browser to improve UX
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const signInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
    router.replace('/(tabs)/');
  }, [startOAuthFlow]);

  return (

      <View className='bg-[#0b0b0b] flex flex-col justify-between  py-16 pt-28 h-full px-8 z-20'>
      <Image source={require('../../assets/images/bg-0.jpg')} className="w-screen h-screen bottom-0 right-0 top-0 absolute" />
        <StatusBar style='light' />

        <View className=''>
          <Text className='text-xl text-center mt-8 text-white' style={{ fontFamily: 'bold' }}>Добредојде на</Text>
          <Text className='text-7xl text-[#ff4b19] text-center' style={{ fontFamily: 'heavy' }}>GRIC</Text>
        </View>


        <View>
          <View className='mb-3'>
            <Text className='text-white/80 text-lg mt-2 text-center' style={{ fontFamily: 'medium' }}>Добредојдовте на нашата апликација за достава на храна!</Text>
          </View>

          <TouchableOpacity onPress={signInWithGoogle} className='w-full mt-3 flex flex-row justify-center items-center py-5 bg-[#ff4b19] rounded-2xl'>
            <Google size={24} color={Colors.white} variant="Broken" />
            <Text className='text-lg ml-3 text-white' style={{ fontFamily: 'medium' }}>Најави се со Google</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default Signin;
