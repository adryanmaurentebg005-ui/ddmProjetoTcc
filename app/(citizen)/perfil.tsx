import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from '../../constants/theme';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name="account-circle" size={72} color={theme.colors.primary} />
        <Text style={styles.name}>Maria Silva</Text>
        <Text style={styles.role}>Cidadã</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  role: {
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
});
