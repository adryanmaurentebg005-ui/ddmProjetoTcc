import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface SelectedLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationMapProps {
  onConfirmLocation?: (location: SelectedLocation) => void;
  onBack?: () => void;
}

export default function LocationMap({ onBack }: LocationMapProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.background}>
        <MaterialCommunityIcons name="map-outline" size={72} color="#B8C7D9" />
        <Text style={styles.mapTitle}>Mapa disponível no aplicativo mobile</Text>
        <Text style={styles.mapText}>Abra o projeto no Expo Go ou em um development build Android/iOS para usar o mapa e o GPS reais.</Text>
      </View>

      <View style={styles.topControls}>
        <Pressable style={styles.floatingButton} onPress={onBack} accessibilityLabel="Voltar">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#123B65" />
        </Pressable>
        <View style={styles.addressCard}>
          <MaterialCommunityIcons name="crosshairs-gps" size={22} color="#1976D2" />
          <View style={styles.addressContent}>
            <Text style={styles.cardLabel}>LOCAL DA OCORRÊNCIA</Text>
            <Text style={styles.cardAddress}>Mapa mobile aguardando teste no dispositivo</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <View style={styles.sheetHeader}>
          <MaterialCommunityIcons name="map-marker-check" size={24} color="#1976D2" />
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>Seleção de localização</Text>
            <Text style={styles.sheetAddress}>O mapa real não é renderizado no navegador.</Text>
          </View>
        </View>
        <Text style={styles.instruction}>O fluxo completo de GPS, marcador e seleção está disponível no aplicativo mobile.</Text>
        <View style={styles.disabledButton}>
          <MaterialCommunityIcons name="cellphone-marker" size={20} color="#667085" />
          <Text style={styles.disabledButtonText}>Use o aplicativo mobile para selecionar a localização</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E5E7EB' },
  background: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36, backgroundColor: '#EAF0F6' },
  mapTitle: { marginTop: 16, textAlign: 'center', fontSize: 20, fontWeight: '800', color: '#123B65' },
  mapText: { marginTop: 8, textAlign: 'center', fontSize: 14, lineHeight: 20, color: '#667085' },
  topControls: { position: 'absolute', top: 18, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  floatingButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 5 },
  addressCard: { flex: 1, minHeight: 66, borderRadius: 16, padding: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
  addressContent: { flex: 1, marginLeft: 10 },
  cardLabel: { fontSize: 11, fontWeight: '800', color: '#667085', marginBottom: 3 },
  cardAddress: { fontSize: 14, lineHeight: 19, fontWeight: '700', color: '#123B65' },
  bottomSheet: { position: 'absolute', left: 0, right: 0, bottom: 0, borderTopLeftRadius: 26, borderTopRightRadius: 26, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 22, backgroundColor: '#FFFFFF' },
  dragHandle: { width: 44, height: 4, borderRadius: 2, alignSelf: 'center', backgroundColor: '#D0D5DD', marginBottom: 16 },
  sheetHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  sheetContent: { flex: 1, marginLeft: 10 },
  sheetTitle: { fontSize: 13, fontWeight: '800', color: '#667085', marginBottom: 4 },
  sheetAddress: { fontSize: 16, lineHeight: 22, fontWeight: '800', color: '#123B65' },
  instruction: { marginTop: 10, color: '#667085', fontSize: 12, lineHeight: 17 },
  disabledButton: { minHeight: 48, marginTop: 16, borderRadius: 12, backgroundColor: '#EAECF0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12 },
  disabledButtonText: { color: '#667085', fontSize: 13, fontWeight: '700', textAlign: 'center' },
});
