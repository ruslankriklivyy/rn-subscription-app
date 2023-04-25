import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GlobalStylesVariables} from '../../config/global-styles';
import {ITransaction} from '../../types/entities/Transaction';

interface ITransactionItemProps {
  transaction: ITransaction;
}

export const TransactionItem: FC<ITransactionItemProps> = ({transaction}) => {
  const {pay_date, price} = transaction;

  return (
    <View style={styles.transactionsListItem}>
      <View style={styles.transactionsListItemLeft}>
        <Text style={styles.transactionsListItemDate}>{pay_date}</Text>
      </View>

      <View style={styles.transactionsListItemRight}>
        <Text style={styles.transactionsListItemPrice}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsListItem: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#63f532',
    backgroundColor: '#aaee99',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionsListItemLeft: {},
  transactionsListItemDate: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 18,
  },
  transactionsListItemRight: {},
  transactionsListItemPrice: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 18,
  },
});
