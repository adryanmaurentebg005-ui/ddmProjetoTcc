import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBadge } from '../../../components/StatusBadge';
import { buscarDenuncia } from '../../../services/denuncias';
import { Denuncia } from '../../../types';
import { theme } from '../../../constants/theme';

export default function DenunciaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [denuncia, setDenuncia] = React.useState<Denuncia | null>(null);
  React.useEffect(() => { if (id) buscarDenuncia(id).then(setDenuncia).catch(console.error); }, [id]);

  if (!denuncia) return <View style={styles.loading}><ActivityIndicator size="large" color={theme.colors.primaryLight} /></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MaterialIcons name="assignment" size={28} color={theme.colors.primary} />
        <Text style={styles.title}>{denuncia.titulo}</Text>
      </View>

      <StatusBadge status={denuncia.status} />

      <View style={styles.card}>
        <Text style={styles.label}>Protocolo</Text>
        <Text style={styles.value}>{denuncia.protocolo}</Text>

        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.value}>{denuncia.categoriaId}</Text>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>{denuncia.descricao}</Text>

        <Text style={styles.label}>Localização</Text>
        <Text style={styles.label}>Registrada em</Text>
        <Text style={styles.value}>{new Date(denuncia.data).toLocaleString('pt-BR')}</Text>
        <Text style={styles.label}>Data e hora da ocorrência</Text>
        <Text style={styles.value}>{new Date(denuncia.dataOcorrencia ?? denuncia.data).toLocaleString('pt-BR')}</Text>
        <Text style={styles.label}>Localização</Text>
        <Text style={styles.value}>{denuncia.localizacao?.endereco ?? 'Não informada'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingTop: theme.spacing.screenTop,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  label: {
    color: theme.colors.textSecondary,
    fontWeight: '700',
    marginTop: 12,
  },
  value: {
    color: theme.colors.text,
    marginTop: 4,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
