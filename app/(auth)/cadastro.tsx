import { Link } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '../../components/Button';
import { theme } from '../../constants/theme';

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name="person-add" size={68} color={theme.colors.primary} />
        <Text style={styles.title}>Criar conta</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder="Seu nome" />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder="seu@email.com" autoCapitalize="none" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="********" secureTextEntry />

        <Button title="Cadastrar" />

        <View style={styles.row}>
          <Text style={styles.helperText}>Já possui conta?</Text>
          <Link href="/(auth)/login" style={styles.link}>Entrar</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  row: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  helperText: {
    color: theme.colors.textSecondary,
  },
  link: {
    color: theme.colors.primaryLight,
    fontWeight: '700',
  },
});
