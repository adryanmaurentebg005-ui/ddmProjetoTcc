import { Link, router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button } from '../../components/Button';
import { theme } from '../../constants/theme';
import { loginMock } from '../../services/api';

export default function LoginScreen() {
  const handleLogin = async () => {
    try {
      await loginMock('maria@teste.com', '123456');
      router.replace('/(citizen)/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name="account-circle" size={72} color={theme.colors.primary} />
        <Text style={styles.title}>Acesso ao sistema</Text>
        <Text style={styles.subtitle}>Entre com sua conta para acompanhar denúncias.</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value="maria@teste.com" autoCapitalize="none" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value="123456" secureTextEntry />

        <Button title="Entrar" onPress={handleLogin} />

        <View style={styles.row}>
          <Text style={styles.helperText}>Não tem conta?</Text>
          <Link href="/(auth)/cadastro" style={styles.link}>Cadastre-se</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: 10,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
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
