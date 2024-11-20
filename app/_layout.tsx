import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from '@expo-google-fonts/frank-ruhl-libre';
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { TouchableOpacity, useColorScheme } from "react-native";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from "@/utils/cache";
import Logo from "@/assets/images/nyt-logo.svg";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

// Load the fonts first before hiding the splash screen
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>

                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen name="game" options={{ headerShown: false }} />

                <Stack.Screen
                  name="login"
                  options={{
                    presentation: 'modal',
                    headerTitle: () => <Logo width={150} height={40}/>,
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <TouchableWithoutFeedback
                        onPress={() => router.back()}>
                          <TouchableOpacity>
                            <Ionicons name="close" size={26} color={Colors.light.gray}/>
                          </TouchableOpacity>
                      </TouchableWithoutFeedback>
                    ),
                  }}
                />

              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
