import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from '../../constants/theme';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa de denúncias</Text>
        <MaterialIcons name="map" size={28} color={theme.colors.primary} />
      </View>

      <View style={styles.mapPlaceholder}>
        <MaterialIcons name="location-on" size={44} color={theme.colors.primaryLight} />
        <Text style={styles.mapText}>Mapa com marcadores de denúncias</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#DDEAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B9D2F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 10,
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
