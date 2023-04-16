import {View, Text} from 'react-native';

import {ISubscription} from '../../../types/entities/Subscription';

interface ISubscriptionAddFormValues extends Omit<ISubscription, 'avatar_url'> {
  avatar: any;
}

export const SubscriptionAddForm = () => {
  return (
    <View>
      <Text>Add form</Text>
    </View>
  );
};
