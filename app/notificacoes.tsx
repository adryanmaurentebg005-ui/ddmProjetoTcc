import { StyleSheet, Text, View } from 'react-native';

export default function NotificacoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status atualizado</Text>
        <Text style={styles.cardText}>Sua denúncia #1024 foi encaminhada para análise.</Text>
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B65',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123B65',
    marginBottom: 6,
  },
  cardText: {
    color: '#4B5563',
  },
});
