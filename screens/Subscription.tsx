import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {Header} from '../components/UI/Header';
import {GlobalStyles} from '../config/global-styles';

const SubscriptionScreen = () => {
  const route = useRoute();
  const subscriptionId = (route.params as Record<string, string>).id;

  return (
    <View style={GlobalStyles.box}>
      <Header />

      <Text>Subscription: {subscriptionId}</Text>
    </View>
  );
};

export default SubscriptionScreen;
