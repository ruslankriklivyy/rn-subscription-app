import {StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import {Header} from '../components/UI/Header';
import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {MainLayout} from '../layouts/main';
import {useEffect} from 'react';
import {subscriptionsService} from '../services/subscriptions.service';

const SubscriptionScreen = () => {
  const route = useRoute();
  const subscriptionId = (route.params as Record<string, string>).id;

  useEffect(() => {
    subscriptionsService
      .getOne(subscriptionId)
      .then(res => console.log('SUBSCRIPTION', res));
  }, []);

  return (
    <MainLayout>
      <View style={GlobalStyles.box}>
        <Header title={`Subscription - ${subscriptionId}`} />

        <View style={styles.content}>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
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

          <View style={styles.infoBlock}>
            <View style={styles.infoBlockItem}>
              <View style={styles.infoBlockItemLeft}>
                <Text style={styles.infoBlockName}>Total</Text>
                <Text style={styles.infoBlockDate}>04.18.2023</Text>
              </View>

              <View style={styles.infoBlockItemRight}>
                <Text style={styles.infoBlockItemTotal}>$145.45</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
});

export default SubscriptionScreen;
