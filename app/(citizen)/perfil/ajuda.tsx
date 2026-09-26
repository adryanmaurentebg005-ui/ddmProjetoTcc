import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

export default function AjudaScreen() {
  return <View style={styles.container}><Text style={styles.title}>Ajuda</Text><Text style={styles.text}>Para registrar uma denúncia, informe o local, descreva o problema e confirme o envio.</Text></View>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 }, title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary, marginTop: 16, marginBottom: 18 }, text: { color: theme.colors.text, lineHeight: 22 } });
