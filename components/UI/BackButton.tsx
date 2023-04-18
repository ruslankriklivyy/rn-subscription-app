import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FC} from 'react';

interface IBackButtonProps {
  onPress: () => void;
}

export const BackButton: FC<IBackButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.backBtn}
      activeOpacity={0.8}
      onPress={onPress}>
      <Image
        style={styles.backIcon}
        source={require('../../assets/images/back.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    left: 0,
    width: 27,
    height: 25,
    marginHorizontal: 13,
    marginVertical: 17,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});
