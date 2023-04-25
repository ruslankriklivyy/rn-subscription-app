interface ISubscriptionAvatar {
  uri: string;
  filename: string;
}

export interface ISubscription {
  id: string;
  name: string;
  avatar: ISubscriptionAvatar;
  price: number;
  pay_type: string;
  pay_date: string;
  plan_details: string;
  payment_info: number;
  color: string;
}
