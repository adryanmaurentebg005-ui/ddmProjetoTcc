import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerToggleButton } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { theme } from '../../../constants/theme';

export default function PerfilScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <DrawerToggleButton tintColor={theme.colors.primary} />
      </View>
      <View style={styles.card}>
        <MaterialIcons name="account-circle" size={72} color={theme.colors.primary} />
        <Text style={styles.name}>{user?.displayName ?? 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>Cidadã</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, paddingTop: theme.spacing.screenTop },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary },
  card: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  name: { marginTop: 10, fontSize: 24, fontWeight: '800', color: theme.colors.primary },
  email: { color: theme.colors.text, marginTop: 4 },
  role: { color: theme.colors.textSecondary, marginTop: 6 },
});