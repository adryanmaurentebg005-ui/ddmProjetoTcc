import { Link, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function NovaDenunciaScreen() {
  const params = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
    address?: string;
  }>();
  const latitude = Number(params.latitude);
  const longitude = Number(params.longitude);
  const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude) && Boolean(params.address);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Link href="/" asChild>
          <Pressable style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#123B65"
            />
          </Pressable>
        </Link>

        <View style={styles.headerText}>
          <Text style={styles.title}>Nova denúncia</Text>

          <Text style={styles.subtitle}>
            Informe o problema encontrado
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.confirmedLocation}>
          <MaterialCommunityIcons name="map-marker-check" size={22} color="#1976D2" />
          <View style={styles.confirmedLocationText}>
            <Text style={styles.confirmedLocationTitle}>{hasLocation ? 'Localização confirmada' : 'Localização não informada'}</Text>
            <Text style={styles.confirmedLocationAddress}>{params.address ?? 'Volte e selecione o local da ocorrência.'}</Text>
            <Text style={styles.confirmedLocationCoordinates}>
              {hasLocation ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : 'Latitude e longitude serão salvas após a confirmação.'}
            </Text>
          </View>
          <Link href="/(citizen)/denuncia/localizacao" asChild>
            <Pressable accessibilityLabel="Alterar localização">
            <MaterialCommunityIcons name="pencil" size={20} color="#123B65" />
            </Pressable>
          </Link>
        </View>

        <Text style={styles.label}>Título</Text>

        <TextInput
          placeholder="Ex.: Buraco na rua"
          placeholderTextColor="#98A2B3"
          style={styles.input}
        />

        <Text style={styles.label}>Categoria</Text>

        <Pressable style={styles.select}>
          <Text style={styles.selectText}>
            Selecione a categoria
          </Text>

          <MaterialCommunityIcons
            name="chevron-down"
            size={22}
            color="#667085"
          />
        </Pressable>

        <Text style={styles.label}>Descrição</Text>

        <TextInput
          placeholder="Descreva o problema"
          placeholderTextColor="#98A2B3"
          multiline
          numberOfLines={5}
          style={[styles.input, styles.textArea]}
        />
      </View>

      <Pressable style={[styles.primaryButton, !hasLocation && styles.disabledButton]} disabled={!hasLocation}>
        <MaterialCommunityIcons name="send" size={20} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>{hasLocation ? 'ENVIAR DENÚNCIA' : 'SELECIONE UMA LOCALIZAÇÃO'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#123B65',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#667085',
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },

  confirmedLocation: {
    borderRadius: 14,
    backgroundColor: '#F2F7FC',
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  confirmedLocationText: {
    flex: 1,
  },

  confirmedLocationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#123B65',
    marginBottom: 4,
  },

  confirmedLocationAddress: {
    fontSize: 14,
    lineHeight: 19,
    color: '#344054',
  },

  confirmedLocationCoordinates: {
    fontSize: 12,
    color: '#667085',
    marginTop: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#123B65',
    marginBottom: 8,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
    color: '#101828',
    backgroundColor: '#FFFFFF',
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  select: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  selectText: {
    fontSize: 16,
    color: '#667085',
  },

  locationCard: {
    minHeight: 90,
    borderRadius: 14,
    backgroundColor: '#F2F7FC',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DCEBFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  locationContent: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#123B65',
    marginBottom: 4,
  },

  locationText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#667085',
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: '#1976D2',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  disabledButton: {
    opacity: 0.5,
  },
});