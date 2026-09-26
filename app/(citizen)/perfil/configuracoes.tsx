import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

export default function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferências</Text>
        <Text style={styles.text}>Gerencie as preferências da sua conta pelo menu do Perfil.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary, marginTop: 16, marginBottom: 20 },
  card: { backgroundColor: theme.colors.surface, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: theme.colors.border },
  cardTitle: { color: theme.colors.primary, fontSize: 18, fontWeight: '700', marginBottom: 8 },
  text: { color: theme.colors.text, lineHeight: 22 },
});