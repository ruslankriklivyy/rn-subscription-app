import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useEffect} from 'react';

import {Header} from '../components/UI/Header';
import {GlobalStyles} from '../config/global-styles';
import {MySubscriptions} from '../components/subscription/MySubscriptions';
import {MainLayout} from '../layouts/main';
import {useSubscriptionsStore} from '../stores/subscriptions.store';

const SubscriptionsScreen = () => {
  const subscriptions = useSubscriptionsStore(state => state.subscriptions);
  const getAllSubscriptions = useSubscriptionsStore(state => state.getAll);

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  return (
    <MainLayout>
      <SafeAreaView style={GlobalStyles.box}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Header title={'My Subscriptions'} />

          <View style={styles.subscriptions}>
            <MySubscriptions subscriptions={subscriptions as any} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  subscriptions: {
    padding: 20,
  },
});

export default SubscriptionsScreen;
