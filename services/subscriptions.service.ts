import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import {ISubscriptionAddFormValues} from '../components/subscription/add-new/SubscriptionAddForm';

export const subscriptionsService = {
  getAll: async () => {
    try {
      const items = await firestore().collection('subscriptions').get();
      return items.docs.map(querySnapshot => {
        return {
          ...querySnapshot.data(),
          id: querySnapshot.id,
          pay_date: moment(querySnapshot.data().pay_date).format('MM.DD.YYYY'),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  getOne: async (subscriptionId: string) => {
    try {
      return await firestore()
        .collection('subscriptions')
        .where('id', '==', subscriptionId)
        .get();
    } catch (error) {
      throw error;
    }
  },

  createOne: async (payload: ISubscriptionAddFormValues) => {
    try {
      await firestore().collection('subscriptions').add(payload);
    } catch (error) {
      throw error;
    }
  },

  removeOne: async (subscriptionId: string) => {
    try {
      await firestore()
        .collection('subscriptions')
        .doc(subscriptionId)
        .delete();
    } catch (error) {
      throw error;
    }
  },
};
