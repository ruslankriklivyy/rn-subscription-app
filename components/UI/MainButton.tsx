import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

import {GlobalStylesVariables} from '../../config/global-styles';

interface IMainButtonProps {
  onClick: () => void;
  title: string;
  type?: 'main' | 'outlined';
  buttonStyles?: any;
}

export const MainButton: FC<IMainButtonProps> = ({
  onClick,
  title,
  type = 'main',
  buttonStyles,
}) => {
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

  if (type === 'outlined') {
    return (
      <Animated.View
        style={{
          transform: [{scale: btnAnimation}],
        }}>
        <TouchableOpacity
          style={styles.buttonOutlined}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <Text style={styles.buttonOutlinedText}>{title}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={{
        transform: [{scale: btnAnimation}],
      }}>
      <TouchableOpacity
        style={{...styles.button, ...buttonStyles}}
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
  buttonOutlined: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a3a3a6',
  },
  buttonOutlinedText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: GlobalStylesVariables.mainFontMedium,
  },
});
