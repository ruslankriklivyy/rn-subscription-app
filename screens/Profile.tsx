import {StyleSheet, Text, View, Image} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
import {useEffect} from 'react';

import {GlobalStyles, GlobalStylesVariables} from '../config/global-styles';
import {MainButton} from '../components/UI/MainButton';
import {useAuthStore} from '../stores/auth.store';
import {MainLayout} from '../layouts/main';

const ProfileScreen = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const linkTo = useLinkTo();

  const avatarSource = user?.photoURL
    ? {uri: user?.photoURL}
    : require('../assets/images/avatar.png');

  const onPressLogout = async () => {
    await logout();
    linkTo('/screens/Login');
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <MainLayout>
      <View style={GlobalStyles.box}>
        <View style={GlobalStyles.form}>
          <View style={styles.itemInfoAvatarBox}>
            <Image style={styles.itemInfoAvatar} source={avatarSource} />
          </View>

          {user?.displayName && (
            <View style={styles.itemInfo}>
              <Text style={styles.itemInfoName}>Full Name:</Text>
              <Text style={styles.itemInfoValue}>{user?.displayName}</Text>
            </View>
          )}

          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoName}>Email:</Text>
            <Text style={styles.itemInfoValue}>{user?.email}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoName}>User ID:</Text>
            <Text style={styles.itemInfoValue}>{user?.uid}</Text>
          </View>

          <MainButton onClick={onPressLogout} title={'Logout'} />
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  itemInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemInfoName: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    fontSize: 18,
    marginRight: 10,
  },
  itemInfoValue: {
    fontFamily: GlobalStylesVariables.mainFontRegular,
    fontWeight: '400',
    fontSize: 18,
    flexShrink: 1,
  },
  itemInfoAvatarBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemInfoAvatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});

export default ProfileScreen;
