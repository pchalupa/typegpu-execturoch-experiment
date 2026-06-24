import { Button, View, Text, ActivityIndicator } from 'react-native';
import { Message, models, useLLM } from 'react-native-executorch';
import { initExecutorch } from 'react-native-executorch';
import { ExpoResourceFetcher } from 'react-native-executorch-expo-resource-fetcher';

initExecutorch({
  resourceFetcher: ExpoResourceFetcher,
});

export const ExecuTorchExample = () => {
  // const llm = useLLM({ model: models.llm.lfm2_5_1_2b_instruct() });
  const llm = useLLM({ model: models.llm.gemma4_e2b() });

  const handleGenerate = async () => {
    const chat: Message[] = [
      {
        role: 'system',
        content:
          'You are a witty AI running entirely on this phone — no internet, no servers, no data leaving the device. You are being demoed live to the STRV frontend team.',
      },
      {
        role: 'user',
        content:
          'Introduce yourself to the STRV frontend team in 3 short sentences. Mention that you are running fully on-device and offline, and end with a cheeky reason why that is cool for the apps they build.',
      },
    ];

    await llm.generate(chat);
  };

  return (
    <View style={{ justifyContent: 'center', marginHorizontal: 16 }}>
      {!llm.isReady && <ActivityIndicator />}
      <Button onPress={handleGenerate} title="Generate!" disabled={!llm.isReady} />
      <Text>{llm.response}</Text>
    </View>
  );
};
