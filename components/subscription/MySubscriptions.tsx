import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {FC, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ISubscription} from '../../types/entities/Subscription';
import {GlobalStylesVariables} from '../../config/global-styles';
import {MainButton} from '../UI/MainButton';
import {useSubscriptionsStore} from '../../stores/subscriptions.store';

interface IMySubscriptionsProps {
  subscriptions?: ISubscription[];
}

interface IMySubscriptionItemProps {
  subscription: ISubscription;
  onPress?: () => void;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MySubscriptionDetailsItem: FC<IMySubscriptionItemProps> = ({
  subscription,
  onPress,
}) => {
  const removeOneSubscription = useSubscriptionsStore(state => state.removeOne);
  const navigation = useNavigation();

  const {id, name, price, color, avatar, pay_date, plan_details, pay_type} =
    subscription;
  const subscriptionIconSource = avatar
    ? {uri: avatar.uri}
    : require('../../assets/images/unkown.png');

  return (
    <TouchableOpacity
      style={{...styles.itemDetail, backgroundColor: color}}
      onPress={onPress}>
      <View style={styles.itemDetailTop}>
        <View style={styles.itemDetailLeft}>
          <View style={styles.itemDetailIconBox}>
            <Image
              style={styles.itemDetailIcon}
              source={subscriptionIconSource}
            />
          </View>

          <View style={styles.itemDetailInfo}>
            <Text style={styles.itemDetailName}>{name}</Text>
            <Text style={styles.itemDetailDate}>{pay_date}</Text>
          </View>
        </View>

        <View style={styles.itemDetailRight}>
          <Text style={styles.itemDetailPrice}>${price}</Text>
          <Text style={styles.itemDetailPricePlan}>1 month</Text>
        </View>
      </View>

      <View style={styles.itemDetailContent}>
        <Text style={styles.itemDetailValue}>Payment info: {pay_type}</Text>
        <Text style={styles.itemDetailValue}>Plan details: {plan_details}</Text>
      </View>

      <View style={styles.itemDetailBottom}>
        <MainButton
          onClick={() =>
            navigation.navigate(
              'Subscription' as never,
              {id: subscription.id} as never,
            )
          }
          title={'View Details'}
          buttonStyles={{marginBottom: 20}}
        />
        <MainButton
          onClick={() => removeOneSubscription(id)}
          title={'Remove Subscription'}
        />
      </View>
    </TouchableOpacity>
  );
};

const MySubscriptionItem: FC<IMySubscriptionItemProps> = ({subscription}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {name, price, avatar, plan_details} = subscription;
  const subscriptionIconSource = avatar
    ? {uri: avatar.uri}
    : require('../../assets/images/unkown.png');

  const onPress = () => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 200,
    });
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {!isExpanded && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.item}
          onPress={onPress}>
          <View style={styles.itemLeft}>
            <View style={styles.itemIconBox}>
              <Image source={subscriptionIconSource} style={styles.itemIcon} />
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{name}</Text>
              <Text style={styles.itemPlanDetails}>{plan_details}</Text>
            </View>
          </View>

          <View style={styles.itemRight}>
            <Text style={styles.itemPrice}>${price}</Text>
            <Text style={styles.itemPricePlan}>1 month</Text>
          </View>
        </TouchableOpacity>
      )}

      {isExpanded && (
        <MySubscriptionDetailsItem
          subscription={subscription}
          onPress={onPress}
        />
      )}
    </>
  );
};

export const MySubscriptions: FC<IMySubscriptionsProps> = ({subscriptions}) => {
  return (
    <View style={styles.box}>
      <FlatList
        data={subscriptions}
        renderItem={({item}) => <MySubscriptionItem subscription={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a3a3a6',
    borderRadius: 20,
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
  },
  itemIconBox: {
    backgroundColor: '#E2DCB8',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemIcon: {
    width: 22,
    height: 22,
  },
  itemInfo: {},
  itemName: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  itemPlanDetails: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontSize: 14,
  },
  itemRight: {},
  itemPrice: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
  itemPricePlan: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },

  itemDetail: {
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 20,
  },
  itemDetailTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemDetailLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemDetailIconBox: {
    marginRight: 10,
  },
  itemDetailIcon: {
    width: 34,
    height: 34,
  },
  itemDetailInfo: {},
  itemDetailName: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  itemDetailDate: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontSize: 12,
  },
  itemDetailRight: {},
  itemDetailPrice: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
    textAlign: 'right',
  },
  itemDetailPricePlan: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontSize: 12,
  },
  itemDetailContent: {},
  itemDetailValue: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 10,
  },
  itemDetailBottom: {
    marginTop: 15,
  },
});
