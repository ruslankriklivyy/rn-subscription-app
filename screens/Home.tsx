import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {User} from '../components/user/User';
import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {AddButton} from '../components/subscription/add-new/AddButton';
import {Balance} from '../components/subscription/Balance';
import {UpcomingSubscriptions} from '../components/subscription/UpcomingSubscriptions';
import {AllSubscriptions} from '../components/subscription/AllSubscriptions';
import {SubscriptionAddBlock} from '../components/subscription/add-new/SubscriptionAddBlock';

const HomeScreen = () => {
  return (
    <SafeAreaView style={GlobalStyles.box}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.home}>
          <View style={styles.header}>
            <User username={'Test'} />

            <SubscriptionAddBlock />
          </View>

          <View style={styles.content}>
            <Balance total={180.6} />

            <UpcomingSubscriptions
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
              ]}
            />

            <AllSubscriptions
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    padding: GlobalStylesVariables.boxPadding,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  content: {},
});

export default HomeScreen;
