import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Acesse sua conta para registrar e acompanhar denúncias.</Text>

        <TextInput placeholder="E-mail" style={styles.input} autoCapitalize="none" />
        <TextInput placeholder="Senha" secureTextEntry style={styles.input} />

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>ENTRAR</Text>
        </Pressable>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Não tem conta?</Text>
          <Link href="/cadastro" asChild>
            <Pressable>
              <Text style={styles.linkText}>Cadastre-se</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123B65',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#123B65',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1976D2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    gap: 8,
  },
  footerText: {
    color: '#4B5563',
  },
  linkText: {
    color: '#1976D2',
    fontWeight: '700',
  },
});
