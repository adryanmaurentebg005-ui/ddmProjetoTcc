import { Drawer } from 'expo-router/drawer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../../contexts/AuthContext';
import { theme } from '../../../constants/theme';

export default function PerfilLayout() {
  const { logout } = useAuth();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.primaryLight,
        drawerLabelStyle: { color: theme.colors.text },
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Perfil', drawerIcon: ({ color, size }) => <MaterialIcons name="person-outline" color={color} size={size} /> }} />
      <Drawer.Screen name="configuracoes" options={{ title: 'Configurações', drawerIcon: ({ color, size }) => <MaterialIcons name="settings" color={color} size={size} /> }} />
      <Drawer.Screen name="ajuda" options={{ title: 'Ajuda', drawerIcon: ({ color, size }) => <MaterialIcons name="help-outline" color={color} size={size} /> }} />
      <Drawer.Screen name="sobre" options={{ title: 'Sobre o aplicativo', drawerIcon: ({ color, size }) => <MaterialIcons name="info-outline" color={color} size={size} /> }} />
      <Drawer.Screen name="sair" options={{ title: 'Sair', drawerIcon: ({ color, size }) => <MaterialIcons name="logout" color={color} size={size} />, drawerItemStyle: { marginTop: 'auto' } }} listeners={{ drawerItemPress: (event) => { event.preventDefault(); void logout(); } }} />
    </Drawer>
  );
}