import {StyleSheet, Text} from 'react-native';
import {FC} from 'react';

import {GlobalStylesVariables} from '../../config/global-styles';

interface ITitleProps {
  title: string;
}

export const Title: FC<ITitleProps> = ({title}) => {
  return <Text style={styles.title}>{title}</Text>;
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
});
