import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {useAuthStore} from '../stores/auth.store';
import {User} from '../components/user/User';
import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {Balance} from '../components/subscription/Balance';
import {AllSubscriptions} from '../components/subscription/AllSubscriptions';
import {SubscriptionAddBlock} from '../components/subscription/add-new/SubscriptionAddBlock';
import {MainLayout} from '../layouts/main';
import {useSubscriptionsStore} from '../stores/subscriptions.store';

const HomeScreen = () => {
  const user = useAuthStore(state => state.user);
  const subscriptions = useSubscriptionsStore(state => state.subscriptions);
  const totalPriceSubscriptions = useSubscriptionsStore(
    state => state.totalPrice,
  );

  const setUser = useAuthStore(state => state.setUser);
  const getAllSubscriptions = useSubscriptionsStore(state => state.getAll);

  useEffect(() => {
    getAllSubscriptions();
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => setUser(user));
    return subscriber;
  }, []);

  return (
    <MainLayout>
      <SafeAreaView style={GlobalStyles.box}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.home}>
            <View style={styles.header}>
              <User
                link={user ? '/screens/Profile' : '/screens/Login'}
                avatarUrl={user?.photoURL}
                username={user?.displayName || user?.email}
              />

              <SubscriptionAddBlock />
            </View>

            <View style={styles.content}>
              <Balance total={totalPriceSubscriptions} />

              {/*<UpcomingSubscriptions subscriptions={subscriptions as any} />*/}

              <AllSubscriptions subscriptions={subscriptions} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
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
