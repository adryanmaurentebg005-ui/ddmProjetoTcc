import { Notificacao } from '../types';

export const mockNotifications: Notificacao[] = [
  {
    id: 'n-1',
    titulo: 'Denúncia recebida',
    mensagem: 'Sua denúncia DU-2026-000123 foi recebida e será analisada.',
    lida: false,
    data: '2026-09-15T09:15:00.000Z',
  },
  {
    id: 'n-2',
    titulo: 'Atualização de status',
    mensagem: 'Sua denúncia DU-2026-000456 está validada.',
    lida: true,
    data: '2026-09-14T14:00:00.000Z',
  },
];

export async function fetchNotificacoes() {
  return mockNotifications;
}
