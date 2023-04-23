import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
import {FC} from 'react';

import {GlobalStylesVariables} from '../../config/global-styles';
import {useAuthStore} from '../../stores/auth.store';

interface ISocialLinksProps {
  link: string;
  linkTitle: string;
  linkDescription: string;
  title: string;
}

export const SocialLinks: FC<ISocialLinksProps> = ({
  link,
  linkTitle,
  linkDescription,
  title,
}) => {
  const linkTo = useLinkTo();
  const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);

  const onPressGoogle = async () => {
    try {
      await loginWithGoogle();
      linkTo('/screens/Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.boxBottom}>
      <View style={styles.boxBottomLogin}>
        <Text style={styles.alreadyHave}>{linkDescription}</Text>

        <TouchableOpacity style={styles.loginLink} onPress={() => linkTo(link)}>
          <Text style={styles.loginLinkText}>{linkTitle}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxBottomInner}>
        <View style={styles.boxBottomLineLeft} />
        <Text style={styles.boxBottomTitle}>{title}</Text>
        <View style={styles.boxBottomLineRight} />
      </View>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.8}
        onPress={onPressGoogle}>
        <Image
          source={require('../../assets/images/google.png')}
          style={styles.socialIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxBottom: {
    marginTop: 30,
    alignItems: 'center',
  },
  boxBottomLogin: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  alreadyHave: {
    paddingRight: 3,
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
  loginLink: {},
  loginLinkText: {
    color: '#0196D9',
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
  boxBottomInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxBottomTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
  boxBottomLineLeft: {
    width: 110,
    height: 2,
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: '#adaaaa',
  },
  boxBottomLineRight: {
    width: 110,
    height: 2,
    marginBottom: 20,
    marginLeft: 20,
    backgroundColor: '#adaaaa',
  },
  socialButton: {
    borderRadius: 100,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFCFE',
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
});
