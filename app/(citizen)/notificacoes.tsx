import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { mockNotifications } from '../../services/api';
import { theme } from '../../constants/theme';

export default function NotificacoesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
        <MaterialIcons name="notifications" size={28} color={theme.colors.primary} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {mockNotifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              {!item.lida && <View style={styles.dot} />}
            </View>
            <Text style={styles.cardText}>{item.mensagem}</Text>
            <Text style={styles.cardDate}>{new Date(item.data).toLocaleString('pt-BR')}</Text>
          </View>
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  cardText: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  cardDate: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.primaryLight,
  },
});
