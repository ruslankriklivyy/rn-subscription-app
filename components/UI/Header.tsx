import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FC} from 'react';

import {BackButton} from './BackButton';
import {GlobalStylesVariables} from '../../config/global-styles';

interface IHeaderProps {
  title?: string;
  onClose?: () => void;
}

export const Header: FC<IHeaderProps> = ({title, onClose}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <BackButton onPress={() => (onClose ? onClose() : navigation.goBack())} />

      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    fontWeight: '600',
    color: '#000',
    fontSize: 18,
    alignItems: 'center',
  },
});
