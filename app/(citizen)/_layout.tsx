import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../../constants/theme';

export default function CitizenLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryLight,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="minhas-denuncias"
        options={{
          title: 'Denúncias',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          href: null,
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="map-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          href: null,
          title: 'Notificações',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bell-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen name="denuncia/nova" options={{ href: null }} />
      <Tabs.Screen name="denuncia/localizacao" options={{ href: null }} />
      <Tabs.Screen name="denuncia/[id]" options={{ href: null }} />
    </Tabs>
  );
}
