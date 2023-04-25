import {create} from 'zustand';

import {ITransactionCreateFormValues} from '../components/transaction/add-new/TransactionAddForm';
import {ITransaction} from '../types/entities/Transaction';
import {transactionsService} from '../services/transactions.service';
import {useSubscriptionsStore} from './subscriptions.store';

interface ITransactionsStoreState {
  transactions: ITransaction[] | null;
  transaction: ITransaction | null;
  totalPriceBySubscription: number;
  totalPrice: number;
}

interface ITransactionsStoreActions {
  countTotalPriceBySubscription: (subscriptionId?: string) => void;
  countTotalPrice: (transactions: ITransaction[]) => number;
  getAll: (subscriptionId?: string) => void;
  getOne: (transactionId: string) => void;
  createOne: (payload: ITransactionCreateFormValues) => void;
  removeOne: (transactionId: string) => void;
}

export const useTransactionsStore = create<
  ITransactionsStoreState & ITransactionsStoreActions
>()(set => ({
  transactions: null,
  transaction: null,
  totalPriceBySubscription: 0,
  totalPrice: 0,

  countTotalPriceBySubscription: subscriptionId => {
    set(state => {
      const totalPriceBySubscription = state.transactions
        ?.filter(elem => elem.subscriptionId === subscriptionId)
        ?.reduce((sum, elem) => Number(elem.price) + sum, 0);

      return {
        totalPriceBySubscription,
      };
    });
  },

  countTotalPrice: (transactions: ITransaction[]) =>
    transactions.reduce((sum, elem) => Number(elem.price) + sum, 0),

  getAll: async subscriptionId => {
    const transactions = await transactionsService.getAll(subscriptionId);

    set(state => {
      state.countTotalPriceBySubscription(subscriptionId);
      return {transactions, totalPrice: state.countTotalPrice(transactions)};
    });
  },

  getOne: async transactionId => {
    const transaction = await transactionsService.getOne(transactionId);
    set({transaction});
  },

  createOne: async payload => {
    await transactionsService.createOne(payload);

    const subscriptionId = useSubscriptionsStore.getState().subscription?.id;
    const transactions = await transactionsService.getAll(subscriptionId);
    set(state => {
      state.countTotalPriceBySubscription(subscriptionId);
      return {transactions};
    });
  },

  removeOne: async transactionId => {
    await transactionsService.removeOne(transactionId);

    const subscriptionId = useSubscriptionsStore.getState().subscription?.id;
    const transactions = await transactionsService.getAll(subscriptionId);
    set(state => {
      state.countTotalPriceBySubscription(subscriptionId);
      return {transactions};
    });
  },
}));
