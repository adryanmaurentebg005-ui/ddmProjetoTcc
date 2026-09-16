export type UserRole = 'CIDADAO' | 'MODERADOR' | 'ADMIN';

export type DenunciaStatus =
  | 'ENVIADA'
  | 'EM_ANALISE'
  | 'AGUARDANDO_INFORMACOES'
  | 'VALIDADA'
  | 'EM_ATENDIMENTO'
  | 'RESOLVIDA'
  | 'REJEITADA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Categoria {
  id: string;
  nome: string;
  ativo: boolean;
}

export interface Localizacao {
  latitude: number;
  longitude: number;
  endereco?: string;
}

export interface Foto {
  id: string;
  uri: string;
}

export interface HistoricoStatus {
  id: string;
  status: DenunciaStatus;
  data: string;
  observacao?: string;
}

export interface Denuncia {
  id: string;
  protocolo: string;
  titulo: string;
  categoriaId: string;
  descricao: string;
  localizacao: Localizacao;
  fotos: Foto[];
  status: DenunciaStatus;
  data: string;
  usuarioId: string;
  historico: HistoricoStatus[];
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  data: string;
}
