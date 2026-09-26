import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  where,
  query,
} from 'firebase/firestore';
import { Denuncia, DenunciaStatus, Localizacao } from '../types';
import { db } from './firebase';

const denunciasCollection = collection(db, 'denuncias');

function toDenuncia(id: string, data: Record<string, unknown>): Denuncia {
  const dataRegistro = data.data instanceof Timestamp
    ? data.data.toDate().toISOString()
    : String(data.data ?? new Date().toISOString());

  return {
    id,
    protocolo: String(data.protocolo ?? id.slice(0, 8).toUpperCase()),
    titulo: String(data.titulo ?? ''),
    categoriaId: String(data.categoriaId ?? 'outro'),
    descricao: String(data.descricao ?? ''),
    localizacao: (data.localizacao ?? {}) as Localizacao,
    fotos: [],
    status: (data.status ?? 'ENVIADA') as DenunciaStatus,
    data: dataRegistro,
    usuarioId: String(data.usuarioId ?? ''),
    historico: [],
    dataOcorrencia: data.dataOcorrencia instanceof Timestamp
      ? data.dataOcorrencia.toDate().toISOString()
      : String(data.dataOcorrencia ?? dataRegistro),
  };
}

export async function criarDenuncia(input: {
  titulo: string;
  categoriaId: string;
  descricao: string;
  dataOcorrencia: Date;
  usuarioId: string;
  localizacao?: Localizacao;
}) {
  const ref = await addDoc(denunciasCollection, {
    ...input,
    data: serverTimestamp(),
    dataOcorrencia: Timestamp.fromDate(input.dataOcorrencia),
    status: 'ENVIADA',
    protocolo: `DU-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
  });
  return ref.id;
}

export function observarDenunciasDoUsuario(usuarioId: string, onChange: (denuncias: Denuncia[]) => void, onError: (error: Error) => void) {
  return onSnapshot(
    query(denunciasCollection, where('usuarioId', '==', usuarioId)),
    (snapshot) => {
      const denuncias = snapshot.docs
        .map((item) => toDenuncia(item.id, item.data()))
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      onChange(denuncias);
    },
    onError,
  );
}

export async function buscarDenunciasDoUsuario(usuarioId: string) {
  const snapshot = await getDocs(query(denunciasCollection, where('usuarioId', '==', usuarioId)));
  return snapshot.docs
    .map((item) => toDenuncia(item.id, item.data()))
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export async function buscarDenuncia(id: string) {
  const snapshot = await getDoc(doc(db, 'denuncias', id));
  return snapshot.exists() ? toDenuncia(snapshot.id, snapshot.data()) : null;
}

export async function excluirDenuncia(id: string, usuarioId: string) {
  const reference = doc(db, 'denuncias', id);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists() || snapshot.data().usuarioId !== usuarioId) {
    throw new Error('Denúncia não encontrada ou sem permissão para excluir.');
  }
  await deleteDoc(reference);
}
