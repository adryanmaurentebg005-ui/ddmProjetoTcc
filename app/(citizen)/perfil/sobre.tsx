import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

export default function SobreScreen() {
  return <View style={styles.container}><Text style={styles.title}>Sobre o aplicativo</Text><Text style={styles.text}>Denúncia Urbana ajuda cidadãos a comunicar problemas da cidade.</Text></View>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 }, title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary, marginTop: 16, marginBottom: 18 }, text: { color: theme.colors.text, lineHeight: 22 } });
