import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {GlobalStylesVariables} from '../../config/global-styles';

interface IMainButtonProps {
  onClick: () => void;
  title: string;
}

export const MainButton: FC<IMainButtonProps> = ({onClick, title}) => {
  const btnAnimation = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onClick();
  };

  return (
    <Animated.View
      style={{
        transform: [{scale: btnAnimation}],
      }}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
});
