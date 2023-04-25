import {FC} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import {ITransaction} from '../../types/entities/Transaction';
import {TransactionItem} from './TransactionItem';
import {GlobalStylesVariables} from '../../config/global-styles';

interface ITransactionsProps {
  transactions: ITransaction[] | null;
}

export const Transactions: FC<ITransactionsProps> = ({transactions}) => {
  return (
    <View style={styles.transactionsList}>
      {!transactions?.length && <Text style={styles.empty}>Empty</Text>}
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsList: {
    marginTop: 10,
  },
  empty: {
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontWeight: '500',
    fontSize: 14,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
});
