import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { NativeWindStyleSheet } from "nativewind";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import SplashComponent from '../components/splashScreen';

const CLERK_PUBLISHABLE_KEY = 'pk_test_cHJvZm91bmQtb3dsLTEzLmNsZXJrLmFjY291bnRzLmRldiQ'


const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return
    }
  },
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.hideAsync(); // Optional: Hide the native splash screen

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
    // Hide the splash screen when loaded
    if (loaded) {
      setTimeout(() => {
        setSplashVisible(false);
      }, 1000); // Adjust the duration as needed
    }
  }, [loaded]);

  useEffect(() => {
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    if (error) throw error;
  }, [error]);

  if (!loaded || splashVisible) {
    return <SplashComponent />;
  }


  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  )
}

function RootLayoutNav() {

  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(auth)/welcome')
    } else {
      router.push('/(tabs)/')
    }
  }, [isLoaded])

  return (
    <Stack>
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setUsername" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setEmail" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/setPassword" options={{ headerShown: false, gestureEnabled: false, }} />
      <Stack.Screen name="(auth)/signIn" options={{ headerShown: false }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false, }} />

      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen name="restaurantDetails" options={{ headerShown: false }} />
      <Stack.Screen name="foodDetails" options={{ headerShown: false, presentation: "modal" }} />

      <Stack.Screen name="(order)/orders" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/checkout" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/orderPlaced" options={{ headerShown: false }} />
      <Stack.Screen name="(order)/trackOrder" options={{ headerShown: false }} />

      <Stack.Screen name="(user)/notifications" options={{ headerShown: false }} />
      <Stack.Screen name="(user)/profile" options={{ headerShown: false }} />

      <Stack.Screen name="(modals)/manageAdresses" options={{ headerShown: false, presentation: "modal" }} />
      <Stack.Screen name="(modals)/filter" options={{ headerShown: false, presentation: "modal" }} />
    </Stack>
  );
}
