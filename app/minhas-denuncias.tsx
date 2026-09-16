import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const denuncias = [
  { titulo: 'Buraco na rua', local: 'Rua X, 123', status: 'Em análise', cor: '#F59E0B' },
  { titulo: 'Lixo acumulado', local: 'Praça da Matriz', status: 'Resolvido', cor: '#2E7D32' },
  { titulo: 'Poste apagado', local: 'Av. Central, 45', status: 'Pendente', cor: '#DC2626' },
];

export default function MinhasDenunciasScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas denúncias</Text>
        <Link href="/denuncia/nova" style={styles.addLink}>+ Nova</Link>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {denuncias.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardLocal}>{item.local}</Text>
            <Text style={[styles.status, { color: item.cor }]}>{item.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 52,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B65',
  },
  addLink: {
    color: '#1976D2',
    fontSize: 18,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#123B65',
    marginBottom: 4,
  },
  cardLocal: {
    color: '#4B5563',
    fontSize: 14,
    marginBottom: 8,
  },
  status: {
    fontWeight: '700',
    fontSize: 14,
  },
});
