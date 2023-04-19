import {Text, View} from 'react-native';
import {useLinkTo} from '@react-navigation/native';

import {GlobalStyles} from '../config/global-styles';
import {MainButton} from '../components/UI/MainButton';

const ProfileScreen = () => {
  const linkTo = useLinkTo();

  return (
    <View style={GlobalStyles.box}>
      <Text>Profile Screen</Text>

      <MainButton onClick={() => linkTo('/screens/Login')} title={'Logout'} />
    </View>
  );
};

export default ProfileScreen;
