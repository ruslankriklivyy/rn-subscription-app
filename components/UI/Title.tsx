import {StyleSheet, Text} from 'react-native';
import {FC} from 'react';

import {GlobalStylesVariables} from '../../config/global-styles';

interface ITitleProps {
  title: string;
  type?: 'large' | 'small';
}

export const Title: FC<ITitleProps> = ({title, type = 'large'}) => {
  return (
    <Text style={type === 'large' ? styles.title : styles.titleSmall}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 38,
    color: '#000',
    textAlign: 'center',
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
  },
  titleSmall: {
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
  },
});
