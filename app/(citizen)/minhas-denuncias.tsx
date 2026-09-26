import React from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { observarDenunciasDoUsuario, excluirDenuncia } from '../../services/denuncias';
import { Denuncia } from '../../types';
import { theme } from '../../constants/theme';

export default function MinhasDenunciasScreen() {
  const { success } = useLocalSearchParams<{ success?: string }>();
  const { user } = useAuth();
  const [denuncias, setDenuncias] = React.useState<Denuncia[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [pendingDelete, setPendingDelete] = React.useState<Denuncia | null>(null);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [successVisible, setSuccessVisible] = React.useState(success === '1');

  React.useEffect(() => {
    if (success !== '1') return;
    setSuccessVisible(true);
    const timeout = setTimeout(() => {
      setSuccessVisible(false);
      router.setParams({ success: undefined });
    }, 4000);
    return () => clearTimeout(timeout);
  }, [success]);

  React.useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timeout);
  }, [feedback]);
  React.useEffect(() => {
    if (!user) return;
    const unsubscribe = observarDenunciasDoUsuario(
      user.uid,
      (nextDenuncias) => {
        setDenuncias(nextDenuncias);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  const filteredDenuncias = denuncias.filter((item) => {
    const search = query.trim().toLocaleLowerCase();
    const categoryNames: Record<string, string> = { buraco: 'Buraco na via', iluminacao: 'Iluminação pública', lixo: 'Lixo e resíduos', calcada: 'Calçada', semaforo: 'Semáforo', alagamento: 'Alagamento', outro: 'Outro' };
    return !search || [item.titulo, item.descricao, item.categoriaId, categoryNames[item.categoriaId] ?? ''].some((value) => value.toLocaleLowerCase().includes(search));
  });

  const handleDelete = async () => {
    if (!pendingDelete || !user) return;
    try {
      await excluirDenuncia(pendingDelete.id, user.uid);
      setDenuncias((current) => current.filter((item) => item.id !== pendingDelete.id));
      setFeedback('Denúncia excluída com sucesso.');
    } catch (error) {
      console.error(error);
      setFeedback('Não foi possível excluir a denúncia.');
    } finally {
      setPendingDelete(null);
    }
  };

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
        <TextInput placeholder="Buscar por título, descrição ou categoria" placeholderTextColor={theme.colors.placeholder} value={query} onChangeText={setQuery} style={styles.searchInput} />
      </View>

      {successVisible && <Text style={styles.success}>Denúncia cadastrada com sucesso.</Text>}
      {feedback && <Text style={styles.success}>{feedback}</Text>}

      <ScrollView contentContainerStyle={styles.list}>
        {loading && <ActivityIndicator color={theme.colors.primaryLight} />}
        {!loading && filteredDenuncias.length === 0 && <Text style={styles.empty}>Nenhuma denúncia encontrada.</Text>}
        {filteredDenuncias.map((item) => (
          <View key={item.id} style={styles.card}>
            <Link href={`/(citizen)/denuncia/${item.id}`} asChild>
              <Pressable style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.cardText}>{item.descricao}</Text>
              <Text style={styles.cardMeta}>{item.localizacao.endereco}</Text>
              <Text style={styles.cardMeta}>Ocorrência em: {new Date(item.dataOcorrencia ?? item.data).toLocaleString('pt-BR')}</Text>
              <Text style={styles.cardMeta}>Enviada em: {new Date(item.data).toLocaleString('pt-BR')}</Text>
              <Text style={styles.cardMeta}>Protocolo: {item.protocolo}</Text>
              </Pressable>
            </Link>
            <Pressable accessibilityLabel={`Excluir ${item.titulo}`} onPress={() => setPendingDelete(item)} style={styles.deleteButton}>
              <MaterialIcons name="delete-outline" size={22} color={theme.colors.error} />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Modal visible={Boolean(pendingDelete)} transparent animationType="fade" onRequestClose={() => setPendingDelete(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Excluir denúncia?</Text>
            <Text style={styles.modalText}>Tem certeza que deseja excluir esta denúncia? Essa ação não poderá ser desfeita.</Text>
            <View style={styles.modalActions}>
              <Button title="Cancelar" variant="primary" onPress={() => setPendingDelete(null)} style={styles.modalButton} />
              <Button title="Excluir" variant="danger" onPress={handleDelete} style={styles.modalButton} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingTop: theme.spacing.screenTop,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
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
    color: theme.colors.inputText,
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
    position: 'relative',
  },
  cardBody: {
    paddingRight: 38,
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
  empty: {
    color: theme.colors.textSecondary,
    paddingVertical: 20,
  },
  deleteButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    padding: 8,
  },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: theme.colors.surface, borderRadius: 18, padding: 22 },
  modalTitle: { color: theme.colors.primary, fontSize: 20, fontWeight: '800', marginBottom: 12 },
  modalText: { color: theme.colors.text, lineHeight: 21, marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  modalButton: { minWidth: 100 },
  success: {
    color: theme.colors.success,
    backgroundColor: '#EAF6EA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
});
