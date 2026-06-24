import { ExecuTorchExample } from '@/execu-torch-example';
import { StyleSheet, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ExecuTorchExample />
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
