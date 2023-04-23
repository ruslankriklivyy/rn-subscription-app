import {create} from 'zustand';

import {ISubscription} from '../types/entities/Subscription';
import {subscriptionsService} from '../services/subscriptions.service';
import {ISubscriptionAddFormValues} from '../components/subscription/add-new/SubscriptionAddForm';

interface ISubscriptionsStoreState {
  subscriptions: ISubscription[] | null;

  getAll: () => any;
  createOne: (payload: ISubscriptionAddFormValues) => void;
  removeOne: (subscriptionId: string) => void;
}

export const useSubscriptionsStore = create<ISubscriptionsStoreState>()(
  set => ({
    subscriptions: null,

    setSubscriptions: (subscriptions: ISubscription[]) => set({subscriptions}),

    getAll: async () => {
      const subscriptions: any = await subscriptionsService.getAll();
      console.log(subscriptions);
      set({subscriptions});
    },

    createOne: async (payload: ISubscriptionAddFormValues) => {
      await subscriptionsService.createOne(payload);
    },

    removeOne: async (subscriptionId: string) => {
      await subscriptionsService.removeOne(subscriptionId);
    },
  }),
);
