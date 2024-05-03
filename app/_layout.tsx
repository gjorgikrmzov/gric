import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { NativeWindStyleSheet } from "nativewind";
import SplashComponent from '../components/splashScreen';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './reduxStore';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export {

  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.hideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'heavy': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'extrabold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'extraboldI': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
  });

  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setSplashVisible(false);
      }, 1000);
    }
  }, [loaded]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded || splashVisible) {
    return <SplashComponent />;
  }
  

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav() {

 

  return (
    <Stack>
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setUsername" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setEmail" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setMobileNumber" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setPassword" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/signIn" options={{ headerShown: false }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false, }} />

      <Stack.Screen name="storeDetails/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ headerShown: false }} />
      <Stack.Screen name="foodDetails/[id]" options={{ headerShown: false, presentation: "modal" }} />

      <Stack.Screen name="(order)/orders" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/checkout" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/orderPlaced" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/trackOrder" options={{ headerShown: false }} />

      <Stack.Screen name="(user)/notifications" options={{ headerShown: false }} />
      <Stack.Screen name="(user)/profile" options={{ headerShown: false }} />

      <Stack.Screen name="(modals)/manageAddresses" options={{ headerShown: false, presentation: "modal" }} />
      <Stack.Screen name="(modals)/setAddressInfo" options={{ headerShown: false, presentation: "modal" }} />
      
      <Stack.Screen name="delivery-admin" options={{ headerShown: false, gestureEnabled: false }} />
    </Stack>
  );
}
