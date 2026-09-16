import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { StatusBadge } from '../../components/StatusBadge';
import { mockDenuncias } from '../../services/api';
import { theme } from '../../constants/theme';

export default function MinhasDenunciasScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas denúncias</Text>
        <Link href="/(citizen)/denuncia/localizacao" style={styles.link}>
          <MaterialIcons name="add" size={22} color={theme.colors.primaryLight} />
        </Link>
      </View>

      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput placeholder="Buscar denúncia" style={styles.searchInput} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {mockDenuncias.map((item) => (
          <Link key={item.id} href={`/(citizen)/denuncia/${item.id}`} asChild>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.cardText}>{item.descricao}</Text>
              <Text style={styles.cardMeta}>{item.localizacao.endereco}</Text>
              <Text style={styles.cardMeta}>Protocolo: {item.protocolo}</Text>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  link: {
    padding: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  cardText: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  cardMeta: {
    color: theme.colors.text,
    fontSize: 12,
    marginBottom: 2,
  },
});
