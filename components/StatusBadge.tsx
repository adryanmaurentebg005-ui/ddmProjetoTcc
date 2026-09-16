import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DenunciaStatus } from '../types';
import { theme } from '../constants/theme';

const statusMap: Record<DenunciaStatus, { label: string; color: string; background: string }> = {
  ENVIADA: { label: 'Enviada', color: theme.colors.info, background: '#EAF3FF' },
  EM_ANALISE: { label: 'Em análise', color: theme.colors.warning, background: '#FFF4DF' },
  AGUARDANDO_INFORMACOES: { label: 'Aguardando informações', color: theme.colors.warning, background: '#FFF4DF' },
  VALIDADA: { label: 'Validada', color: theme.colors.success, background: '#EAF7EE' },
  EM_ATENDIMENTO: { label: 'Em atendimento', color: theme.colors.primaryLight, background: '#EAF3FF' },
  RESOLVIDA: { label: 'Resolvida', color: theme.colors.success, background: '#EAF7EE' },
  REJEITADA: { label: 'Rejeitada', color: theme.colors.error, background: '#FDECEC' },
};

interface StatusBadgeProps {
  status: DenunciaStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.background }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: theme.radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
