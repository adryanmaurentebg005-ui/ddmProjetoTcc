import { View, Text } from 'react-native';

export default function NovaDenunciaScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F7FA',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#123B65',
        }}
      >
        Nova denúncia
      </Text>
    </View>
  );
}