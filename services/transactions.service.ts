import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import moment from 'moment/moment';

import {ITransaction} from '../types/entities/Transaction';
import {ITransactionCreateFormValues} from '../components/transaction/add-new/TransactionAddForm';

export const transactionsService = {
  getAll: async (subscriptionId?: string) => {
    try {
      let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
        firestore().collection('transactions');

      if (subscriptionId) {
        query = query.where('subscriptionId', '==', subscriptionId);
      }

      const items = await query.get();

      return items.docs.map(querySnapshot => {
        return {
          ...querySnapshot.data(),
          id: querySnapshot.id,
          pay_date: moment(querySnapshot.data().pay_date).format('MM.DD.YYYY'),
        };
      }) as ITransaction[];
    } catch (error) {
      throw error;
    }
  },

  getOne: async (transactionId: string) => {
    try {
      const res = await firestore()
        .collection('transactions')
        .where(firebase.firestore.FieldPath.documentId(), '==', transactionId)
        .get();
      return res.docs[0].data() as ITransaction;
    } catch (error) {
      throw error;
    }
  },

  createOne: async (payload: ITransactionCreateFormValues) => {
    try {
      await firestore().collection('transactions').add(payload);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },

  removeOne: async (transactionId: string) => {
    try {
      await firestore().collection('transactions').doc(transactionId).delete();
    } catch (error) {
      throw error;
    }
  },
};
