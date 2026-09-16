import { StyleSheet, Text, View } from 'react-native';

export default function ModeradorHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Moderador</Text>
      <Text style={styles.subtitle}>Pendências para análise</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Denúncia #1024</Text>
        <Text style={styles.cardText}>Buraco na avenida principal</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#4B5563',
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
  },
  cardText: {
    color: '#4B5563',
    marginTop: 6,
  },
});
