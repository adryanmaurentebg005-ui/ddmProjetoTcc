import { Categoria, Denuncia, Notificacao, User } from '../types';

export const mockCategories: Categoria[] = [
  { id: 'buraco', nome: 'Buraco na via', ativo: true },
  { id: 'iluminacao', nome: 'Iluminação pública', ativo: true },
  { id: 'lixo', nome: 'Lixo e resíduos', ativo: true },
  { id: 'calcada', nome: 'Calçada', ativo: true },
  { id: 'semaforo', nome: 'Semáforo', ativo: true },
  { id: 'alagamento', nome: 'Alagamento', ativo: true },
  { id: 'outro', nome: 'Outro', ativo: true },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Maria Silva',
  email: 'maria@teste.com',
  role: 'CIDADAO',
};

export const mockDenuncias: Denuncia[] = [
  {
    id: 'd-1',
    protocolo: 'DU-2026-000123',
    titulo: 'Buraco na rua',
    categoriaId: 'buraco',
    descricao: 'Buraco na calçada próxima ao cruzamento com risco de acidente.',
    localizacao: {
      latitude: -23.5505,
      longitude: -46.6333,
      endereco: 'Rua General Osório, 145',
    },
    fotos: [],
    status: 'EM_ANALISE',
    data: '2026-09-15T08:30:00.000Z',
    usuarioId: 'user-1',
    historico: [
      { id: 'h-1', status: 'ENVIADA', data: '2026-09-15T08:30:00.000Z' },
      { id: 'h-2', status: 'EM_ANALISE', data: '2026-09-15T09:00:00.000Z' },
    ],
  },
  {
    id: 'd-2',
    protocolo: 'DU-2026-000456',
    titulo: 'Lâmpada apagada',
    categoriaId: 'iluminacao',
    descricao: 'Poste com iluminação apagada em frente ao parque.',
    localizacao: {
      latitude: -23.5485,
      longitude: -46.6365,
      endereco: 'Avenida Central, 45',
    },
    fotos: [],
    status: 'VALIDADA',
    data: '2026-09-12T10:00:00.000Z',
    usuarioId: 'user-1',
    historico: [
      { id: 'h-3', status: 'ENVIADA', data: '2026-09-12T10:00:00.000Z' },
      { id: 'h-4', status: 'VALIDADA', data: '2026-09-13T11:00:00.000Z' },
    ],
  },
];

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

export async function loginMock(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Credenciais inválidas.');
  }

  return {
    user: mockUser,
    token: 'mock-token-123',
  };
}

export async function fetchCategorias() {
  return mockCategories;
}

export async function fetchDenuncias() {
  return mockDenuncias;
}

export async function fetchNotificacoes() {
  return mockNotifications;
}
