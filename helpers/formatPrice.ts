import {Alert} from 'react-native';

export const formatPrice = (value: string) => {
  let newText = '';
  const numbers = '0123456789';

  for (let i = 0; i < value.length; i++) {
    if (numbers.indexOf(value[i]) > -1) {
      newText = newText + value[i];
    } else {
      Alert.alert('please enter numbers only');
      return '';
    }
  }

  return newText;
};
