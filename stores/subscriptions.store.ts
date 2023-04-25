import {create} from 'zustand';

import {ISubscription} from '../types/entities/Subscription';
import {subscriptionsService} from '../services/subscriptions.service';
import {ISubscriptionAddFormValues} from '../components/subscription/add-new/SubscriptionAddForm';

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
    await subscriptionsService.createOne(payload);
    const subscriptions = await subscriptionsService.getAll();
    set({subscriptions});
  },

  removeOne: async (subscriptionId: string) => {
    await subscriptionsService.removeOne(subscriptionId);
    const subscriptions = await subscriptionsService.getAll();
    set({subscriptions});
  },

  onLoading: () => set({isLoading: true}),
  onLoaded: () => set({isLoading: false}),
}));
