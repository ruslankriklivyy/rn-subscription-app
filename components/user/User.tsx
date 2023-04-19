import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {FC} from 'react';
import {useLinkTo} from '@react-navigation/native';

import {GlobalStylesVariables} from '../../config/global-styles';

interface IUserProps {
  avatarUrl?: string | null;
  username: string;
}

export const User: FC<IUserProps> = ({avatarUrl, username}) => {
  const linkTo = useLinkTo();

  const avatarSource = avatarUrl
    ? {uri: avatarUrl}
    : require('../../assets/images/avatar.png');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.user}
      onPress={() => linkTo('/screens/Profile')}>
      <Image style={styles.userAvatar} source={avatarSource} />

      <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userAvatar: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  username: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 18,
  },
});
