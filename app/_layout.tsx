import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { NativeWindStyleSheet } from "nativewind";
import SplashComponent from '../components/splashScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './reduxStore';
import * as SecureStore from 'expo-secure-store'
import { setAccessToken } from './reduxStore/accessTokenSlice';
import { fetchUserInfo } from './reduxStore/userSlice';
import "react-native-reanimated"
import { fetchAddress } from './reduxStore/addressSlice';
import { CommentProvider } from './commentContext';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export {

  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/(tabs)/',
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
      });
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      throw error;
    }
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

  const { accessToken } = useSelector((state: RootState) => state.accessToken)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    const getAccessTokenFromStorage = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) {
          store.dispatch(setAccessToken(token))
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAccessTokenFromStorage();
  }, []);


  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken || user.role === 'ADMIN') {
      router.replace('/(auth)/welcome');
    } else {
      router.replace('/(tabs)/');
    }
  }, [accessToken, user, router]);

  return <NavigationStack />;
}

function NavigationStack() {
  return (
    <CommentProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/welcome" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)/setUsername" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)/setEmail" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)/setMobileNumber" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)/setPassword" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(auth)/signIn" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="store/[id]" />
      <Stack.Screen name="storeItem/[id]" options={{ presentation: "modal" }} />
      <Stack.Screen name="(order)/orders" />
      <Stack.Screen name="(order)/checkout" />
      <Stack.Screen name="(order)/orderPlaced" options={{ gestureEnabled: false }} />
      <Stack.Screen name="(order)/trackOrder" />
      <Stack.Screen name="(user)/notifications" />
      <Stack.Screen name="(user)/profile" />
      <Stack.Screen name="(modals)/manageAddresses" options={{ presentation: "modal" }} />
      <Stack.Screen name="(modals)/addAddress" options={{ presentation: "modal" }} />
      <Stack.Screen name="(modals)/orderComment" options={{ presentation: "modal" }} />
      <Stack.Screen name="(modals)/orderDetails" options={{ presentation: "formSheet" }} />
    </Stack>
    </CommentProvider>
  );
}