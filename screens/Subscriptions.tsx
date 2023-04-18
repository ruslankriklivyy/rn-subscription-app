import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {Header} from '../components/UI/Header';
import {GlobalStyles} from '../config/global-styles';
import {MySubscriptions} from '../components/subscription/MySubscriptions';

const SubscriptionsScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.box}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header title={'My Subscriptions'} />

        <View style={styles.subscriptions}>
          <MySubscriptions
            subscriptions={[
              {
                id: '1',
                name: 'Spotify',
                price: 12.2,
                color: '#F7D44C',
                pay_date: '12.12.2023',
                pay_type: 'some',
                payment_info: 123,
                plan_details: 'Premium',
                avatar_url:
                  'https://cdn-icons-png.flaticon.com/512/152/152756.png',
              },
              {
                id: '2',
                name: 'Netflix',
                price: 24.0,
                color: '#99B7DD',
                pay_date: '02.07.2023',
                pay_type: 'some',
                payment_info: 54675756,
                plan_details: 'Premium',
                avatar_url:
                  'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3234779/netflix-icon-md.png',
              },
              {
                id: '3',
                name: 'Medium',
                price: 36.0,
                color: '#8BCBB8',
                pay_date: '10.10.2023',
                pay_type: 'some',
                payment_info: 675756,
                plan_details: 'Student',
                avatar_url:
                  'https://cdn-icons-png.flaticon.com/512/5968/5968885.png',
              },
              {
                id: '4',
                name: 'Netflix',
                price: 24.0,
                color: '#99B7DD',
                pay_date: '02.07.2023',
                pay_type: 'some',
                payment_info: 54675756,
                plan_details: 'Premium',
                avatar_url:
                  'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3234779/netflix-icon-md.png',
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subscriptions: {
    padding: 20,
  },
});

export default SubscriptionsScreen;
