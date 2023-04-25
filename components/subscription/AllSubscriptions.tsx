import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {FC} from 'react';
import {useLinkTo, useNavigation} from '@react-navigation/native';

import {ISubscription} from '../../types/entities/Subscription';
import {Title} from '../UI/Title';
import {MainButton} from '../UI/MainButton';
import {GlobalStylesVariables} from '../../config/global-styles';

interface IAllSubscriptionsProps {
  subscriptions: ISubscription[] | null;
}

interface ISubscriptionItemProps {
  subscription: ISubscription;
}

const SubscriptionItem: FC<ISubscriptionItemProps> = ({subscription}) => {
  const navigation = useNavigation();

  const {name, avatar_url, pay_date, price, color} = subscription;
  const subscriptionIconSource = avatar_url
    ? {uri: avatar_url}
    : require('../../assets/images/unkown.png');

  const onPress = () => {
    navigation.navigate(
      'Subscription' as never,
      {id: subscription.id} as never,
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.subscriptionItem, backgroundColor: color}}
      onPress={onPress}>
      <View style={styles.subscriptionItemLeft}>
        <View style={styles.subscriptionIconBox}>
          <Image
            style={styles.subscriptionIcon}
            source={subscriptionIconSource}
          />
        </View>

        <View style={styles.subscriptionLeftInfo}>
          <Text style={styles.subscriptionName}>{name}</Text>
          <Text style={styles.subscriptionPayDate}>{pay_date}</Text>
        </View>
      </View>

      <View style={styles.subscriptionItemRight}>
        <Text style={styles.subscriptionItemPrice}>${price}</Text>
        <Text style={styles.subscriptionItemPayType}>per month</Text>
      </View>
    </TouchableOpacity>
  );
};

export const AllSubscriptions: FC<IAllSubscriptionsProps> = ({
  subscriptions,
}) => {
  const linkTo = useLinkTo();

  return (
    <View style={styles.subscriptions}>
      <View style={styles.head}>
        <Title title={'All Subscriptions'} type={'small'} />

        <MainButton
          onClick={() => linkTo('/screens/Subscriptions')}
          title={'View all'}
          type={'outlined'}
        />
      </View>

      <FlatList
        data={subscriptions}
        renderItem={({item}) => <SubscriptionItem subscription={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  subscriptions: {
    marginTop: 20,
  },
  subscriptionItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subscriptionItemLeft: {
    flexDirection: 'row',
  },
  subscriptionIconBox: {
    marginRight: 15,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  subscriptionIcon: {
    width: 24,
    height: 24,
  },
  subscriptionLeftInfo: {},
  subscriptionName: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  subscriptionPayDate: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontSize: 12,
  },
  subscriptionItemRight: {},
  subscriptionItemPrice: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
  subscriptionItemPayType: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontSize: 12,
  },
});
