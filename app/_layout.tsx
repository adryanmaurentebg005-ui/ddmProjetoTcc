import { Redirect, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, type ReactNode } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WebSafeArea />
      <AuthProvider>
        <RouteGuard />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function WebSafeArea() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = '#root { padding-top: env(safe-area-inset-top); }';
    document.head.appendChild(style);

    return () => style.remove();
  }, []);

  return null;
}

function SafeAreaShell({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {children}
    </SafeAreaView>
  );
}

function RouteGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const inAuth = segments[0] === '(auth)';

  if (loading) {
    return <SafeAreaShell><View style={styles.loading}><ActivityIndicator size="large" /></View></SafeAreaShell>;
  }

  if (!user && !inAuth) return <Redirect href="/(auth)/login" />;
  if (user && inAuth) return <Redirect href="/(citizen)/home" />;

  return (
    <SafeAreaShell>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F7FA' } }} />
    </SafeAreaShell>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
