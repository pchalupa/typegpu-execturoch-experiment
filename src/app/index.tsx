import { Triangle } from '@/typegpu-example';
import { StyleSheet, View } from 'react-native';

export default function TypeGpuScreen() {
  return (
    <View style={styles.container}>
      <Triangle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
