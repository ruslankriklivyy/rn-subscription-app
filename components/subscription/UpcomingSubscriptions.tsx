import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {FC} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ISubscription} from '../../types/entities/Subscription';
import {GlobalStylesVariables} from '../../config/global-styles';
import {Title} from '../UI/Title';
import {MainButton} from '../UI/MainButton';

interface IUpcomingSubscriptionItemProps {
  subscription: ISubscription;
}

interface IUpcomingSubscriptionsProps {
  subscriptions: ISubscription[];
}

const UpcomingSubscriptionItem: FC<IUpcomingSubscriptionItemProps> = ({
  subscription,
}) => {
  const navigation = useNavigation();

  const {avatar, name, price} = subscription;
  const itemLogoSource = avatar
    ? {uri: avatar.uri}
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
      style={styles.subscription}
      onPress={onPress}>
      <View style={styles.subscriptionHead}>
        <View style={styles.subscriptionLogoBox}>
          <Image style={styles.subscriptionLogo} source={itemLogoSource} />
        </View>

        <View style={styles.subscriptionPaymentInfo}>
          <Text style={styles.subscriptionPrice}>${price}</Text>
          <Text style={styles.subscriptionDate}>12 days left</Text>
        </View>
      </View>

      <View style={styles.subscriptionBottom}>
        <Text style={styles.subscriptionName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const UpcomingSubscriptions: FC<IUpcomingSubscriptionsProps> = ({
  subscriptions,
}) => {
  return (
    <View style={styles.upcomingSubscriptions}>
      <View style={styles.head}>
        <Title title={'Upcoming'} type={'small'} />

        <MainButton onClick={() => null} title={'View all'} type={'outlined'} />
      </View>

      <Carousel
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        data={subscriptions}
        sliderWidth={570}
        itemWidth={190}
        renderItem={({item}) => {
          return <UpcomingSubscriptionItem key={item.id} subscription={item} />;
        }}
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
  upcomingSubscriptions: {
    marginTop: 20,
  },
  subscription: {
    padding: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#a3a3a6',
    borderRadius: 20,
    marginRight: 15,
  },
  subscriptionHead: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subscriptionLogoBox: {
    padding: 12,
    backgroundColor: '#E3DBBA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  subscriptionLogo: {
    width: 22,
    height: 22,
  },
  subscriptionPaymentInfo: {},
  subscriptionPrice: {
    fontWeight: '500',
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontSize: 16,
    color: '#000',
  },
  subscriptionDate: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontSize: 14,
  },
  subscriptionBottom: {
    marginTop: 5,
  },
  subscriptionName: {
    fontWeight: '500',
    fontFamily: GlobalStylesVariables.mainFontMedium,
    fontSize: 16,
    color: '#000',
  },
});
