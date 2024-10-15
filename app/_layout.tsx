// layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="home" />
      <Stack.Screen name="task" />
      <Stack.Screen name="library" />
      <Stack.Screen name="shop" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
