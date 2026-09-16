import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { mockDenuncias } from '../../services/api';
import { theme } from '../../constants/theme';

export default function CitizenHomeScreen() {
  const denuncias = mockDenuncias;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Sistema de Denúncia Urbana</Text>
          <MaterialIcons name="notifications" size={24} color={theme.colors.primary} />
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Olá, Maria</Text>
          <Text style={styles.heroText}>Sua cidade melhor começa com uma denúncia bem informada.</Text>
          <Link href="/(citizen)/denuncia/localizacao" asChild>
            <Button title="Nova denúncia" style={styles.button} />
          </Link>
        </View>

        <Text style={styles.sectionTitle}>Minhas denúncias</Text>

        {denuncias.map((item) => (
          <Link key={item.id} href={`/(citizen)/denuncia/${item.id}`} asChild>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.cardLocation}>{item.localizacao.endereco}</Text>
              <Text style={styles.cardDate}>{new Date(item.data).toLocaleDateString('pt-BR')}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary,
    flex: 1,
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
  },
  heroLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  heroText: {
    color: '#EAF3FF',
    marginBottom: 18,
  },
  button: {
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 14,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  cardLocation: {
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  cardDate: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
});
