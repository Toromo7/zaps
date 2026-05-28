import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { COLORS } from "../src/constants/colors";
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { ToastManager } from "../src/components/Toast";
import { useOfflineDetection } from "../src/hooks/useNetworkStatus";
import "../src/locales/i18n"; // Initialize i18n

function LayoutContent() {
  useOfflineDetection();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        {/* Existing screens */}
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding-start" />
        <Stack.Screen name="account-type/index" />
        <Stack.Screen name="create-wallet" />
        <Stack.Screen name="backup-key" />
        <Stack.Screen name="password" />
        <Stack.Screen name="biometric" />
        <Stack.Screen name="username" />

        {/* Secure key management screens — Issue #97 */}
        <Stack.Screen
          name="mnemonic-backup"
          options={{
            // Prevent swipe-back while the phrase is visible
            gestureEnabled: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="wallet-recovery"
          options={{
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
      </Stack>
      <ToastManager />
    </View>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <LayoutContent />
    </ErrorBoundary>
  );
}
