import firestore, {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

import {ISubscriptionAddFormValues} from '../components/subscription/add-new/SubscriptionAddForm';
import {ISubscription} from '../types/entities/Subscription';
import {useAuthStore} from '../stores/auth.store';

export const subscriptionsService = {
  getAll: async () => {
    try {
      const userId = useAuthStore.getState().user?.uid;
      const items = await firestore()
        .collection('subscriptions')
        .where('user_id', '==', userId)
        .get();

      return items.docs.map(querySnapshot => {
        return {
          ...querySnapshot.data(),
          id: querySnapshot.id,
          pay_date: moment(querySnapshot.data().pay_date).format('MM.DD.YYYY'),
        };
      }) as ISubscription[];
    } catch (error) {
      throw error;
    }
  },

  getOne: async (subscriptionId: string) => {
    try {
      const res = await firestore()
        .collection('subscriptions')
        .where(firebase.firestore.FieldPath.documentId(), '==', subscriptionId)
        .get();
      return {...res.docs[0].data(), id: res.docs[0].id} as ISubscription;
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
