import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useEffect} from 'react';
import moment from 'moment';

import {Header} from '../components/UI/Header';
import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {MainLayout} from '../layouts/main';
import {useSubscriptionsStore} from '../stores/subscriptions.store';
import {Transactions} from '../components/transaction/Transactions';
import {TransactionAddBlock} from '../components/transaction/add-new/TransactionAddBlock';
import {useTransactionsStore} from '../stores/transactions.store';

const SubscriptionScreen = () => {
  const route = useRoute();

  const transactions = useTransactionsStore(state => state.transactions);
  const getAllTransactions = useTransactionsStore(state => state.getAll);
  const countTotalPriceBySubscription = useTransactionsStore(
    state => state.countTotalPriceBySubscription,
  );
  const transactionTotalPrice = useTransactionsStore(state => state.totalPrice);
  const subscription = useSubscriptionsStore(state => state.subscription);
  const getOneSubscription = useSubscriptionsStore(state => state.getOne);

  const subscriptionId = (route.params as Record<string, string>).id;
  const nowDate = moment().format('MM.DD.YYYY');

  useEffect(() => {
    getOneSubscription(subscriptionId);
    getAllTransactions(subscriptionId);
  }, [subscriptionId]);

  useEffect(() => {
    countTotalPriceBySubscription(subscriptionId);
  }, [subscriptionId, transactions]);

  return (
    <MainLayout>
      <SafeAreaView style={GlobalStyles.box}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Header title={subscription?.name} />

          <View style={styles.content}>
            {!!transactions?.length && (
              <LineChart
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                  ],
                  datasets: [
                    {
                      data: transactions.map(transaction =>
                        Number(transaction.price),
                      ),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#E3DBB9',
                  backgroundGradientFrom: '#E3DBB9',
                  backgroundGradientTo: '#E3DBB9',
                  decimalPlaces: 2,
                  color: () => '#000',
                  labelColor: () => '#000',
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#EA7A53',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 20,
                }}
              />
            )}

            <View style={styles.infoBlock}>
              <View style={styles.infoBlockItem}>
                <View style={styles.infoBlockItemLeft}>
                  <Text style={styles.infoBlockName}>Total</Text>
                  <Text style={styles.infoBlockDate}>{nowDate}</Text>
                </View>

                <View style={styles.infoBlockItemRight}>
                  <Text style={styles.infoBlockItemTotal}>
                    ${transactionTotalPrice}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.transactions}>
              <View style={styles.transactionsTop}>
                <Text style={styles.transactionsTitle}>Transactions</Text>

                <TransactionAddBlock />
              </View>

              {subscription && <Transactions transactions={transactions} />}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    justifyContent: 'center',
  },
  infoBlock: {
    marginTop: 20,
  },
  infoBlockItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#a3a3a6',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 20,
    borderRadius: 20,
  },
  infoBlockItemLeft: {},
  infoBlockName: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  infoBlockDate: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
  infoBlockItemRight: {},
  infoBlockItemTotal: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  transactions: {
    marginTop: 20,
  },
  transactionsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionsTitle: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 18,
  },
  transactionsList: {
    marginTop: 10,
  },
});

export default SubscriptionScreen;
