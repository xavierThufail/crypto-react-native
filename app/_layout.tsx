import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import { View } from '@/components/Themed';
import { CurrencyDetail, useCurrency } from '@/hooks';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const currencyHook = useCurrency();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CurrencyDetail.Provider value={currencyHook}>
        <View style={{ height: StatusBar.currentHeight }}>
          <SafeAreaView>
            <StatusBar translucent />
          </SafeAreaView>
        </View>
        <Stack>
          <Stack.Screen name="search" options={{  headerShown: false }} />
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
        </Stack>
      </CurrencyDetail.Provider>
    </ThemeProvider>
  );
}
