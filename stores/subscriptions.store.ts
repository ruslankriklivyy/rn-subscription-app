import {create} from 'zustand';
import storage from '@react-native-firebase/storage';

import {ISubscription} from '../types/entities/Subscription';
import {subscriptionsService} from '../services/subscriptions.service';
import {ISubscriptionAddFormValues} from '../components/subscription/add-new/SubscriptionAddForm';
import {Platform} from 'react-native';

interface ISubscriptionsStoreState {
  subscriptions: ISubscription[] | null;
  subscription: ISubscription | null;
  totalPrice: number;
  isLoading: boolean;
}

interface ISubscriptionsStoreActions {
  getAll: () => void;
  getOne: (subscriptionId: string) => void;
  createOne: (payload: ISubscriptionAddFormValues) => void;
  removeOne: (subscriptionId: string) => void;
  countTotalSubscriptionsPrice: (subscriptions: ISubscription[]) => number;
}

export const useSubscriptionsStore = create<
  ISubscriptionsStoreState & ISubscriptionsStoreActions
>()(set => ({
  subscriptions: null,
  subscription: null,
  totalPrice: 0,
  isLoading: false,

  setSubscriptions: (subscriptions: ISubscription[]) => set({subscriptions}),

  countTotalSubscriptionsPrice: subscriptions =>
    subscriptions.reduce((acc, elem) => Number(elem.price) + acc, 0),

  getAll: async () => {
    const subscriptions = await subscriptionsService.getAll();
    set(state => {
      const totalPrice = state.countTotalSubscriptionsPrice(subscriptions);
      return {subscriptions, totalPrice};
    });
  },

  getOne: async (subscriptionId: string) => {
    const subscription = await subscriptionsService.getOne(subscriptionId);
    set({subscription});
  },

  createOne: async (payload: ISubscriptionAddFormValues) => {
    try {
      const {uri} = payload.avatar;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      await storage().ref(filename).putFile(uploadUri);
      const filePath = await storage().ref(filename).getDownloadURL();
      await subscriptionsService.createOne({
        ...payload,
        avatar: {uri: filePath, filename},
      });

      const subscriptions = await subscriptionsService.getAll();
      set({subscriptions});
    } catch (error) {
      throw error;
    }
  },

  removeOne: async (subscriptionId: string) => {
    await subscriptionsService.removeOne(subscriptionId);
    const subscriptions = await subscriptionsService.getAll();
    set({subscriptions});
  },

  onLoading: () => set({isLoading: true}),
  onLoaded: () => set({isLoading: false}),
}));
