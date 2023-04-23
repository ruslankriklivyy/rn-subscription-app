import {StyleSheet, View, Text, Image} from 'react-native';
import {FC} from 'react';
import {GlobalStylesVariables} from '../../config/global-styles';

interface IBalanceProps {
  total: number;
}

export const Balance: FC<IBalanceProps> = ({total}) => {
  return (
    <View style={styles.balance}>
      <View style={styles.head}>
        <Text style={styles.balanceTitle}>Total</Text>
        <Image
          style={styles.creditCardIcon}
          source={require('../../assets/images/credit-card.png')}
        />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.total}>${total}</Text>
        <Text style={styles.date}>05/32</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balance: {
    backgroundColor: '#EA7A53',
    padding: 15,
    height: 100,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  head: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceTitle: {
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontWeight: '500',
    color: '#000',
    fontSize: 14,
  },
  creditCardIcon: {
    width: 28,
    height: 28,
  },
  bottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 28,
    color: '#000',
  },
  date: {
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontWeight: '500',
    color: '#000',
  },
});
