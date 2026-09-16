import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import LocationMap from '../../../components/LocationMap';

export default function Localizacao() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LocationMap
        onBack={() => router.back()}
        onConfirmLocation={(location) => {
          router.push({
            pathname: '/(citizen)/denuncia/nova',
            params: {
              latitude: String(location.latitude),
              longitude: String(location.longitude),
              address: location.address,
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
});
